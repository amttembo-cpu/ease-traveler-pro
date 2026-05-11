import type { ReactNode } from "react";

export function LegalLayout({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <p className="text-sm text-primary font-semibold uppercase tracking-wider">Legal</p>
      <h1 className="mt-2 text-4xl font-bold text-foreground">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>
      <div className="mt-8 prose-content space-y-5 text-foreground/90 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-2 [&_p]:text-muted-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_li]:text-muted-foreground [&_a]:text-primary [&_a]:underline">
        {children}
      </div>
      <p className="mt-12 text-xs text-muted-foreground border-t border-border pt-6">
        easetraveler.net is operated by Ease Travel Solutions, Reg No 120261043921, Agora Village, Thabo Mbeki Road, Lusaka, Zambia.
      </p>
    </div>
  );
}
