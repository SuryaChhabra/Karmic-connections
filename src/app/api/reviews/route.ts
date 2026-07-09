import { NextResponse } from "next/server";

/**
 * Server-side Google reviews fetch. The API key stays on the server (never sent
 * to the browser). Set these env vars in Vercel to enable live reviews:
 *   GOOGLE_PLACES_API_KEY  — a Google Cloud key with "Places API (New)" enabled
 *   GOOGLE_PLACE_ID        — the Place ID for the Karmic Connections listing
 *
 * If the vars are absent, this returns { configured: false } and the UI falls
 * back to the built-in placeholder testimonials.
 */

export const revalidate = 86400; // cache for 24h so we don't hit the API on every visit

type GoogleReview = {
  authorAttribution?: { displayName?: string };
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
};

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!key || !placeId) {
    return NextResponse.json({ configured: false, reviews: [] });
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "reviews,rating,userRatingCount",
        },
        next: { revalidate },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ configured: true, reviews: [], error: true });
    }

    const data = await res.json();
    const reviews = (data.reviews as GoogleReview[] | undefined) ?? [];

    const clean = reviews
      .map((r) => ({
        quote: r.text?.text || r.originalText?.text || "",
        author: r.authorAttribution?.displayName || "A client",
        rating: r.rating ?? 5,
        when: r.relativePublishTimeDescription || "",
      }))
      .filter((r) => r.quote.trim().length > 0);

    return NextResponse.json({
      configured: true,
      rating: data.rating ?? null,
      total: data.userRatingCount ?? null,
      reviews: clean,
    });
  } catch {
    return NextResponse.json({ configured: true, reviews: [], error: true });
  }
}
