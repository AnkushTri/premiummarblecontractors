import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";
import { buildContractorEmail, buildCustomerEmail } from "../../../lib/email";
import { locationMap } from "@/data/contractors";

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")
    .optional()
    .or(z.literal("")),
  city: z.string().min(1, "City is required"),
  message: z.string().max(1000).optional(),
  pageUrl: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const loc = locationMap[data.city];

    if (!loc) {
      return NextResponse.json(
        { success: false, error: "Invalid city selected" },
        { status: 400 },
      );
    }

    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    // ── 1. Save to Supabase ──────────────────────────────────
    const { data: lead, error: dbError } = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name,
        phone: data.phone || null,
        city: loc.city,
        state: loc.state,
        message: data.message || null,
        hub: loc.hub,
        contractor: loc.contractor.name,
        source: "website",
        page_url: data.pageUrl || null,
        utm_source: data.utmSource || null,
        utm_medium: data.utmMedium || null,
        utm_campaign: data.utmCampaign || null,
        status: "new",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("[Supabase] Insert error:", dbError);
      // Don't fail the whole request — still try to send emails
    }

    // ── 2. Notify contractor via email ───────────────────────
    const notifyEmail =
      loc.hub === "Jalandhar Hub"
        ? process.env.NOTIFY_EMAIL_JALANDHAR
        : process.env.NOTIFY_EMAIL_RAJOURI;

    const emailPromises: Promise<unknown>[] = [];

    if (notifyEmail) {
      emailPromises.push(
        resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: notifyEmail,
          subject: `🔔 New Lead: ${data.name} — ${loc.city}`,
          html: buildContractorEmail({
            name: data.name,
            phone: data.phone,
            city: loc.city,
            state: loc.state,
            message: data.message,
            hub: loc.hub,
            contractor: loc.contractor.name,
            contractorPhone: loc.contractor.phone,
            submittedAt,
          }),
        }),
      );
    }

    // ── 3. Send confirmation to customer (if email provided) ─
    // Phone-only flow — customer email is optional.
    // If you add an email field to the form later, use it here:
    // emailPromises.push(resend.emails.send({ to: data.email, ... }))

    // ── 4. Run email sends in parallel ──────────────────────
    const emailResults = await Promise.allSettled(emailPromises);
    emailResults.forEach((result, i) => {
      if (result.status === "rejected") {
        console.error(`[Resend] Email ${i} failed:`, result.reason);
      }
    });

    return NextResponse.json({
      success: true,
      leadId: lead?.id ?? null,
      contractor: {
        name: loc.contractor.name,
        phone: loc.contractor.phone,
        whatsapp: loc.contractor.whatsapp,
      },
    });
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please call us directly.",
      },
      { status: 500 },
    );
  }
}