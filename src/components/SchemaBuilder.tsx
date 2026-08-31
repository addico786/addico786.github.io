"use client";

import { useMemo, useState } from "react";

/* The types an Indian small business actually is, rather than the full
   schema.org tree. Each is a LocalBusiness subtype, so all of them keep the
   local signals. */
const TYPES = [
  ["ProfessionalService", "Consultant, agency, freelancer, clinic"],
  ["LocalBusiness", "Anything that does not fit the others"],
  ["Store", "Retail with a shopfront"],
  ["HomeAndConstructionBusiness", "Builder, contractor, interiors, plumbing"],
  ["Restaurant", "Restaurant, cafe, cloud kitchen"],
  ["HealthAndBeautyBusiness", "Salon, spa, gym"],
  ["AutomotiveBusiness", "Garage, dealership, detailing"],
  ["EducationalOrganization", "Coaching centre, school, training"],
] as const;

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type State = {
  type: string;
  name: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  street: string;
  locality: string;
  region: string;
  postal: string;
  country: string;
  serviceArea: boolean;
  areas: string;
  priceRange: string;
  sameAs: string;
  days: string[];
  opens: string;
  closes: string;
};

const INITIAL: State = {
  type: "ProfessionalService",
  name: "",
  description: "",
  url: "",
  phone: "",
  email: "",
  street: "",
  locality: "",
  region: "",
  postal: "",
  country: "IN",
  serviceArea: false,
  areas: "",
  priceRange: "",
  sameAs: "",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "09:00",
  closes: "18:00",
};

/** Split a textarea or comma list into clean lines. */
const list = (s: string) =>
  s.split(/[\n,]/).map((x) => x.trim()).filter(Boolean);

function build(f: State) {
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": f.type,
  };

  if (f.name) out.name = f.name;
  if (f.description) out.description = f.description;
  if (f.url) {
    out.url = f.url;
    /* A stable @id is what lets every other page reference this same entity
       instead of describing a second one. */
    out["@id"] = `${f.url.replace(/\/$/, "")}/#business`;
  }
  if (f.phone) out.telephone = f.phone;
  if (f.email) out.email = `mailto:${f.email}`;
  if (f.priceRange) out.priceRange = f.priceRange;

  const addr: Record<string, string> = { "@type": "PostalAddress" };
  /* A service-area business omits the street but keeps city and country —
     that is what makes it eligible for local results without publishing a
     home address. Dropping the address entirely loses the local signal. */
  if (f.street && !f.serviceArea) addr.streetAddress = f.street;
  if (f.locality) addr.addressLocality = f.locality;
  if (f.region) addr.addressRegion = f.region;
  if (f.postal && !f.serviceArea) addr.postalCode = f.postal;
  if (f.country) addr.addressCountry = f.country;
  if (Object.keys(addr).length > 1) out.address = addr;

  const areas = list(f.areas);
  if (areas.length) {
    out.areaServed = areas.map((a) => ({ "@type": "Place", name: a }));
  }

  if (f.days.length && f.opens && f.closes) {
    out.openingHoursSpecification = [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: f.days,
        opens: f.opens,
        closes: f.closes,
      },
    ];
  }

  const social = list(f.sameAs);
  if (social.length) out.sameAs = social;

  return out;
}

