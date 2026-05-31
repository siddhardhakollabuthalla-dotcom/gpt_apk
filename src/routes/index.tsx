import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Users,
  Briefcase,
  Bell,
  Award,
  Download,
  BookOpen,
  Building2,
  ShieldCheck,
  Wifi,
  Cpu,
  Camera,
  Droplets,
  Trophy,
  Library,
  FileText,
  ChevronRight,
} from "lucide-react";
import heroCampus from "@/assets/hero-campus.jpg";
import principalImg from "@/assets/principal.jpg";
import galLab from "@/assets/gallery-lab.jpg";
import galClass from "@/assets/gallery-classroom.jpg";
import galWorkshop from "@/assets/gallery-workshop.jpg";
import galLibrary from "@/assets/gallery-library.jpg";
import galEvent from "@/assets/gallery-event.jpg";
import galCampus from "@/assets/gallery-campus.jpg";
import PublicHeader from "@/components/ui/PublicHeader";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Government Polytechnic, Anakapalli — SBTET Diploma in CME & ECE" },
      {
        name: "description",
        content:
          "Government Polytechnic, Anakapalli — SBTET-recognized diploma programs in Computer Engineering and Electronics & Communication on a 9.74-acre campus.",
      },
    ],
  }),
});
const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Departments", href: "#departments" },
  { label: "Faculty", href: "#faculty" },
  { label: "Events", href: "/Events" },
  { label: "Login", href: "/Login" },
  { label: "Careers", href: "#careers" },
  { label: "Notices", href: "#notices" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const quickAccess = [
  { title: "Departments", sub: "CME & ECE", icon: GraduationCap, href: "#departments" },
  { title: "Faculty", sub: "Meet our team", icon: Users, href: "#faculty" },
  { title: "Events", sub: "Workshops & celebrations", icon: Trophy, href: "/Events" },
  { title: "Placements", sub: "Strong record", icon: Briefcase, href: "#careers" },
  { title: "Notices", sub: "Latest updates", icon: Bell, href: "#notices" },
  { title: "Scholarships", sub: "SC/ST/BC/EBC", icon: Award, href: "#scholarships" },
  { title: "Downloads", sub: "Forms & syllabus", icon: Download, href: "#downloads" },
  { title: "Results", sub: "Sem & exam", icon: FileText, href: "#results" },
  { title: "Library", sub: "Books & e-resources", icon: Library, href: "#library" },
];

const whyUs = [
  {
    title: "Government recognized",
    sub: "AICTE & SBTET Andhra Pradesh approved",
    icon: ShieldCheck,
  },
  {
    title: "Affordable education",
    sub: "Subsidized fees with full scholarship support",
    icon: Award,
  },
  {
    title: "Industry-ready labs",
    sub: "150+ computers, CISCO routing & switching setup",
    icon: Cpu,
  },
  {
    title: "Safe & modern campus",
    sub: "CCTV, AEBAS biometric, RO/UV drinking water",
    icon: Building2,
  },
];

const facilities = [
  { label: "Seminar Hall", icon: Building2 },
  { label: "Central Library", icon: Library },
  { label: "Girls Waiting Hall", icon: Users },
  { label: "Playgrounds", icon: Trophy },
  { label: "RO/UV Drinking Water", icon: Droplets },
  { label: "CCTV Surveillance", icon: Camera },
  { label: "AEBAS Biometric", icon: ShieldCheck },
  { label: "CISCO Networking", icon: Wifi },
  { label: "Skill Dev. Center", icon: Cpu },
  { label: "Intercom System", icon: Phone },
];

const notices = [
  { date: "12 May 2026", tag: "Examination", title: "III Semester end-exam timetable announced" },
  {
    date: "08 May 2026",
    tag: "Placements",
    title: "TCS recruitment drive on 22 May — register now",
  },
  { date: "02 May 2026", tag: "Academics", title: "Industrial visit schedule for CME & ECE" },
  { date: "28 Apr 2026", tag: "Scholarships", title: "Post-matric scholarship renewal forms open" },
];

const gallery = [
  { src: galLab, alt: "Computer lab" },
  { src: galClass, alt: "Classroom" },
  { src: galWorkshop, alt: "Workshop" },
  { src: galLibrary, alt: "Library" },
  { src: galEvent, alt: "Campus event" },
  { src: galCampus, alt: "Campus building" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader active="Home" />

      {/* Hero */}
      <section id="home" className="relative isolate overflow-hidden">
        <img
          src={heroCampus}
          alt="Government Polytechnic, Anakapalli campus"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:py-40 text-navy-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy/30 backdrop-blur px-3 py-1 text-xs uppercase tracking-wider text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Government of Andhra Pradesh · Estd. 2008
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
            Building skilled engineers for a stronger India.
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-navy-foreground/85 leading-relaxed">
            Government Polytechnic, Anakapalli offers SBTET-recognized diploma programs in Computer
            Engineering and Electronics &amp; Communication — set on a 9.74-acre campus at Rebaka
            village with modern laboratories, 100 Mbps networked classrooms and dedicated faculty.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#departments"
              className="inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-5 py-3 font-medium hover:brightness-105 transition shadow-lg shadow-black/20"
            >
              Explore Departments <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 backdrop-blur px-5 py-3 font-medium text-white hover:bg-white/10 transition"
            >
              About the Institution
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
            {[
              ["2008", "Established"],
              ["2", "Diploma programs"],
              ["132", "Annual intake"],
              ["9.74", "Acre campus"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="text-3xl sm:text-4xl font-bold text-gold font-display">{n}</dt>
                <dd className="text-sm text-navy-foreground/80 mt-1">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Quick access */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <Eyebrow>Quick Access</Eyebrow>
          <SectionTitle>Everything students and parents need</SectionTitle>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Find results, scholarships, notices and academic resources — all in one place.
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickAccess.map((q) => (
              <a
                key={q.title}
                href={q.href}
                className="group rounded-2xl border border-border bg-card p-5 hover:border-gold hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="h-10 w-10 rounded-xl bg-secondary text-navy grid place-items-center group-hover:bg-gold group-hover:text-gold-foreground transition-colors">
                  <q.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-semibold text-foreground">{q.title}</div>
                <div className="text-sm text-muted-foreground">{q.sub}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About / Why */}
      <section id="about" className="py-20 sm:py-24 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <Eyebrow>Why Government Polytechnic, Anakapalli</Eyebrow>
            <SectionTitle>A trusted government institution with a modern outlook.</SectionTitle>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Industry-relevant curriculum, well-equipped labs, 100 Mbps networked classrooms and
              dedicated mentoring — on a calm 9.74-acre campus adjacent to the hills at Rebaka.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {whyUs.map((w) => (
                <div key={w.title} className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-navy text-gold grid place-items-center">
                    <w.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{w.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">{w.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["132", "Annual intake"],
              ["150+", "Computers in labs"],
              ["100 Mbps", "Internet connectivity"],
              ["9.74+ acres", "Green campus"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-card border border-border p-6">
                <div className="text-3xl font-bold font-display text-navy">{n}</div>
                <div className="text-sm text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <Eyebrow>Academics</Eyebrow>
          <SectionTitle>Two diploma programs. One commitment to excellence.</SectionTitle>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Three-year SBTET-approved diploma courses with strong fundamentals and hands-on
            training.
          </p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {[
              {
                code: "CME",
                title: "Computer Engineering",
                desc: "Programming foundations, web & mobile development, databases, networks and AI essentials.",
              },
              {
                code: "ECE",
                title: "Electronics & Communication Engineering",
                desc: "Analog & digital electronics, embedded systems, communication and VLSI fundamentals.",
              },
            ].map((d) => (
              <article
                key={d.code}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 hover:shadow-xl transition"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/10 group-hover:bg-gold/20 transition" />
                <div className="relative">
                  <span className="inline-block rounded-md bg-navy text-navy-foreground px-2.5 py-1 text-xs font-semibold tracking-wide">
                    {d.code}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold text-foreground">{d.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{d.desc}</p>
                  <a
                    href="#"
                    className="mt-6 inline-flex items-center gap-1.5 text-navy font-medium group-hover:text-gold-foreground"
                  >
                    Explore department <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="py-20 sm:py-24 bg-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow tone="gold">After the Diploma</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight">
              Higher education first, with placement support too.
            </h2>
            <p className="mt-5 text-navy-foreground/80 leading-relaxed">
              Nearly all our graduates progress to higher education — pursuing B.Tech via ECET or
              AMIE — while interested students are supported by the placement cell for industry
              roles and apprenticeships.
            </p>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-5 py-3 font-medium hover:brightness-105 transition"
            >
              Explore career pathways <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["B.Tech", "via ECET"],
              ["AMIE", "Pathway"],
              ["Industry", "Placements"],
              ["Apprentice", "Programs"],
            ].map(([t, s]) => (
              <div
                key={t}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur"
              >
                <div className="text-2xl font-bold text-gold font-display">{t}</div>
                <div className="text-sm text-navy-foreground/75 mt-1">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <Eyebrow>Campus facilities</Eyebrow>
          <SectionTitle>Built for learning, comfort and safety.</SectionTitle>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {facilities.map((f) => (
              <div
                key={f.label}
                className="rounded-xl border border-border bg-card px-4 py-5 flex items-center gap-3 hover:border-gold transition"
              >
                <div className="h-9 w-9 rounded-lg bg-secondary text-navy grid place-items-center">
                  <f.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-foreground">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal */}
      <section id="faculty" className="py-20 sm:py-24 bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-[280px_1fr] gap-10 items-center">
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gold/20 -z-10" />
            <img
              src={principalImg}
              alt="Principal portrait"
              width={400}
              height={400}
              loading="lazy"
              className="rounded-3xl object-cover w-full aspect-square shadow-xl"
            />
          </div>
          <div>
            <Eyebrow>Principal's Desk</Eyebrow>
            <blockquote className="mt-4 text-xl sm:text-2xl font-display text-foreground leading-snug">
              "Since 2008, our institution has nurtured technical competence, innovation and ethical
              values. With NBA-accredited diploma programs, a state-of-the-art IoT Laboratory and
              100% placements over the last three years, we remain committed to transforming
              students into responsible citizens and skilled professionals."
            </blockquote>
            <div className="mt-6">
              <div className="font-semibold text-foreground">
                Prof. I.V.S.S. Srinivasa Rao, M.E.
              </div>
              <div className="text-sm text-muted-foreground">
                Principal, Government Polytechnic, Anakapalli
              </div>
            </div>
            <a href="#" className="mt-6 inline-flex items-center gap-1.5 text-navy font-medium">
              Read full message <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Notices */}
      <section id="notices" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <Eyebrow>Updates</Eyebrow>
              <SectionTitle>Latest notices &amp; announcements</SectionTitle>
            </div>
            <a href="#" className="inline-flex items-center gap-1.5 text-navy font-medium">
              View all notices <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {notices.map((n) => (
              <article
                key={n.title}
                className="group rounded-2xl border border-border bg-card p-6 hover:border-gold transition flex gap-5"
              >
                <div className="h-12 w-12 shrink-0 rounded-xl bg-navy text-gold grid place-items-center">
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{n.date}</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="text-gold-foreground/80 font-medium uppercase tracking-wide bg-gold/15 px-2 py-0.5 rounded">
                      {n.tag}
                    </span>
                  </div>
                  <h3 className="mt-2 font-semibold text-foreground text-lg">{n.title}</h3>
                  <a
                    href="#"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-navy font-medium"
                  >
                    <Download className="h-4 w-4" /> Download PDF
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 sm:py-24 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4">
          <Eyebrow>Campus Life</Eyebrow>
          <SectionTitle>A glimpse of Government Polytechnic, Anakapalli</SectionTitle>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((g, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl bg-card border border-border ${i === 0 ? "md:row-span-2 md:col-span-2 aspect-square" : "aspect-[4/3]"}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a href="#" className="inline-flex items-center gap-1.5 text-navy font-medium">
              View full gallery <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 grid md:grid-cols-2 gap-10 items-start">
            <div>
              <Eyebrow>Get in touch</Eyebrow>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Have a question? We're here to help.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Reach our office for academic queries, certificates or general information.
                Admissions are conducted centrally through SBTET Andhra Pradesh via POLYCET.
              </p>
            </div>
            <div className="space-y-5">
              <ContactRow
                icon={MapPin}
                title="Address"
                value="Rebaka village, Anakapalli district, Andhra Pradesh"
              />
              <ContactRow icon={Phone} title="Phone" value="+91 90102 22173" />
              <ContactRow icon={Mail} title="Email" value="polytechnic.government173@gmail.com" />
              <ContactRow
                icon={BookOpen}
                title="Office hours"
                value="Mon – Sat · 9:30 AM – 5:00 PM"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gold text-gold-foreground grid place-items-center font-display font-bold">
                GP
              </div>
              <div>
                <div className="font-display font-semibold">Government Polytechnic, Anakapalli</div>
                <div className="text-xs text-navy-foreground/70">
                  Knowledge is Power · Estd. 2008
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm text-navy-foreground/75 max-w-md leading-relaxed">
              An SBTET-approved government polytechnic institution offering three-year diploma
              programs in CME and ECE since 2008.
            </p>
          </div>
          <div>
            <div className="font-semibold text-gold">Quick links</div>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
              {nav.slice(1, 6).map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="hover:text-gold">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gold">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
              <li>Rebaka, Anakapalli, AP</li>
              <li>+91 90102 22173</li>
              <li className="break-all">polytechnic.government173@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-navy-foreground/60 flex flex-wrap items-center justify-between gap-2">
            <span>
              © {new Date().getFullYear()} Government Polytechnic, Anakapalli. All rights reserved.
            </span>
            <span>Government of Andhra Pradesh</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Eyebrow({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "gold";
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold ${tone === "gold" ? "text-gold" : "text-navy"}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${tone === "gold" ? "bg-gold" : "bg-gold"}`} />
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground leading-tight max-w-3xl">
      {children}
    </h2>
  );
}

function ContactRow({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Phone;
  title: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 shrink-0 rounded-lg bg-navy text-gold grid place-items-center">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="text-foreground font-medium mt-0.5">{value}</div>
      </div>
    </div>
  );
}
