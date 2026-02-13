"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { MapPlace } from "../components/PlacesMap";

const PlacesMap = dynamic(() => import("../components/PlacesMap"), { ssr: false });


type PlaceCategory =
  | "Lake"
  | "Campground"
  | "Parks & Trails"
  | "Family"
  | "Food"
  | "Shopping"
  | "History"
  | "Nearby";

type Place = {
  name: string;
  category: PlaceCategory;
  town: string;
  short: string;
  tags: string[];
  mapsQuery?: string;
  website?: string;
  featured?: boolean;
};

const places: Place[] = [
  {
    name: "Rough River Lake",
    category: "Lake",
    town: "Falls of Rough",
    short: "Boating, fishing, swimming, and the kind of lake days you remember forever.",
    tags: ["boating", "fishing", "swimming", "picnic"],
    mapsQuery: "Rough River Lake Kentucky",
    website: "https://parks.ky.gov/",
    featured: true,
  },
  {
    name: "North Fork Campground",
    category: "Campground",
    town: "Falls of Rough",
    short: "Shaded campsites and easy access to the lake—simple, classic camping.",
    tags: ["camping", "family", "lake access"],
    mapsQuery: "North Fork Campground Rough River",
    featured: true,
  },
  {
    name: "Axtel Campground",
    category: "Campground",
    town: "Falls of Rough",
    short: "Campground vibes with nearby water and plenty of room to unwind.",
    tags: ["camping", "relaxing"],
    mapsQuery: "Axtel Campground Rough River Lake",
  },
  {
    name: "Downtown Hardinsburg",
    category: "Shopping",
    town: "Hardinsburg",
    short: "Local shops, small-town charm, and quick bites—great for an afternoon stroll.",
    tags: ["shops", "food", "walkable"],
    mapsQuery: "Downtown Hardinsburg KY",
    featured: true,
  },
  {
    name: "Local Parks & Trails",
    category: "Parks & Trails",
    town: "Countywide",
    short: "Easy trails, picnic spots, and nature time without the big drive.",
    tags: ["trails", "hiking", "picnic"],
    mapsQuery: "parks near Hardinsburg KY",
  },
  {
    name: "Family Playground Stops",
    category: "Family",
    town: "Countywide",
    short: "Quick kid-friendly stops for burning energy and making memories.",
    tags: ["kids", "playground", "family"],
    mapsQuery: "playgrounds near Hardinsburg KY",
  },
  {
    name: "Local Eats",
    category: "Food",
    town: "Breckinridge County",
    short: "From quick bites to sit-down favorites—support local and eat well.",
    tags: ["restaurants", "local", "comfort food"],
    mapsQuery: "restaurants in Breckinridge County KY",
  },
  {
    name: "Historic Sites & Stories",
    category: "History",
    town: "Countywide",
    short: "Kentucky history with small-town character and local pride.",
    tags: ["history", "heritage"],
    mapsQuery: "historic sites Breckinridge County KY",
  },

  // Nearby
  {
    name: "Mammoth Cave National Park",
    category: "Nearby",
    town: "Edmonson County",
    short: "Explore the world’s longest known cave system—guided tours, hiking, and river views.",
    tags: ["caves", "hiking", "national park"],
    mapsQuery: "Mammoth Cave National Park",
    featured: true,
  },
  {
    name: "Elizabethtown Shopping & Dining",
    category: "Nearby",
    town: "Elizabethtown",
    short: "More restaurants, shopping, and entertainment about 45 minutes away.",
    tags: ["shopping", "restaurants"],
    mapsQuery: "Elizabethtown KY downtown",
  },
  {
    name: "Owensboro Riverfront",
    category: "Nearby",
    town: "Owensboro",
    short: "River views, live music events, and waterfront dining along the Ohio River.",
    tags: ["riverfront", "music", "events"],
    mapsQuery: "Owensboro Riverfront",
  },
];

const categories: PlaceCategory[] = [
  "Lake",
  "Campground",
  "Parks & Trails",
  "Family",
  "Food",
  "Shopping",
  "History",
  "Nearby",
];

function mapsLink(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-zinc-700">
      {children}
    </span>
  );
}

