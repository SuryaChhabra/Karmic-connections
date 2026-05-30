/**
 * Central content for Karmic Connections.
 *
 * Sourced from karmicconnections.co.in. Some longer passages on the live site
 * are truncated behind "Show More"; where the full text wasn't available the
 * copy here is a faithful expansion — edit freely, everything reads from here.
 */

export const brand = {
  name: "Karmic Connections",
  subtitle: "Hypnotherapy & Past Life Regression",
  tagline: "Heal Yourself",
  // The gold K-and-path emblem. Lives at /public/logo.png.
  logoSrc: "/logo.png" as string,
  heroHeadline: "Heal Yourself.\nJourney Within.\nAwaken Your Soul.",
  heroSubtext:
    "We're here to help you. Discover the root of your fears, patterns, and pain through Hypnotherapy and Past Life Regression.",
};

export const nav = [
  { label: "The Breath", href: "#breath" },
  { label: "About", href: "#about" },
  { label: "Concepts", href: "#memories" },
  { label: "Voices", href: "#voices" },
  { label: "Questions", href: "#faq" },
  { label: "Contact", href: "#begin" },
];

export const about = {
  greeting: "Welcome to Karmic Connections",
  name: "Capt. Yogesh Chhabra",
  // Therapist headshot extracted from the source material. Set to "" to hide.
  photoSrc: "/therapist.png",
  intro:
    "Capt. Yogesh Chhabra holds a Master's Degree in Psychology. He is trained by Mrs. Rashhi Sharma at Soul Conscious Lab, Bengaluru, and by Dr. Brian Weiss at the Omega Institute, New York.",
  mission:
    "He is also a certified Hypnotherapist with the National Guild of Hypnotists, USA — guiding each soul gently toward healing and spiritual growth.",
  approach:
    "Healing happens when we reach the root, not just the symptom. In a safe and compassionate space, we work with the subconscious mind so the soul can release what it has long carried.",
  credentials: [
    "Master's Degree in Psychology",
    "Trained by Dr. Brian Weiss, Omega Institute, New York",
    "Trained by Mrs. Rashhi Sharma, Soul Conscious Lab, Bengaluru",
    "Certified Hypnotherapist — National Guild of Hypnotists, USA",
  ],
};

export type Concept = {
  title: string;
  blurb: string;
  glyph: string;
};

/** The three core teachings from the site, shown as floating "memories". */
export const concepts: Concept[] = [
  {
    title: "Journey of a Soul",
    blurb:
      "Each soul is a packet of energy, intrinsically part of God itself, embarking on its unique journey through many lifetimes. Through the cycle of life and death, it leaves and collects fragments of energy shaped by attachment, greed, lust, and anger.",
    glyph: "✦",
  },
  {
    title: "Karmic Connections",
    blurb:
      "The path of a soul, life after life, can be seen as one great loop. These loops intersect with those of other souls; as paths cross and souls share time, they earn karma through their mutual actions — binding them to return and make things whole.",
    glyph: "∞",
  },
  {
    title: "Regression through Hypnosis",
    blurb:
      "The subconscious holds every memory of a soul's previous lifetimes, yet rarely releases them. In past life regression, we gently work with the subconscious mind while the soul is guided by its soul guides to understand and heal.",
    glyph: "☾",
  },
];

export const plr = {
  title: "What happens in a session?",
  body: "Past Life Regression uses gentle hypnosis to access the subconscious — where the impressions of past lifetimes quietly shape this one. Held safely and guided throughout, you witness, understand, and release what no longer serves your soul's journey.",
  benefits: [
    "Understand the root of unexplained fears",
    "Make sense of recurring patterns and relationships",
    "Find peace with the past",
    "Reconnect with your soul's purpose",
    "Move toward deeper spiritual growth",
  ],
  process: [
    { step: "01", title: "Conversation", body: "We talk through your story, intentions, and any questions." },
    { step: "02", title: "Relaxation", body: "A gentle guided descent into a calm, focused state." },
    { step: "03", title: "Regression", body: "Guided by your soul guides, we follow the threads back to their source." },
    { step: "04", title: "Healing", body: "We witness, understand, and release what surfaces." },
    { step: "05", title: "Integration", body: "We ground the experience and make sense of it together." },
  ],
  duration: "Sessions are held with care, at a pace that feels right for you.",
};

export type Testimonial = { quote: string; author: string; place: string };

/** No testimonials were published on the source site yet — placeholders. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "I came carrying a fear I could never explain. I left understanding where it began — and finally free of it.",
    author: "A. S.",
    place: "Delhi",
  },
  {
    quote:
      "The session was calm and safe throughout. I felt guided, never controlled. It changed how I see my life.",
    author: "R. K.",
    place: "Mumbai",
  },
  {
    quote:
      "Understanding my karmic connections brought a peace to my relationships I didn't know was possible.",
    author: "M. T.",
    place: "Bengaluru",
  },
];

export const faqs = [
  {
    q: "Will I be controlled by the therapist?",
    a: "No. You remain fully aware and in control at all times. The therapist only guides you — you can speak, pause, or return whenever you wish.",
  },
  {
    q: "Is there a possibility of getting stuck in childhood or previous life memories?",
    a: "No. You are gently guided in and just as gently brought back. You cannot get 'stuck' — you return to full awareness at the end of every session.",
  },
  {
    q: "Is it an alternative to my medicines?",
    a: "No. This is a complementary therapy for emotional and spiritual healing. Please continue any medical treatment and consult your doctor.",
  },
  {
    q: "Do I need to be from a particular religion or follow a faith to take the therapy?",
    a: "Not at all. The therapy is open to everyone, regardless of religion or belief. An open mind is all that's needed.",
  },
  {
    q: "Can I book a session just to visit my previous lifetimes out of curiosity?",
    a: "The work is most meaningful when approached with sincerity and intention for healing, though curiosity is a welcome beginning.",
  },
];

export const newsletter = {
  heading: "Newsletter",
  body: "Sign up for spiritual writeups exploring hypnotherapy, past life regression, and the many aspects of spiritual growth.",
};

export const contact = {
  heading: "Write to Us Now",
  subheading: "We're here to help you begin.",
  email: "karmicconnections7@gmail.com",
  phone: "+91 98711 23413",
  phoneRaw: "919871123413",
  whatsapp: "https://wa.me/919871123413",
  location: "India",
};

export const disclaimer =
  "The ideas presented on this website are expressed by the Therapist based on his research and training in hypnotherapy and past life regression, with the intention of helping individuals achieve greater peace and spiritual growth. We are not responsible for the results of any actions taken based on this information, and expressly disclaim all liability for any claims, losses, or damages, whether direct or consequential, arising from reliance on any information contained here.";

export const socials = [
  { label: "WhatsApp", href: "https://wa.me/919871123413" },
  { label: "Email", href: "mailto:karmicconnections7@gmail.com" },
];
