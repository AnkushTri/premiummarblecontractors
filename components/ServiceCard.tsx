import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  accent?: string;
}

export default function ServiceCard({ icon: Icon, title, description, features, accent = "amber" }: ServiceCardProps) {
  return (
    <article className="glass-card p-6 md:p-8 group hover:border-amber-400/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10">
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-amber-400/10 border border-amber-400/20 group-hover:bg-amber-400/20 group-hover:border-amber-400/40 transition-all duration-300`}>
        <Icon className="w-6 h-6 text-amber-400" />
      </div>

      {/* Content */}
      <h3 className="font-playfair text-xl font-semibold text-white mb-2 group-hover:text-amber-100 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-5">{description}</p>

      {/* Features */}
      <ul className="space-y-2">
        {features.map((feat) => (
          <li key={feat} className="flex items-center gap-2 text-sm text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
            {feat}
          </li>
        ))}
      </ul>
    </article>
  );
}
