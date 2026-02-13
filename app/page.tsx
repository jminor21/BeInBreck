import Link from "next/link";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white">
      {children}
    </span>
  );
}

function SectionHeader({
  title,
  subtitle,
  actionLabel,
  actionHref,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-zinc-600">{subtitle}</p> : null}
      </div>
      {actionLabel && actionHref ? (
        <Link className="text-sm underline underline-offset-4" href={actionHref}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

function Card({
  title,
  subtitle,
  href,
  children,
  tone = "light",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  children?: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const inner = (
    <div
      className={cn(
        "rounded-2xl border p-5 transition-shadow hover:shadow-sm",
        tone === "dark" && "border-white/15 bg-white/5 text-white"
      )}
    >
      <p className={cn("font-medium", tone === "dark" && "text-white")}>{title}</p>
      {subtitle ? (
        <p className={cn("mt-1 text-sm", tone === "dark" ? "text-white/80" : "text-zinc-600")}>{subtitle}</p>
      ) : null}
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

// Temporary “content” until you hook up a CMS later
const featuredEvents = [
  {
    slug: "hardinsburg-farmers-market",
    title: "Hardinsburg Farmers Market",
    start: "2026-06-06T08:00:00-05:00",
    location: "Downtown Hardinsburg",
    category: "Family",
  },
  {
    slug: "rough-river-lake-cleanup-day",
    title: "Rough River Lake Cleanup Day",
    start: "2026-04-11T09:00:00-05:00",
    location: "Rough River Lake",
    category: "Outdoors",
  },
  {
    slug: "summer-youth-sports-registration",
    title: "Summer Youth Sports Registration",
    start: "2026-03-15T13:00:00-05:00",
    location: "Breck County Community Center",
    category: "Sports",
  },
];

const quickCategories = [
  { title: "Lake & Outdoors", desc: "Boating, fishing, trails, camping", href: "/things-to-do", emoji: "🌊" },
  { title: "Family Fun", desc: "Kid-friendly activities + weekends", href: "/things-to-do", emoji: "👨‍👩‍👧‍👦" },
  { title: "Food & Local Spots", desc: "Small-town favorites and bites", href: "/things-to-do", emoji: "🍔" },
  { title: "Festivals & Events", desc: "What’s happening this week", href: "/events", emoji: "📅" },
];

const featuredPlaces = [
  { name: "Rough River Lake", meta: "Falls of Rough", desc: "The centerpiece for lake days and summer weekends." },
  { name: "North Fork Campground", meta: "Rough River area", desc: "Shaded sites, laid-back camping, and easy lake access." },
  { name: "Downtown Hardinsburg", meta: "Hardinsburg", desc: "Local shops, food, and community events." },
  { name: "Scenic Drives", meta: "Countywide", desc: "Slow roads, pretty views, and photo stops." },
];

const highlights = [
  {
    title: "Visit",
    points: ["Plan a weekend itinerary", "Find campgrounds + trails", "Shareable event listings"],
    href: "/discover",
  },
  {
    title: "Live",
    points: ["Utilities & schools", "Healthcare & community", "Relocation resources"],
    href: "/live-here",
  },
  {
    title: "Grow",
    points: ["Local jobs", "Business resources", "Partnership opportunities"],
    href: "/do-business",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border bg-zinc-950 p-8 text-white md:p-12">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill>Visit</Pill>
                <Pill>Live</Pill>
                <Pill>Grow</Pill>
              </div>

              <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
                Be in Breck
              </h1>
              <p className="mt-4 max-w-2xl text-white/80">
                One hub for Breckinridge County — events, things to do, local jobs, and community updates.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-zinc-950" href="/events">
                  Browse Events
                </Link>
                <Link className="rounded-xl border border-white/20 px-5 py-3 text-sm hover:bg-white/10" href="/things-to-do">
                  Things To Do
                </Link>
                <Link className="rounded-xl border border-white/20 px-5 py-3 text-sm hover:bg-white/10" href="/do-business">
                  Do Business
                </Link>
              </div>

              <p className="mt-4 text-xs text-white/60">
                Tip: Share any page link on Facebook — it’ll look clean and clickable.
              </p>
            </div>

            <div className="grid w-full gap-3 lg:max-w-sm">
              <Card
                tone="dark"
                title="Submit an Event"
                subtitle="Have something coming up? Get it listed."
                href="/contact"
              >
                <p className="text-sm text-white/80">Email details and we’ll post it fast.</p>
              </Card>
              <Card
                tone="dark"
                title="Post a Job"
                subtitle="Local hiring? Add it to the board."
                href="/jobs"
              >
                <p className="text-sm text-white/80">Simple listing + application link.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CATEGORIES */}
      <section className="mt-12">
        <SectionHeader
          title="Start Here"
          subtitle="Quick picks for visitors, locals, and families."
        />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickCategories.map((c) => (
            <Card
              key={c.title}
              title={`${c.emoji}  ${c.title}`}
              subtitle={c.desc}
              href={c.href}
            />
          ))}
        </div>
      </section>

      {/* FEATURED EVENTS */}
      <section className="mt-12">
        <SectionHeader
          title="Featured Events"
          subtitle="What’s coming up around the county."
          actionLabel="View all events"
          actionHref="/events"
        />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {featuredEvents.map((e) => (
            <Card
              key={e.slug}
              title={e.title}
              subtitle={`${formatDateTime(e.start)} • ${e.location}`}
              href="/events"
            >
              <p className="text-xs text-zinc-500">{e.category}</p>
            </Card>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">Want your event featured?</p>
              <p className="mt-1 text-sm text-zinc-600">Send title, date/time, location, and a short description.</p>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white"
              href="mailto:events@beinbreck.com?subject=Event%20Submission%20-%20Be%20in%20Breck"
            >
              Submit via Email
            </a>
          </div>
        </div>
      </section>

      {/* PLACES */}
      <section className="mt-12">
        <SectionHeader
          title="Places to Explore"
          subtitle="Lake life, small-town stops, and local favorites."
          actionLabel="Browse things to do"
          actionHref="/things-to-do"
        />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {featuredPlaces.map((p) => (
            <div key={p.name} className="rounded-2xl border p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="mt-1 text-sm text-zinc-600">{p.meta}</p>
                </div>
                <span className="rounded-full border px-3 py-1 text-xs text-zinc-700">Featured</span>
              </div>
              <p className="mt-3 text-sm text-zinc-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VISIT / LIVE / GROW */}
      <section className="mt-12">
        <SectionHeader
          title="Visit • Live • Grow"
          subtitle="Everything you need in one place."
        />
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.title} className="rounded-2xl border p-6">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{h.title}</p>
                <Link className="text-sm underline underline-offset-4" href={h.href}>
                  Explore
                </Link>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600">
                {h.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span className="mt-0.5 text-zinc-400">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER / CTA */}
      <section className="mt-12">
        <div className="rounded-3xl border bg-zinc-50 p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">Get weekly highlights</h3>
              <p className="mt-2 max-w-xl text-sm text-zinc-600">
                Want a “what’s happening” email each week? (We can add a real signup form next.)
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="rounded-xl bg-zinc-900 px-5 py-3 text-sm text-white" href="/contact">
                Join the List
              </Link>
              <Link className="rounded-xl border px-5 py-3 text-sm hover:bg-white" href="/contact">
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>

      <p className="mt-10 text-center text-xs text-zinc-500">
        Built for Breckinridge County • Be in Breck
      </p>
    </div>
  );
}
