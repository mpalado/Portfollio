import { Mail, Phone, Github, Linkedin, Globe, MapPin, Star } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
};

const projects: Project[] = [
  {
    title: "Mobile Banking UI",
    description: "Designed a secure, delightful mobile-first banking interface with real-time charts and PWA support.",
    tags: ["React", "Tailwind", "PWA"],
    link: "#",
  },
  {
    title: "AI Resume Builder",
    description: "Personalized resume generation with prompt-tuned LLMs and export to PDF/DOCX.",
    tags: ["TypeScript", "LLM", "Node"],
    link: "#",
  },
  {
    title: "Portfolio CMS",
    description: "Headless CMS driven portfolio with instant previews and content scheduling.",
    tags: ["CMS", "React", "SSR"],
    link: "#",
  },
];

const skills = [
  { group: "Frontend", items: ["React", "TypeScript", "Tailwind", "Three.js"] },
  { group: "Backend", items: ["Node.js", "Express", "Postgres", "Prisma"] },
  { group: "Tools", items: ["Git", "Vite", "Vitest", "Figma"] },
];

export default function Index() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(1200px_600px_at_10%_-20%,hsl(var(--primary)/0.15),transparent),radial-gradient(800px_400px_at_100%_0%,hsl(var(--accent)/0.25),transparent)]">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white/90 to-white/70 dark:from-black dark:via-black/80 dark:to-black/70" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-10 sm:py-16">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Profile Prototype
          </h1>
          <p className="mt-2 text-muted-foreground">
            A mobile-first personal/professional profile as a phone UI
          </p>
        </header>

        {/* Phone */}
        <div className="relative mx-auto w-[370px] max-w-[94vw]">
          {/* Glow */}
          <div className="absolute -inset-6 -z-10 rounded-[46px] bg-gradient-to-tr from-primary/30 via-fuchsia-500/20 to-blue-500/20 blur-2xl" />
          <div className="relative aspect-[9/19.5] w-full rounded-[40px] border border-black/10 bg-white shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-zinc-900">
            {/* Notch */}
            <div className="absolute left-1/2 top-2 h-6 w-28 -translate-x-1/2 rounded-b-[12px] rounded-t-[20px] bg-black/80 dark:bg-black/70" />

            {/* Screen */}
            <div className="absolute inset-2 rounded-[34px] overflow-hidden">
              {/* Top hero */}
              <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-primary to-fuchsia-500">
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(50%_80%_at_20%_-20%,white,transparent),radial-gradient(40%_60%_at_80%_120%,white,transparent)]" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <img
                    src="/placeholder.svg"
                    alt="Avatar"
                    className="h-12 w-12 rounded-full border-2 border-white/80 shadow-md"
                  />
                  <div className="text-white drop-shadow">
                    <p className="text-sm/5 opacity-90">Hello, I'm</p>
                    <h2 className="text-xl font-bold tracking-tight">Myk Palado</h2>
                  </div>
                </div>
              </div>

              {/* Content scroller */}
              <div className="h-[calc(100%-160px)] overflow-y-auto bg-gradient-to-b from-white/90 to-white/60 px-4 pb-24 pt-4 dark:from-zinc-900 dark:to-zinc-900/70">
                {/* Bio */}
                <Section title="Bio" icon={<MapPin className="h-4 w-4" />}>
                  <p className="text-sm text-muted-foreground">
                    Product-oriented software engineer focused on high-quality, accessible interfaces. I design and build fast, elegant web apps with a love for detail and DX.
                  </p>
                </Section>

                {/* Skills */}
                <Section title="Skills" icon={<Star className="h-4 w-4" />}>
                  <div className="space-y-3">
                    {skills.map((s) => (
                      <div key={s.group} className="rounded-xl border bg-white/70 p-3 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-zinc-800/60">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-foreground/70">
                          {s.group}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {s.items.map((i) => (
                            <span
                              key={i}
                              className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                            >
                              {i}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Projects */}
                <Section title="Projects" icon={<Github className="h-4 w-4" />}>
                  <div className="grid gap-3">
                    {projects.map((p) => (
                      <a
                        key={p.title}
                        href={p.link}
                        className="group relative overflow-hidden rounded-2xl border bg-white/80 p-4 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-zinc-800/70"
                      >
                        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-primary/30 to-fuchsia-500/30 blur-xl transition-all group-hover:scale-125" />
                        <h3 className="font-semibold tracking-tight">{p.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                          View <svg viewBox="0 0 20 20" className="h-4 w-4"><path d="M7 5h8v8" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M15 5 5 15" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                        </span>
                      </a>
                    ))}
                  </div>
                </Section>

                {/* Contact */}
                <Section title="Contact" icon={<Mail className="h-4 w-4" />}>
                  <div className="grid grid-cols-2 gap-2">
                    <ContactButton href="mailto:hello@example.com" icon={<Mail className="h-4 w-4" />} label="Email" />
                    <ContactButton href="tel:+1234567890" icon={<Phone className="h-4 w-4" />} label="Call" />
                    <ContactButton href="#" icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
                    <ContactButton href="#" icon={<Github className="h-4 w-4" />} label="GitHub" />
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Prefer a portfolio site? <a className="inline-flex items-center gap-1 font-medium text-primary" href="#"><Globe className="h-3.5 w-3.5" /> Visit Website</a>
                  </div>
                </Section>

                {/* Other Details */}
                <Section title="More" icon={<Globe className="h-4 w-4" />}>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><span className="font-medium text-foreground">Location:</span> Manila, PH (Remote-friendly)</li>
                    <li><span className="font-medium text-foreground">Experience:</span> 6+ years building products end‑to‑end</li>
                    <li><span className="font-medium text-foreground">Availability:</span> Open to freelance and full-time roles</li>
                    <li><span className="font-medium text-foreground">Interests:</span> Design systems, 3D on the web, accessibility</li>
                  </ul>
                </Section>

                <div className="pt-6 text-center text-[10px] text-muted-foreground">
                  © {new Date().getFullYear()} Myk Palado — Crafted with care
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center text-xs text-muted-foreground">
          Tip: View on mobile or resize to see the phone UI. Toggle dark mode in your OS to preview.
        </footer>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-semibold tracking-wide text-foreground/80">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function ContactButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center justify-center gap-2 rounded-xl border bg-white/80 px-3 py-2 text-sm font-medium text-foreground shadow-sm ring-1 ring-inset ring-black/5 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-zinc-800/70"
    >
      <span className="text-primary transition-transform group-hover:-translate-y-0.5">{icon}</span>
      {label}
    </a>
  );
}