function PlaceCard({ place }: { place: Place }) {
  return (
    <div className="rounded-2xl border p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-zinc-500">
            {place.category} • {place.town}
          </p>
          <p className="mt-2 font-medium">{place.name}</p>
        </div>
        {place.featured ? (
          <span className="rounded-full border px-3 py-1 text-xs text-zinc-700">Featured</span>
        ) : null}
      </div>

      <p className="mt-3 text-sm text-zinc-600">{place.short}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {place.tags.slice(0, 4).map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {place.mapsQuery ? (
          <a
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white"
            href={mapsLink(place.mapsQuery)}
            target="_blank"
            rel="noreferrer"
          >
            Directions
          </a>
        ) : null}

        {place.website ? (
          <a
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm hover:bg-zinc-50"
            href={place.website}
            target="_blank"
            rel="noreferrer"
          >
            Website
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default function ThingsToDoPage() {
  const [view, setView] = React.useState<"list" | "map">("list");

  // Starter map pins (we can add more later)
  const mapPlaces: MapPlace[] = [
    {
      name: "Rough River Lake",
      category: "Lake",
      town: "Falls of Rough",
      short: "Boating, fishing, swimming, and classic lake weekends.",
      lat: 37.6169,
      lng: -86.504,
      website: "https://parks.ky.gov/",
      directionsUrl: mapsLink("Rough River Lake Kentucky"),
    },
    {
      name: "Downtown Hardinsburg",
      category: "Shopping",
      town: "Hardinsburg",
      short: "Local shops, food, and small-town charm.",
      lat: 37.7803,
      lng: -86.4608,
      directionsUrl: mapsLink("Downtown Hardinsburg KY"),
    },
    {
      name: "Mammoth Cave National Park",
      category: "Nearby",
      town: "Edmonson County",
      short: "Guided cave tours, hikes, and iconic Kentucky scenery.",
      lat: 37.186,
      lng: -86.1005,
      directionsUrl: mapsLink("Mammoth Cave National Park"),
    },
  ];

  const featured = places.filter((p) => p.featured);
  const rest = places.filter((p) => !p.featured);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs text-zinc-500">Be in Breck</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Things To Do</h1>
          <p className="mt-2 max-w-2xl text-zinc-600">
            Lake days, campgrounds, family fun, local food, and small-town stops—start here.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setView("list")}
            className={`rounded-xl border px-4 py-2 text-sm ${
              view === "list"
                ? "bg-zinc-900 text-white border-zinc-900"
                : "hover:bg-zinc-50"
            }`}
            type="button"
          >
            List View
          </button>

          <button
            onClick={() => setView("map")}
            className={`rounded-xl border px-4 py-2 text-sm ${
              view === "map"
                ? "bg-zinc-900 text-white border-zinc-900"
                : "hover:bg-zinc-50"
            }`}
            type="button"
          >
            Map View
          </button>

          <Link className="rounded-xl border px-4 py-2 text-sm hover:bg-zinc-50" href="/events">
            Browse Events
          </Link>

          <a
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white"
            href="mailto:hello@beinbreck.com?subject=Add%20a%20Thing%20To%20Do%20-%20Be%20in%20Breck"
          >
            Suggest a Place
          </a>
        </div>
      </div>

      {/* Map */}
      {view === "map" ? (
        <div className="mt-8">
          <PlacesMap places={mapPlaces} center={{ lat: 37.7, lng: -86.46 }} zoom={10} />
          <p className="mt-2 text-xs text-zinc-500">
            Tip: Click markers to see details and get directions.
          </p>
        </div>
      ) : null}

      {/* Category chips */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <span key={c} className="rounded-full border px-3 py-1 text-xs text-zinc-700">
            {c}
          </span>
        ))}
      </div>

      {/* Featured */}
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Featured</h2>
          <p className="text-sm text-zinc-600">Top picks to start with.</p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <PlaceCard key={p.name} place={p} />
          ))}
        </div>
      </section>

      {/* Directory */}
      <section className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Directory</h2>
          <p className="text-sm text-zinc-600">Browse ideas across the county.</p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {rest.map((p) => (
            <PlaceCard key={p.name} place={p} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12">
        <div className="rounded-3xl border bg-zinc-50 p-8 md:p-10">
          <h3 className="text-xl font-semibold tracking-tight">Want to be listed?</h3>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            Email the name, town, category, a 1–2 sentence description, and a website link (if you have one).
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              className="rounded-xl bg-zinc-900 px-5 py-3 text-sm text-white"
              href="mailto:hello@beinbreck.com?subject=Add%20Listing%20-%20Be%20in%20Breck"
            >
              Email a Listing
            </a>
            <Link className="rounded-xl border px-5 py-3 text-sm hover:bg-white" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
