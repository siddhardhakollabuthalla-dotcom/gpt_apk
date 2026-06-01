import { jsxs, jsx } from "react/jsx-runtime";
import { ArrowRight, GraduationCap, Users, Trophy, Briefcase, Bell, Award, Download, FileText, Library, ShieldCheck, Cpu, Building2, ChevronRight, Droplets, Camera, Wifi, Phone, MapPin, Mail, BookOpen } from "lucide-react";
import { P as PublicHeader } from "./PublicHeader-BJH-8ORm.js";
import "react";
import "@tanstack/react-router";
const heroCampus = "/assets/hero-campus-fnIY6iKD.jpg";
const principalImg = "/assets/principal-DUtGMlvK.jpg";
const galLab = "/assets/gallery-lab-lAH62ZfL.jpg";
const galClass = "/assets/gallery-classroom-CK__FtDg.jpg";
const galWorkshop = "/assets/gallery-workshop-qxb-DbEV.jpg";
const galLibrary = "/assets/gallery-library-BWRYXWxi.jpg";
const galEvent = "/assets/gallery-event-CG0www9m.jpg";
const galCampus = "/assets/gallery-campus-B57uHBnw.jpg";
const nav = [{
  label: "Home",
  href: "/"
}, {
  label: "About",
  href: "#about"
}, {
  label: "Departments",
  href: "#departments"
}, {
  label: "Faculty",
  href: "#faculty"
}, {
  label: "Events",
  href: "/Events"
}, {
  label: "Login",
  href: "/Login"
}, {
  label: "Careers",
  href: "#careers"
}, {
  label: "Notices",
  href: "#notices"
}, {
  label: "Gallery",
  href: "#gallery"
}, {
  label: "Contact",
  href: "#contact"
}];
const quickAccess = [{
  title: "Departments",
  sub: "CME & ECE",
  icon: GraduationCap,
  href: "#departments"
}, {
  title: "Faculty",
  sub: "Meet our team",
  icon: Users,
  href: "#faculty"
}, {
  title: "Events",
  sub: "Workshops & celebrations",
  icon: Trophy,
  href: "/Events"
}, {
  title: "Placements",
  sub: "Strong record",
  icon: Briefcase,
  href: "#careers"
}, {
  title: "Notices",
  sub: "Latest updates",
  icon: Bell,
  href: "#notices"
}, {
  title: "Scholarships",
  sub: "SC/ST/BC/EBC",
  icon: Award,
  href: "#scholarships"
}, {
  title: "Downloads",
  sub: "Forms & syllabus",
  icon: Download,
  href: "#downloads"
}, {
  title: "Results",
  sub: "Sem & exam",
  icon: FileText,
  href: "#results"
}, {
  title: "Library",
  sub: "Books & e-resources",
  icon: Library,
  href: "#library"
}];
const whyUs = [{
  title: "Government recognized",
  sub: "AICTE & SBTET Andhra Pradesh approved",
  icon: ShieldCheck
}, {
  title: "Affordable education",
  sub: "Subsidized fees with full scholarship support",
  icon: Award
}, {
  title: "Industry-ready labs",
  sub: "150+ computers, CISCO routing & switching setup",
  icon: Cpu
}, {
  title: "Safe & modern campus",
  sub: "CCTV, AEBAS biometric, RO/UV drinking water",
  icon: Building2
}];
const facilities = [{
  label: "Seminar Hall",
  icon: Building2
}, {
  label: "Central Library",
  icon: Library
}, {
  label: "Girls Waiting Hall",
  icon: Users
}, {
  label: "Playgrounds",
  icon: Trophy
}, {
  label: "RO/UV Drinking Water",
  icon: Droplets
}, {
  label: "CCTV Surveillance",
  icon: Camera
}, {
  label: "AEBAS Biometric",
  icon: ShieldCheck
}, {
  label: "CISCO Networking",
  icon: Wifi
}, {
  label: "Skill Dev. Center",
  icon: Cpu
}, {
  label: "Intercom System",
  icon: Phone
}];
const notices = [{
  date: "12 May 2026",
  tag: "Examination",
  title: "III Semester end-exam timetable announced"
}, {
  date: "08 May 2026",
  tag: "Placements",
  title: "TCS recruitment drive on 22 May — register now"
}, {
  date: "02 May 2026",
  tag: "Academics",
  title: "Industrial visit schedule for CME & ECE"
}, {
  date: "28 Apr 2026",
  tag: "Scholarships",
  title: "Post-matric scholarship renewal forms open"
}];
const gallery = [{
  src: galLab,
  alt: "Computer lab"
}, {
  src: galClass,
  alt: "Classroom"
}, {
  src: galWorkshop,
  alt: "Workshop"
}, {
  src: galLibrary,
  alt: "Library"
}, {
  src: galEvent,
  alt: "Campus event"
}, {
  src: galCampus,
  alt: "Campus building"
}];
function Index() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(PublicHeader, { active: "Home" }),
    /* @__PURE__ */ jsxs("section", { id: "home", className: "relative isolate overflow-hidden", children: [
      /* @__PURE__ */ jsx("img", { src: heroCampus, alt: "Government Polytechnic, Anakapalli campus", width: 1600, height: 1e3, className: "absolute inset-0 h-full w-full object-cover" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: {
        background: "var(--gradient-hero)"
      } }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:py-40 text-navy-foreground", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy/30 backdrop-blur px-3 py-1 text-xs uppercase tracking-wider text-gold", children: [
          /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-gold" }),
          "Government of Andhra Pradesh · Estd. 2008"
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]", children: "Building skilled engineers for a stronger India." }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-2xl text-base sm:text-lg text-navy-foreground/85 leading-relaxed", children: "Government Polytechnic, Anakapalli offers SBTET-recognized diploma programs in Computer Engineering and Electronics & Communication — set on a 9.74-acre campus at Rebaka village with modern laboratories, 100 Mbps networked classrooms and dedicated faculty." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxs("a", { href: "#departments", className: "inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-5 py-3 font-medium hover:brightness-105 transition shadow-lg shadow-black/20", children: [
            "Explore Departments ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsx("a", { href: "#about", className: "inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 backdrop-blur px-5 py-3 font-medium text-white hover:bg-white/10 transition", children: "About the Institution" })
        ] }),
        /* @__PURE__ */ jsx("dl", { className: "mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl", children: [["2008", "Established"], ["2", "Diploma programs"], ["132", "Annual intake"], ["9.74", "Acre campus"]].map(([n, l]) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { className: "text-3xl sm:text-4xl font-bold text-gold font-display", children: n }),
          /* @__PURE__ */ jsx("dd", { className: "text-sm text-navy-foreground/80 mt-1", children: l })
        ] }, l)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [
      /* @__PURE__ */ jsx(Eyebrow, { children: "Quick Access" }),
      /* @__PURE__ */ jsx(SectionTitle, { children: "Everything students and parents need" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground max-w-2xl", children: "Find results, scholarships, notices and academic resources — all in one place." }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-2 md:grid-cols-4 gap-4", children: quickAccess.map((q) => /* @__PURE__ */ jsxs("a", { href: q.href, className: "group rounded-2xl border border-border bg-card p-5 hover:border-gold hover:shadow-lg hover:-translate-y-0.5 transition-all", children: [
        /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-xl bg-secondary text-navy grid place-items-center group-hover:bg-gold group-hover:text-gold-foreground transition-colors", children: /* @__PURE__ */ jsx(q.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 font-semibold text-foreground", children: q.title }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: q.sub })
      ] }, q.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "about", className: "py-20 sm:py-24 bg-secondary/50", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Eyebrow, { children: "Why Government Polytechnic, Anakapalli" }),
        /* @__PURE__ */ jsx(SectionTitle, { children: "A trusted government institution with a modern outlook." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed", children: "Industry-relevant curriculum, well-equipped labs, 100 Mbps networked classrooms and dedicated mentoring — on a calm 9.74-acre campus adjacent to the hills at Rebaka." }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid sm:grid-cols-2 gap-5", children: whyUs.map((w) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "h-10 w-10 shrink-0 rounded-lg bg-navy text-gold grid place-items-center", children: /* @__PURE__ */ jsx(w.icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-foreground", children: w.title }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground mt-1", children: w.sub })
          ] })
        ] }, w.title)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: [["132", "Annual intake"], ["150+", "Computers in labs"], ["100 Mbps", "Internet connectivity"], ["9.74+ acres", "Green campus"]].map(([n, l]) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border border-border p-6", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold font-display text-navy", children: n }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground mt-1", children: l })
      ] }, l)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "departments", className: "py-20 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [
      /* @__PURE__ */ jsx(Eyebrow, { children: "Academics" }),
      /* @__PURE__ */ jsx(SectionTitle, { children: "Two diploma programs. One commitment to excellence." }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground max-w-2xl", children: "Three-year SBTET-approved diploma courses with strong fundamentals and hands-on training." }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid md:grid-cols-2 gap-6", children: [{
        code: "CME",
        title: "Computer Engineering",
        desc: "Programming foundations, web & mobile development, databases, networks and AI essentials."
      }, {
        code: "ECE",
        title: "Electronics & Communication Engineering",
        desc: "Analog & digital electronics, embedded systems, communication and VLSI fundamentals."
      }].map((d) => /* @__PURE__ */ jsxs("article", { className: "group relative overflow-hidden rounded-3xl border border-border bg-card p-8 hover:shadow-xl transition", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/10 group-hover:bg-gold/20 transition" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block rounded-md bg-navy text-navy-foreground px-2.5 py-1 text-xs font-semibold tracking-wide", children: d.code }),
          /* @__PURE__ */ jsx("h3", { className: "mt-4 text-2xl font-bold text-foreground", children: d.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: d.desc }),
          /* @__PURE__ */ jsxs("a", { href: "#", className: "mt-6 inline-flex items-center gap-1.5 text-navy font-medium group-hover:text-gold-foreground", children: [
            "Explore department ",
            /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] }, d.code)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "careers", className: "py-20 sm:py-24 bg-navy text-navy-foreground", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Eyebrow, { tone: "gold", children: "After the Diploma" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl sm:text-4xl font-bold leading-tight", children: "Higher education first, with placement support too." }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-navy-foreground/80 leading-relaxed", children: "Nearly all our graduates progress to higher education — pursuing B.Tech via ECET or AMIE — while interested students are supported by the placement cell for industry roles and apprenticeships." }),
        /* @__PURE__ */ jsxs("a", { href: "#", className: "mt-8 inline-flex items-center gap-2 rounded-xl bg-gold text-gold-foreground px-5 py-3 font-medium hover:brightness-105 transition", children: [
          "Explore career pathways ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: [["B.Tech", "via ECET"], ["AMIE", "Pathway"], ["Industry", "Placements"], ["Apprentice", "Programs"]].map(([t, s]) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur", children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gold font-display", children: t }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-navy-foreground/75 mt-1", children: s })
      ] }, t)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [
      /* @__PURE__ */ jsx(Eyebrow, { children: "Campus facilities" }),
      /* @__PURE__ */ jsx(SectionTitle, { children: "Built for learning, comfort and safety." }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4", children: facilities.map((f) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card px-4 py-5 flex items-center gap-3 hover:border-gold transition", children: [
        /* @__PURE__ */ jsx("div", { className: "h-9 w-9 rounded-lg bg-secondary text-navy grid place-items-center", children: /* @__PURE__ */ jsx(f.icon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: f.label })
      ] }, f.label)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "faculty", className: "py-20 sm:py-24 bg-secondary/50", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 grid md:grid-cols-[280px_1fr] gap-10 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-3 rounded-3xl bg-gold/20 -z-10" }),
        /* @__PURE__ */ jsx("img", { src: principalImg, alt: "Principal portrait", width: 400, height: 400, loading: "lazy", className: "rounded-3xl object-cover w-full aspect-square shadow-xl" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Eyebrow, { children: "Principal's Desk" }),
        /* @__PURE__ */ jsx("blockquote", { className: "mt-4 text-xl sm:text-2xl font-display text-foreground leading-snug", children: '"Since 2008, our institution has nurtured technical competence, innovation and ethical values. With NBA-accredited diploma programs, a state-of-the-art IoT Laboratory and 100% placements over the last three years, we remain committed to transforming students into responsible citizens and skilled professionals."' }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-foreground", children: "Prof. I.V.S.S. Srinivasa Rao, M.E." }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Principal, Government Polytechnic, Anakapalli" })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#", className: "mt-6 inline-flex items-center gap-1.5 text-navy font-medium", children: [
          "Read full message ",
          /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "notices", className: "py-20 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Eyebrow, { children: "Updates" }),
          /* @__PURE__ */ jsx(SectionTitle, { children: "Latest notices & announcements" })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#", className: "inline-flex items-center gap-1.5 text-navy font-medium", children: [
          "View all notices ",
          /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid md:grid-cols-2 gap-4", children: notices.map((n) => /* @__PURE__ */ jsxs("article", { className: "group rounded-2xl border border-border bg-card p-6 hover:border-gold transition flex gap-5", children: [
        /* @__PURE__ */ jsx("div", { className: "h-12 w-12 shrink-0 rounded-xl bg-navy text-gold grid place-items-center", children: /* @__PURE__ */ jsx(Bell, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx("span", { children: n.date }),
            /* @__PURE__ */ jsx("span", { className: "h-1 w-1 rounded-full bg-border" }),
            /* @__PURE__ */ jsx("span", { className: "text-gold-foreground/80 font-medium uppercase tracking-wide bg-gold/15 px-2 py-0.5 rounded", children: n.tag })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "mt-2 font-semibold text-foreground text-lg", children: n.title }),
          /* @__PURE__ */ jsxs("a", { href: "#", className: "mt-3 inline-flex items-center gap-1.5 text-sm text-navy font-medium", children: [
            /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
            " Download PDF"
          ] })
        ] })
      ] }, n.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "gallery", className: "py-20 sm:py-24 bg-secondary/50", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [
      /* @__PURE__ */ jsx(Eyebrow, { children: "Campus Life" }),
      /* @__PURE__ */ jsx(SectionTitle, { children: "A glimpse of Government Polytechnic, Anakapalli" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-2 md:grid-cols-3 gap-4", children: gallery.map((g, i) => /* @__PURE__ */ jsx("div", { className: `overflow-hidden rounded-2xl bg-card border border-border ${i === 0 ? "md:row-span-2 md:col-span-2 aspect-square" : "aspect-[4/3]"}`, children: /* @__PURE__ */ jsx("img", { src: g.src, alt: g.alt, width: 800, height: 600, loading: "lazy", className: "h-full w-full object-cover hover:scale-105 transition-transform duration-500" }) }, i)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxs("a", { href: "#", className: "inline-flex items-center gap-1.5 text-navy font-medium", children: [
        "View full gallery ",
        /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "contact", className: "py-20 sm:py-24", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-6xl px-4", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-border bg-card p-8 sm:p-12 grid md:grid-cols-2 gap-10 items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Eyebrow, { children: "Get in touch" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl sm:text-4xl font-bold text-foreground leading-tight", children: "Have a question? We're here to help." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed", children: "Reach our office for academic queries, certificates or general information. Admissions are conducted centrally through SBTET Andhra Pradesh via POLYCET." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsx(ContactRow, { icon: MapPin, title: "Address", value: "Rebaka village, Anakapalli district, Andhra Pradesh" }),
        /* @__PURE__ */ jsx(ContactRow, { icon: Phone, title: "Phone", value: "+91 90102 22173" }),
        /* @__PURE__ */ jsx(ContactRow, { icon: Mail, title: "Email", value: "polytechnic.government173@gmail.com" }),
        /* @__PURE__ */ jsx(ContactRow, { icon: BookOpen, title: "Office hours", value: "Mon – Sat · 9:30 AM – 5:00 PM" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("footer", { className: "bg-navy text-navy-foreground", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-14 grid md:grid-cols-4 gap-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-gold text-gold-foreground grid place-items-center font-display font-bold", children: "GP" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-display font-semibold", children: "Government Polytechnic, Anakapalli" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-navy-foreground/70", children: "Knowledge is Power · Estd. 2008" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm text-navy-foreground/75 max-w-md leading-relaxed", children: "An SBTET-approved government polytechnic institution offering three-year diploma programs in CME and ECE since 2008." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-gold", children: "Quick links" }),
          /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2 text-sm text-navy-foreground/80", children: nav.slice(1, 6).map((n) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: n.href, className: "hover:text-gold", children: n.label }) }, n.label)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-gold", children: "Contact" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-2 text-sm text-navy-foreground/80", children: [
            /* @__PURE__ */ jsx("li", { children: "Rebaka, Anakapalli, AP" }),
            /* @__PURE__ */ jsx("li", { children: "+91 90102 22173" }),
            /* @__PURE__ */ jsx("li", { className: "break-all", children: "polytechnic.government173@gmail.com" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-5 text-xs text-navy-foreground/60 flex flex-wrap items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Government Polytechnic, Anakapalli. All rights reserved."
        ] }),
        /* @__PURE__ */ jsx("span", { children: "Government of Andhra Pradesh" })
      ] }) })
    ] })
  ] });
}
function Eyebrow({
  children,
  tone = "default"
}) {
  return /* @__PURE__ */ jsxs("div", { className: `inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold ${tone === "gold" ? "text-gold" : "text-navy"}`, children: [
    /* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-full ${tone === "gold" ? "bg-gold" : "bg-gold"}` }),
    children
  ] });
}
function SectionTitle({
  children
}) {
  return /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl sm:text-4xl font-bold text-foreground leading-tight max-w-3xl", children });
}
function ContactRow({
  icon: Icon,
  title,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "h-10 w-10 shrink-0 rounded-lg bg-navy text-gold grid place-items-center", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: title }),
      /* @__PURE__ */ jsx("div", { className: "text-foreground font-medium mt-0.5", children: value })
    ] })
  ] });
}
export {
  Index as component
};