export default function SchemaBuilder() {
  const [f, setF] = useState<State>(INITIAL);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof State>(k: K, v: State[K]) =>
    setF((p) => ({ ...p, [k]: v }));

  const json = useMemo(() => JSON.stringify(build(f), null, 2), [f]);
  const snippet = `<script type="application/ld+json">\n${json}\n</script>`;

  /* Warnings, not validation errors. The output stays valid JSON-LD either
     way; these are the fields whose absence quietly costs you eligibility. */
  const warnings = useMemo(() => {
    const w: string[] = [];
    if (!f.name) w.push("Add a business name — nothing works without it.");
    if (!f.url) w.push("Add your website URL. It becomes the @id that ties this entity to your pages.");
    if (!f.locality) w.push("Add a city. Without it you cannot appear in local or “near me” results.");
    if (!f.phone && !f.email) w.push("Add a phone number or an email, or there is no way to contact you.");
    if (f.serviceArea && !f.areas) w.push("You marked this a service-area business but named no areas.");
    return w;
  }, [f]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard is blocked in some embedded and non-secure contexts. The
         textarea below is selectable, so there is always a manual path. */
      setCopied(false);
    }
  }

  const field = (
    label: string,
    key: keyof State,
    placeholder = "",
    hint?: string
  ) => (
    <label className="sb__field">
      <span className="sb__label u-mono">{label}</span>
      <input
        className="sb__input"
        value={f[key] as string}
        placeholder={placeholder}
        onChange={(e) => set(key, e.target.value as State[keyof State])}
      />
      {hint ? <span className="sb__hint">{hint}</span> : null}
    </label>
  );

  return (
    <div className="sb">
      <div className="sb__form">
        <fieldset className="sb__group">
          <legend className="sb__legend u-mono">What the business is</legend>

          <label className="sb__field">
            <span className="sb__label u-mono">Business type</span>
            <select
              className="sb__input"
              value={f.type}
              onChange={(e) => set("type", e.target.value)}
            >
              {TYPES.map(([t, desc]) => (
                <option key={t} value={t}>
                  {t} — {desc}
                </option>
              ))}
            </select>
          </label>

          {field("Name", "name", "Archipillar Construction")}

          <label className="sb__field">
            <span className="sb__label u-mono">Description</span>
            <textarea
              className="sb__input sb__input--area"
              rows={3}
              value={f.description}
              placeholder="One or two sentences. What you do, for whom, where."
              onChange={(e) => set("description", e.target.value)}
            />
          </label>

          {field("Website", "url", "https://example.com", "Becomes the @id other pages reference.")}
          {field("Phone", "phone", "+91 98765 43210", "Full international format.")}
          {field("Email", "email", "hello@example.com")}
          {field("Price range", "priceRange", "₹₹", "₹ to ₹₹₹₹, or a range like ₹15,000–₹80,000.")}
        </fieldset>

        <fieldset className="sb__group">
          <legend className="sb__legend u-mono">Where it is</legend>

          <label className="sb__check">
            <input
              type="checkbox"
              checked={f.serviceArea}
              onChange={(e) => set("serviceArea", e.target.checked)}
            />
            <span>
              <strong>I visit clients — I do not receive them</strong>
              <span className="sb__hint">
                Tick this if you work from home or on site. The street address is
                left out of the markup, but the city stays, so you keep local
                visibility without publishing where you live.
              </span>
            </span>
          </label>

          {!f.serviceArea && field("Street address", "street", "12 Ring Road")}
          {field("City", "locality", "Delhi")}
          {field("State", "region", "Delhi")}
          {!f.serviceArea && field("Postal code", "postal", "110024")}
          {field("Country code", "country", "IN", "Two letters. IN, US, GB.")}

          <label className="sb__field">
            <span className="sb__label u-mono">Areas served</span>
            <textarea
              className="sb__input sb__input--area"
              rows={2}
              value={f.areas}
              placeholder="Delhi, Noida, Gurugram"
              onChange={(e) => set("areas", e.target.value)}
            />
            <span className="sb__hint">
              One per line, or comma separated. Name real places you would take
              work in — a list of thirty cities reads as spam.
            </span>
          </label>
        </fieldset>

        <fieldset className="sb__group">
          <legend className="sb__legend u-mono">Opening hours</legend>
          <div className="sb__days">
            {DAYS.map((d) => (
              <label key={d} className="sb__day">
                <input
                  type="checkbox"
                  checked={f.days.includes(d)}
                  onChange={(e) =>
                    set(
                      "days",
                      e.target.checked
                        ? [...f.days, d]
                        : f.days.filter((x) => x !== d)
                    )
                  }
                />
                <span>{d.slice(0, 3)}</span>
              </label>
            ))}
          </div>
          <div className="sb__times">
            <label className="sb__field">
              <span className="sb__label u-mono">Opens</span>
              <input
                type="time"
                className="sb__input"
                value={f.opens}
                onChange={(e) => set("opens", e.target.value)}
              />
            </label>
            <label className="sb__field">
              <span className="sb__label u-mono">Closes</span>
              <input
                type="time"
                className="sb__input"
                value={f.closes}
                onChange={(e) => set("closes", e.target.value)}
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="sb__group">
          <legend className="sb__legend u-mono">Profiles</legend>
          <label className="sb__field">
            <span className="sb__label u-mono">Social and directory links</span>
            <textarea
              className="sb__input sb__input--area"
              rows={4}
              value={f.sameAs}
              placeholder={"https://www.instagram.com/…\nhttps://www.linkedin.com/…\nhttps://g.page/…"}
              onChange={(e) => set("sameAs", e.target.value)}
            />
            <span className="sb__hint">
              One per line. This is the field that tells Google every profile is
              the same business. Include your Google Business Profile link.
            </span>
          </label>
        </fieldset>
      </div>

      <div className="sb__out">
        <div className="sb__outhead">
          <span className="u-mono">Your markup</span>
          <button type="button" className="sb__copy" onClick={copy}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <textarea className="sb__code" readOnly value={snippet} spellCheck={false} />

        {warnings.length > 0 && (
          <ul className="sb__warn">
            {warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        )}

        <div className="sb__next">
          <p className="sb__hint">
            Paste it inside the <code>&lt;head&gt;</code> of your home page —
            once, on one page only. Then check it with Google&rsquo;s{" "}
            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rich Results Test
            </a>
            . Everything here runs in your browser; nothing is uploaded.
          </p>
        </div>
      </div>
    </div>
  );
}
