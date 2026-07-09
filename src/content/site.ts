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
  more?: string; // optional extra text revealed by a "Show more" toggle
  glyph: string;
};

/** The three core teachings from the site, shown as floating "memories". */
export const concepts: Concept[] = [
  {
    title: "Journey of a Soul",
    blurb:
      "Each soul is a packet of energy, intrinsically part of God itself. This soul embarks on its unique journey through various lifetimes. During the cycle of Life and Death in these physical realms, it continuously leaves and collects fragments of energy influenced by vices such as attachment, greed, lust, and anger.",
    more:
      "These experiences leave a mark on the soul, altering its tendencies for future journeys. The soul reincarnates based on its foundational tendencies, and the journey in each life is guided by soul guides, facilitating spiritual growth and learning lessons through diverse situations. If a soul struggles to pass these tests, it faces increasingly challenging circumstances until it achieves the realization of specific lessons and releases itself from particular tendencies, ultimately moving towards a purified state. As the soul charts its own path, it also determines the kind of parents it is born to, ensuring maximum alignment with the situations it seeks to explore. Techniques such as hypnotherapy and past life regression can aid in uncovering these past experiences, promoting deeper understanding and growth.",
    glyph: "✦",
  },
  {
    title: "Karmic Connections",
    blurb:
      "The path of a soul through life after life can be visualized as one big loop. Each soul moves along its unique journey, and these loops intersect with those of other souls. As these paths cross and the souls spend time together, they earn karma through their mutual actions in various situations.",
    more:
      "This karma binds them to repay any wrongs or goods done to others, leading to the formation of Karmic connections. Similar to chemical bonds, these connections can be strong or weak, depending on the mutual karma shared by the souls. Engaging in practices like hypnotherapy or past life regression can aid in understanding these connections. We can also achieve spiritual growth by forgiving and forgetting the actions of others, which helps us relieve ourselves of these karmic bonds.",
    glyph: "∞",
  },
  {
    title: "Regression through Hypnosis",
    blurb:
      "The subconscious mind holds all the memories of a soul's previous lifetimes, but it does not release those memories as such. These past life impressions continue to guide a soul's journey. In hypnotherapy, particularly during past life regression sessions, we work upon the subconscious mind while the soul is guided by its soul guides to uncover significant events and impressions.",
    more:
      "To achieve this, we take the individual into a state of mind known as the 'Alpha state' and then into the 'Theta state.' In these states, a person is neither completely asleep nor fully awake, and it is scientifically proven that one can easily reach and remain in these states through a simple relaxation process. Subsequently, using various techniques, the individual is guided through a process in which the subconscious mind opens up, helping the person according to her intention. The intention of the individual undergoing therapy is crucial, as it directly influences the desired results. This can be seen as the soul realizing its faults and seeking to release certain karmas through forgetfulness, forgiveness, and remorse, ultimately fostering spiritual growth.",
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

export type Testimonial = {
  quote: string;
  author: string;
  place?: string;
  rating?: number;
};

/** Real reviews (from Google). */
export const testimonials: Testimonial[] = [
  {
    quote:
      "I met Captain Yogesh at the Omega Institute where we both trained with Dr. Brian Weiss, and I am so deeply grateful that I did. He is a beautiful soul and a bright light in this world. He is kind, caring & compassionate, professional, respectful and courteous throughout the entire process. He was extremely attentive and listened deeply throughout the entire session. I received deep healing from my session with him and I would highly recommend him for inner child healing or any other healing you need. 🙏",
    author: "Jennifer Baloga",
    rating: 5,
  },
  {
    quote:
      "There are a few questions that are unanswered in life, which quiz you. During my PLRT session with Capt. Yogesh, I got the answers to my repetitive concern on the subject and was able to understand my behavior and from where it's stemming. The long, comfortable, excellent, and revealing session helped me in removing those concerns forever which ultimately led to a better personal and professional life. I highly recommend the sessions to everyone who has those unanswered questions.",
    author: "Dr. Rahul Sharma",
    place: "Ahmedabad",
    rating: 5,
  },
  {
    quote:
      "I had a session with Capt Yogesh a few months back. Objective of the session was to find reason of an ailment in childhood. I experienced three past lives. Captured some moments of different stages of the past lives. This experience gave me insight into my spiritual journey. I thank Capt Yogesh for the educative session.",
    author: "Aman Seth",
    rating: 5,
  },
  {
    quote:
      "I got a very new perspective about the challenge I was going through. Thanks to Yogi ji for that. His PLR session was very useful for me. It helped me clear unwanted energies from my system and it taught me to let go. His approach, his guidance and suggestions were of great help. Thank u 👍",
    author: "Rashmi G.S.",
    rating: 5,
  },
  {
    quote:
      "Yogeshji is very professional and thorough in his work. He is polite, courteous and a good listener. Recently had an excellent session with Yogeshji. I feel blessed to have met such a soul. I highly appreciate his work and ethics with which he connects to people.",
    author: "Varsha Patel",
    rating: 5,
  },
  {
    quote:
      "Dear Yogesh ji, being a past life regression therapist, you are a true professional. You have really helped me in resolving unsolved problems of my life. Many sessions you took progressively, I got all my answers. Thank you so much for really helping me.",
    author: "Abhielasha Singh",
    rating: 5,
  },
  {
    quote:
      "I was very impressed by Capt. Yogesh's professionalism. He was very kind and caring. He actually changed my life for good. I recommend him 100%.",
    author: "Laura Shehan",
    rating: 5,
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
