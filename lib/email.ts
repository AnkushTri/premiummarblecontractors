interface LeadEmailProps {
  name: string;
  phone?: string;
  city: string;
  state: string;
  message?: string;
  hub: string;
  contractor: string;
  contractorPhone: string;
  submittedAt: string;
}

export function buildContractorEmail(lead: LeadEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Lead – ${lead.city}</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#1e293b;border-radius:16px;overflow:hidden;border:1px solid #334155;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#d4a853,#f0c97a);padding:24px 32px;">
              <p style="margin:0;color:#0f172a;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">New Lead Alert</p>
              <h1 style="margin:6px 0 0;color:#0f172a;font-size:24px;font-weight:800;">
                ${lead.name} — ${lead.city}
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">
              
              <!-- Lead details -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:16px;border-bottom:1px solid #334155;">
                    <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Customer Name</p>
                    <p style="margin:0;color:#f1f5f9;font-size:17px;font-weight:600;">${lead.name}</p>
                  </td>
                </tr>

                ${
                  lead.phone
                    ? `
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #334155;">
                    <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Phone Number</p>
                    <p style="margin:0;">
                      <a href="tel:${lead.phone}" style="color:#fbbf24;font-size:20px;font-weight:700;text-decoration:none;">
                        ${lead.phone}
                      </a>
                    </p>
                  </td>
                </tr>`
                    : ""
                }

                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #334155;">
                    <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Location</p>
                    <p style="margin:0;color:#f1f5f9;font-size:15px;">${lead.city}, ${lead.state}</p>
                  </td>
                </tr>

                ${
                  lead.message
                    ? `
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #334155;">
                    <p style="margin:0 0 8px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Project Details</p>
                    <p style="margin:0;color:#cbd5e1;font-size:14px;line-height:1.6;background:#0f172a;padding:12px 16px;border-radius:8px;border-left:3px solid #d4a853;">
                      ${lead.message}
                    </p>
                  </td>
                </tr>`
                    : ""
                }

                <tr>
                  <td style="padding:16px 0;">
                    <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Submitted</p>
                    <p style="margin:0;color:#64748b;font-size:13px;">${lead.submittedAt}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                <tr>
                  ${
                    lead.phone
                      ? `
                  <td style="padding-right:8px;">
                    <a href="tel:${lead.phone}"
                       style="display:block;background:linear-gradient(135deg,#d4a853,#f0c97a);color:#0f172a;text-align:center;padding:14px;border-radius:10px;font-weight:700;font-size:14px;text-decoration:none;">
                      📞 Call Customer Now
                    </a>
                  </td>
                  <td style="padding-left:8px;">
                    <a href="https://wa.me/${lead.phone?.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(lead.name)}%2C%20I%20got%20your%20marble%20fitting%20enquiry%20for%20${encodeURIComponent(lead.city)}."
                       style="display:block;background:#16a34a;color:#ffffff;text-align:center;padding:14px;border-radius:10px;font-weight:700;font-size:14px;text-decoration:none;">
                      💬 WhatsApp Customer
                    </a>
                  </td>`
                      : `
                  <td>
                    <p style="color:#64748b;font-size:13px;margin:0;">No phone number provided — customer will contact you directly.</p>
                  </td>`
                  }
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0f172a;padding:16px 32px;border-top:1px solid #1e293b;">
              <p style="margin:0;color:#475569;font-size:12px;">
                This lead was assigned to <strong style="color:#94a3b8;">${lead.contractor}</strong> (${lead.hub}).
                Submitted via premiummarblecontractors.in
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function buildCustomerEmail(
  name: string,
  city: string,
  contractorName: string,
  contractorPhone: string,
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>We received your enquiry</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background:#1e293b;border-radius:16px;overflow:hidden;border:1px solid #334155;">
          
          <tr>
            <td style="background:linear-gradient(135deg,#d4a853,#f0c97a);padding:24px 32px;">
              <p style="margin:0;color:#0f172a;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Enquiry Received</p>
              <h1 style="margin:6px 0 0;color:#0f172a;font-size:22px;font-weight:800;">Thanks, ${name}!</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;color:#cbd5e1;font-size:15px;line-height:1.7;">
              <p style="margin:0 0 16px;">We've received your marble & tile fitting enquiry for <strong style="color:#f1f5f9;">${city}</strong>.</p>
              <p style="margin:0 0 24px;">Your local contractor <strong style="color:#fbbf24;">${contractorName}</strong> will be in touch shortly. If you need an immediate response, call or WhatsApp directly:</p>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <a href="tel:${contractorPhone}"
                       style="display:inline-block;background:linear-gradient(135deg,#d4a853,#f0c97a);color:#0f172a;padding:14px 32px;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;">
                      📞 ${contractorPhone}
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0;color:#475569;font-size:13px;">
                — Premium Marble & Tile Contractors
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
