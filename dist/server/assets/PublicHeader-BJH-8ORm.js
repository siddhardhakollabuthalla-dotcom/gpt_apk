import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Mail, X, Menu } from "lucide-react";
const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Departments", href: "/#departments" },
  { label: "Faculty", href: "/#faculty" },
  { label: "Events", href: "/Events" },
  { label: "Login", href: "/Login" },
  { label: "Careers", href: "/#careers" },
  { label: "Notices", href: "/#notices" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" }
];
function PublicHeader({ active = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "bg-navy text-navy-foreground text-xs", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "opacity-90", children: "Government of Andhra Pradesh · State Board of Technical Education & Training" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 opacity-90", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-3 w-3" }),
          " +91 90102 22173"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "hidden sm:inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Mail, { className: "h-3 w-3" }),
          " polytechnic.government173@gmail.com"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-navy text-gold grid place-items-center font-display font-bold", children: "GP" }),
        /* @__PURE__ */ jsxs("div", { className: "leading-tight", children: [
          /* @__PURE__ */ jsx("div", { className: "font-display font-semibold text-foreground", children: "Government Polytechnic, Anakapalli" }),
          /* @__PURE__ */ jsx("div", { className: "text-[11px] text-muted-foreground", children: "Knowledge is Power · Estd. 2008" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden lg:flex items-center gap-7 text-sm", children: nav.map((item) => /* @__PURE__ */ jsx(
        "a",
        {
          href: item.href,
          className: `relative text-foreground/80 hover:text-foreground transition-colors ${active === item.label ? "text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-6 after:bg-gold" : ""}`,
          children: item.label
        },
        item.label
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/#contact",
            className: "hidden sm:inline-flex items-center gap-2 rounded-lg bg-navy text-navy-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition",
            children: "Contact Us"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsOpen(!isOpen),
            className: "lg:hidden p-2 rounded-lg hover:bg-muted text-foreground transition",
            "aria-label": "Toggle Navigation",
            children: isOpen ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
          }
        )
      ] })
    ] }) }),
    isOpen && /* @__PURE__ */ jsx("div", { className: "lg:hidden sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur-md shadow-lg transition-all", children: /* @__PURE__ */ jsxs("nav", { className: "flex flex-col p-4 space-y-2", children: [
      nav.map((item) => /* @__PURE__ */ jsx(
        "a",
        {
          href: item.href,
          onClick: () => setIsOpen(false),
          className: `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active === item.label ? "bg-navy text-navy-foreground dark:bg-gold dark:text-gold-foreground" : "text-foreground/80 hover:text-foreground hover:bg-muted"}`,
          children: item.label
        },
        item.label
      )),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/#contact",
          onClick: () => setIsOpen(false),
          className: "block sm:hidden text-center rounded-lg bg-navy text-navy-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90 transition",
          children: "Contact Us"
        }
      )
    ] }) })
  ] });
}
export {
  PublicHeader as P
};
