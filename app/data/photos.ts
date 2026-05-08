export type Photo = {
  src: string;
  alt: string;
  caption: string;
  year: string;
  /** optional slug of the post this photo accompanies */
  postSlug?: string;
};

export const photos: Photo[] = [
  {
    src: "/photos/sih-1.jpeg",
    alt: "Smart India Hackathon 2022 winning cheque",
    caption: "Smart India Hackathon 2022 — Winners. ₹1,00,000 cheque. Team Dasthavej.",
    year: "2022",
    postSlug: "smart-india-hackathon-winners",
  },
  {
    src: "/photos/sih-2.jpeg",
    alt: "Smart India Hackathon 2022 — team on stage",
    caption: "On stage at SIH 2022 final.",
    year: "2022",
    postSlug: "smart-india-hackathon-winners",
  },
  // {
  //   src: "/photos/whitecarrot.jpeg",
  //   alt: "Whitecarrot.io team",
  //   caption: "Whitecarrot.io — three years, founding product engineer.",
  //   year: "2024",
  //   postSlug: "founding-product-engineer",
  // },
  {
    src: "/photos/graduation.jpeg",
    alt: "Graduation Day at RGUKT Basar",
    caption: "Graduation Day · B.Tech CS · RGUKT Basar.",
    year: "2024",
    postSlug: "graduation-day",
  },
  {
    src: "/photos/india-africa-hac-1.jpeg",
    alt: "UNESCO India-Africa Hackathon — venue",
    caption: "UNESCO India-Africa Hackathon · Gautam Buddha University.",
    year: "2022",
    postSlug: "uia-hackathon-finale",
  },
  {
    src: "/photos/india-africa-hac-2.jpeg",
    alt: "UNESCO India-Africa Hackathon — team",
    caption: "Team Maria Montessori Clan.",
    year: "2022",
    postSlug: "uia-hackathon-team",
  },
  {
    src: "/photos/india-africa-hac-3.jpeg",
    alt: "UNESCO India-Africa Hackathon — closing ceremony",
    caption: "Closing ceremony — Vice President of India.",
    year: "2022",
    postSlug: "uia-hackathon-finale",
  },
  {
    src: "/photos/edu-summit-1.jpeg",
    alt: "Edu Summit 2022",
    caption: "Edu Summit 2022 · find a weird like you and never let them go.",
    year: "2022",
    postSlug: "edu-summit-weird",
  },
  {
    src: "/photos/edu-summit-2.jpeg",
    alt: "Edu Summit 2022 — wide shot",
    caption: "Edu Summit 2022.",
    year: "2022",
    postSlug: "edu-summit-weird",
  },
  {
    src: "/photos/edu-summit-3.jpeg",
    alt: "Edu Summit 2022 — wide shot",
    caption: "Edu Summit 2022.",
    year: "2022",
    postSlug: "edu-summit-weird",
  },
  // {
  //   src: "/photos/travel.jpeg",
  //   alt: "Competitions across cities",
  //   caption: "Competitions across India — final year of B.Tech.",
  //   year: "2023",
  //   postSlug: "travel-personal-growth",
  // },
  // {
  //   src: "/photos/aman-gupta.png",
  //   alt: "Aman Gupta · boAt — Inspiring Triumphs cover",
  //   caption: "Inspiring Triumphs — Aman Gupta of boAt Lifestyle.",
  //   year: "2023",
  //   postSlug: "aman-gupta-boat",
  // },
  // {
  //   src: "/photos/sandeep-maheshwari.png",
  //   alt: "Sandeep Maheshwari — Inspiring Triumphs cover",
  //   caption: "Inspiring Triumphs — Sandeep Maheshwari.",
  //   year: "2023",
  //   postSlug: "sandeep-maheshwari",
  // },
  // {
  //   src: "/photos/jeeveshu.png",
  //   alt: "Jeeveshu Ahluwalia — Inspiring Triumphs cover",
  //   caption: "Inspiring Triumphs — Jeeveshu Ahluwalia.",
  //   year: "2023",
  //   postSlug: "jeeveshu-ahluwalia",
  // },
  // {
  //   src: "/photos/virali-modi.png",
  //   alt: "Virali Modi · #MyTrainToo — Inspiring Triumphs cover",
  //   caption: "Inspiring Triumphs — Virali Modi · #MyTrainToo.",
  //   year: "2023",
  //   postSlug: "virali-modi-mytraintoo",
  // },
  // {
  //   src: "/photos/jay-shetty.jpeg",
  //   alt: "Think Like A Monk — book cover",
  //   caption: "Think Like A Monk — Jay Shetty.",
  //   year: "2024",
  //   postSlug: "think-like-a-monk",
  // },
  // {
  //   src: "/photos/ikigai.png",
  //   alt: "Ikigai — book cover",
  //   caption: "Ikigai — let it come.",
  //   year: "2024",
  //   postSlug: "ikigai",
  // },
];

export const photoBySlug = new Map(
  photos
    .filter((p) => p.postSlug)
    .map((p) => [p.postSlug as string, p])
);
