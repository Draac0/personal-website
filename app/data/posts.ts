export type PostCategory =
  | "engineering"
  | "build"
  | "career"
  | "hackathon"
  | "books"
  | "personal";

export type Post = {
  slug: string;
  title: string;
  date: string;
  year: string;
  category: PostCategory;
  summary: string;
  body: string;
  linkedin: string;
  likes: number;
  hashtags: string[];
  featured?: boolean;
};

const lk = (id: string, isUgc = false) =>
  `https://www.linkedin.com/feed/update/urn:li:${isUgc ? "ugcPost" : "share"}:${id}/`;

export const posts: Post[] = [
  {
    slug: "ms365-outlook-teams-api-bug",
    title: "When Microsoft 365 told me to call the same API twice",
    date: "2024-09",
    year: "2024",
    category: "engineering",
    featured: true,
    summary:
      "A debugging story: an Outlook calendar event update wouldn't add a Teams meeting link until the same API call was made multiple times.",
    body: `While fixing a Teams meeting feature on the Microsoft 365 Outlook calendar API, I ran into a problem where event updates weren't adding Teams meeting links — even though creates worked fine.

After a lot of poking around: "Sometimes you need to call the same api call multiple times."

The first attempt via Postman would return the expected Teams link. Subsequent attempts from code would mysteriously fail. A senior colleague helped investigate, and we found that consecutive API calls would toggle the behavior — sometimes returning the link, sometimes not.

We concluded this was a bug in Microsoft 365.

Lesson: when something is not making sense, do what you think is obvious. Then do it again.`,
    linkedin: lk("7215765116187762688"),
    likes: 65,
    hashtags: ["microsoft", "microsoft365", "bugs"],
  },
  {
    slug: "zoom-recurring-meeting-mystery",
    title: "How my one-time Zoom turned into a recurring party",
    date: "2025-09",
    year: "2025",
    category: "engineering",
    featured: true,
    summary:
      "Reusing the same Zoom meeting link across multiple Google Calendar events flips it to recurring. Tech integrations are tricky.",
    body: `Ever had that moment when you create a one-time Zoom meeting and then it mysteriously turns into a recurring one?

After some digging, I found out the culprit: adding the same Zoom meeting link to multiple Google Calendar events. Apparently, Zoom thinks, "Oh, looks like a recurring event!" and flips the switch on the meeting type — making it recurring with multiple occurrences.

So if you're wondering why your Zoom meeting turned into a party that keeps repeating itself… now you know! The fix? Don't reuse your Zoom meeting link across many calendar invites.

Tech integrations can be tricky, but that's what makes them interesting, right?`,
    linkedin: lk("7369651214956830722"),
    likes: 23,
    hashtags: ["Zoom", "GoogleCalendar", "DeveloperLife", "APIAdventures"],
  },
  {
    slug: "azure-ad-oauth-account-takeover",
    title: "Microsoft Azure AD OAuth Account Takeover",
    date: "2025-02",
    year: "2025",
    category: "engineering",
    summary:
      "Don't let attackers take over your users' accounts when using Microsoft Azure AD Single Sign-On.",
    body: `Don't let attackers take over your users' accounts when using Microsoft Azure AD Single Sign-On.

→ Full write-up on Medium.`,
    linkedin: lk("7292056450003021826"),
    likes: 19,
    hashtags: ["microsoft", "sso", "vulnerability", "azure", "authentication"],
  },
  {
    slug: "bypass-one-time-feature-restrictions",
    title: "How to bypass one-time feature restrictions on websites",
    date: "2025-02",
    year: "2025",
    category: "engineering",
    summary:
      "Sometimes you can't use a website feature more than once. Or can you?",
    body: `Sometimes, you can't use a website feature more than once. Or can you? Can it be broken?

→ Full write-up on Medium.`,
    linkedin: lk("7289201771665666049"),
    likes: 10,
    hashtags: ["security", "web"],
  },
  {
    slug: "deepseek-ollama-local",
    title: "Run Deepseek 1.5B locally with Ollama",
    date: "2025-02",
    year: "2025",
    category: "build",
    featured: true,
    summary:
      "A beginner's guide to running the distilled Deepseek model on your own machine.",
    body: `Run the distilled model of Deepseek (1.5B) LLM on your local machine in just a few steps.

→ Full guide on Medium: "How to Install and Use Ollama on Mac, Windows, and Linux."`,
    linkedin: lk("7291760664774131712"),
    likes: 23,
    hashtags: ["deepseek", "openai", "llm", "gpt"],
  },
  {
    slug: "vscode-llm-chat-extension",
    title: "Build your own LLM chat extension in VS Code",
    date: "2025-02",
    year: "2025",
    category: "build",
    summary:
      "A starter template for a VS Code extension that talks to a local LLM via Ollama and Deepseek.",
    body: `Build Your Own Custom LLM Chat Extension in VS Code with Ollama and Deepseek!

There are still a lot of potential improvements. Consider it as a starter template.

→ Full guide on Medium.`,
    linkedin: lk("7291530173751996417"),
    likes: 26,
    hashtags: ["llm", "deepseek", "vscode", "extensions", "ollama"],
  },
  {
    slug: "graduation-day",
    title: "Graduation Day",
    date: "2024-05",
    year: "2024",
    category: "career",
    featured: true,
    summary: "🎓",
    body: `Graduation Day. 🎓`,
    linkedin: lk("7172203008137658369", true),
    likes: 420,
    hashtags: ["graduation", "btech"],
  },
  {
    slug: "founding-product-engineer",
    title: "Founding Product Engineer at Whitecarrot.io",
    date: "2024-01",
    year: "2024",
    category: "career",
    featured: true,
    summary:
      "An exceptional year working alongside a phenomenal team — and a new role.",
    body: `Working in a startup, challenging but oh-so-rewarding!

Ecstatic to share that I've achieved the role of Founding Product Engineer at whitecarrot.io! It's been an exceptional year working alongside a phenomenal team, witnessing exemplary skills in action. Some have moved on, others continue the journey with us, each leaving an indelible mark on this incredible adventure.

Cheers to the incredible individuals I've had the privilege to collaborate with — your passion and dedication have been the driving force behind our success! Here's to the memories we've created and the milestones we've achieved together.

As we step into a new year, I'm brimming with excitement for the growth that awaits whitecarrot.io and our remarkable team. Let's make 2024 the year we soar to new heights, achieving success beyond our wildest dreams.`,
    linkedin: lk("7148701858507743232"),
    likes: 201,
    hashtags: ["engineeringjobs", "founding"],
  },
  {
    slug: "ieee-pos-paper",
    title: "From reading IEEE papers to getting published in IEEE",
    date: "2023-10",
    year: "2023",
    category: "career",
    summary:
      "Our paper on enhancing Proof-of-Stake consensus was published at SoftCOM 2023.",
    body: `"From reading IEEE papers to getting published in IEEE."

Our research paper on enhancing the consensus algorithm for Proof of Stake in blockchain technology has been published in the 2023 International Conference on Software, Telecommunications, and Computer Networks (SoftCOM).

It was a pleasure to collaborate with my friends on this project. I would like to express my gratitude to Gurram Harshavardhan Netha, Hafeez Mohamad, and our Assistant Professor Mr. Anjaneyulu for their invaluable contributions.

Now, it's time to delve into the paper and explore its contents.

Paper: A Strategy to Improvise Coin-age Selection in the Proof of Stake Consensus Algorithm.`,
    linkedin: lk("7119370716042457088"),
    likes: 113,
    hashtags: ["blockchain", "ieee", "conference", "research", "paper"],
  },
  {
    slug: "whitecarrot-intern-month-1",
    title: "First month at Whitecarrot.io as an intern",
    date: "2023-02",
    year: "2023",
    category: "career",
    summary:
      "An early note on joining a dynamic team and what the first month felt like.",
    body: `Excited to share my experience of the past month at whitecarrot.io as an intern!

Joining this dynamic team has been a great opportunity for growth and learning. Every day is filled with new challenges and I am grateful for the supportive and friendly work environment. The people here are amazing and I am soaking up knowledge from the best in the industry.

So far, it has been an incredible journey and I am looking forward to what the future holds.`,
    linkedin: lk("7028381567030882304"),
    likes: 57,
    hashtags: ["InternshipExperience", "LearningEveryday", "GrowthMindset"],
  },
  {
    slug: "smart-india-hackathon-winners",
    title: "Winning Grand Finale — Smart India Hackathon 2022",
    date: "2022-08",
    year: "2022",
    category: "hackathon",
    featured: true,
    summary:
      "From a 2 AM problem-statement search to standing on stage with the cheque. The full SIH 2022 story.",
    body: `"ALL JOURNEYS HAVE SECRET DESTINATIONS OF WHICH THE TRAVELLER IS UNAWARE."

Winning Grand Finale is the secret destination we unlocked in the Journey of SIH-2022!

It was the end of March at 2 AM in R&D, scratching our heads to fix up a problem statement for our credit course SE&WT (Software Engineering and Web Technologies). Googling is the only solution we found. It popped up with multiple sites where SIH seems pretty interesting. We skimmed through around 20 problem statements and found one, later we called "Dasthavej".

Procrastination, we had the same. Stayed up for 2 days and developed all the REST APIs which are required for the project and later we left it completely as we have so much time to submit. Deadline is the most terrifying word, July 2nd. Stayed up till 4 AM to complete the project which is not that great anyway.

A notification came in our university hub saying an internal hackathon is going to be conducted with a team of 6 required. The thought of Destiny. Participation in that is another great step we made. Choosy enough. A month passed by, and an email popup made us pop, selected for the grand finale.

We boarded the train on the 23rd of August, at 6 AM from Hyderabad to Coimbatore. Thanks to Dr. Kalaiarasi Arumugam mam (SPOC) who took special care to receive us as we landed on the 24th at midnight.

Visiting Adiyogi temple is another moment of happiness where we got a chance to see Sadhguru JV. It is one of the golden moments I had in my lifetime.

The final hackathon started on the 25th of August. Its 36 hours continue coding challenge where mentors and evaluators come to visit the team to understand the project clearly.

Around 8 o'clock, the valedictory started. There is a tense in the air. Everyone's fingers crossed. We are waiting for the results. It's time they said and mentioned "Team Dasthavej". We are of no words and jumped from our seats. It's a moment of joy and pride. Unforgettable moment.

All this can't happen without the support of many people. I'd like to thank them from the bottom of my heart. Especially Narender Maddela sir (SPOC), and Rakeshreddy sir (Coordinator IIED). Thanks to Srujana mam (Associate Dean of Engineering) for being a mentor and support throughout the journey. Thanks to Shastri sir (Former HoD of MME) for every brainstorming session that happened. Finally thanks to my university RGUKT Basar for the opportunity.

Smart India Hackathon · Persistent Systems · Shell.`,
    linkedin: lk("7040724055993311232"),
    likes: 197,
    hashtags: ["sih2022", "smartindiahackathon", "hackathon"],
  },
  {
    slug: "tie-summit-day-1-2",
    title: "TiE Global Summit 2022 — Days 1 & 2",
    date: "2022-12",
    year: "2022",
    category: "hackathon",
    summary:
      `"Network is more important than Networth." A 3-day journey at the TiE Global Summit covering pitches, T-Hub, T-Works, and ISB.`,
    body: `"Network is more important than Networth" — words from Sri Charan Lakkaraju.

Day 1
Startups pitched their decks for investment on day 1 of the TiE summit. Investors and mentors evaluated the startups and scored them for the grand finale. Pitching for the first time in front of dignitaries who had well-established businesses was a learning.

TiE took us to T-Hub and T-Works to find out the culture, opportunities, and collaboration to design, develop, prototype, invest, and turn ideas into startups. Out-of-the-box innovations from rural areas and companies developing high-tech projects — one place, everything.

We had an interaction session with T-Hub CEO Srinivas Rao Mahankali (MSR), CDO Wg Cdr Anthony Anish (Retd), Osmania Vice Chancellor Prof. Ravinder Yadav, SubbaRaju Pericherla, and Bhanu Varela on the startup ecosystem and how the Government of Telangana is building the largest global ecosystem to nurture young minds.

Day 2
Talks from industrialists, VCs, CEOs, CTOs, and entrepreneurs gave insights into a wide range of sectors.

Visiting the Indian School of Business for learning about work culture and business education was a wonderful experience — ISB is ranked #1 in India for business education.

Overall, a great experience to meet and network with people. Don't hesitate to talk about your ideas. Being open, kind, and treating age as just a number — that's the walking reality at the TiE Global Summit.`,
    linkedin: lk("7010966341868285952"),
    likes: 149,
    hashtags: ["startups", "entrepreneurship", "business"],
  },
  {
    slug: "tie-summit-day-0",
    title: "TiE Global Summit 2022 — Day 0",
    date: "2022-12",
    year: "2022",
    category: "hackathon",
    summary:
      "Reached Novotel & HICC at 7pm — brighter than a day. Met founders building real things.",
    body: `A 3-day entrepreneurial journey at TiE Global Summit 2022.

Day-0
It can't be more perfect. Reached the venue (Novotel & HICC) around 7 pm. It's brighter than a day. Officials, entrepreneurs, and investors around the world are wandering, chatting, and networking.

Met people doing something to make this world a better place.
- Sri Charan Lakkaraju, founder of Student Tribe — connects colleges and students for learning and collaboration.
- Laxmi Pandrala and Amol BK are transforming the fitness and lifestyle industry with Lami Health. Indian cricketers, film stars, and politicians are using their services.
- Vinod Chacko — business development director at Vultr.
- Srinivas Yadavalli — Oracle EBS, Cloud, and Fusion application services.

The day ended with perfect live music and a delightful dinner.
Day-1 is more exciting.`,
    linkedin: lk("7045624711539544064", true),
    likes: 165,
    hashtags: ["tgs2022", "entrepreneurship", "startups"],
  },
  {
    slug: "uia-hackathon-finale",
    title: "UNESCO India-Africa Hackathon — the awestruck moment",
    date: "2022-11",
    year: "2022",
    category: "hackathon",
    summary:
      "A 36-hour hackathon at Gautam Buddha University, inaugurated by the CM of Uttar Pradesh and closed by the VP of India.",
    body: `I was awestruck when I see the popularity of Dr. Abhay Jere (Chief Innovation Officer, Ministry of Education) in the auditorium.

#UIA is an international-level hackathon — combined participation of Indian and African students held at Gautam Buddha University, Greater Noida.

On the 22nd of November, the inauguration ceremony of the UNESCO INDIA AFRICA HACKATHON was launched by Shri Yogi Adityanath Ji (Chief Minister of Uttar Pradesh).

A 36-hour nonstop hackathon started on the 23rd with more than 100 teams participating to solve the problem statements.

Top evaluators from different organizations evaluated each team with 3 rounds of validation checks on each solution.

The Vice President of India (Jagdeep Dhankhar) gave the valedictory on the 25th of November and distributed prizes to winning teams along with the Governor of Uttar Pradesh (Anandiben Patel Ji).

Unfortunately, our team was not on the winning list — but the moments we had will be cherished forever.

Thanks to mentor Vishal Mago sir for continuous support, Gautam Buddha University for hosting such a grand event, and Dr. Abhay Jere for making this event a grand success.

Finally, my team. It's great to work with great minds. You are an awesome team to work with: Supritha Rao Mamindlapelly, Folly Habib Jean-Martin MESSAN, Peter Isulu, Junaïd Bin Asad Edoo, Asséetou DIARRA, Abhinav Sriram.`,
    linkedin: lk("7048184592062681088", true),
    likes: 133,
    hashtags: ["uiah", "unescoindiaafricahackathon", "hackathon"],
  },
  {
    slug: "uia-hackathon-team",
    title: "UNESCO India-Africa Hackathon — Bonjour gars",
    date: "2022-11",
    year: "2022",
    category: "hackathon",
    summary:
      "Selected for UIA'22 at Gautam Buddha University. Teams finalized, problem statements given, brainstorming begins.",
    body: `Bonjour gars 😁
No, I'm not talking about French.

We are selected to participate in the UNESCO INDIA AFRICA Hackathon'22 hosted at Gowtham Buddha University, Noida on the 22–25 of November. The teams are finalized and problem statements are given.

Then what? Discussions! Yup, they started. Brainstorming sessions on PS.

Team Maria Montessori Clan: Supritha Rao Mamindlapelly, Junaïd Bin Asad Edoo, Folly Habib Jean-Martin MESSAN, Isulu, Asséetou Diarra, Abhinav Sriram.`,
    linkedin: lk("7042915506550407168", true),
    likes: 82,
    hashtags: ["UIA", "UIA2022", "innovation", "teamwork", "hackathon2022", "india", "africa"],
  },
  {
    slug: "pli-blockathon",
    title: "PLI Blockathon — XDC at midnight",
    date: "2022-11",
    year: "2022",
    category: "hackathon",
    summary:
      "India's largest blockchain hackathon — 36 hours, ambiguous errors, and a lot of midnight code.",
    body: `The hackathon line. A new one pushes after each pop. It was a fantastic experience with a talented team: Harshavardhan Gurram, Abdul Rahman Mohammad, Hafeez Mohamad, Ganesh Thoutam.`,
    linkedin: lk("7050059846804508672", true),
    likes: 22,
    hashtags: ["team", "experience", "hackathon2022", "blockchain"],
  },
  {
    slug: "leetcode-31-day-streak",
    title: "31 days of LeetCode — small habits, big results",
    date: "2022-12",
    year: "2022",
    category: "personal",
    featured: true,
    summary:
      `"I accumulated small but consistent habits that ultimately led to results that are unimaginable when I started." — James Clear. 31 days, one problem a day.`,
    body: `"I accumulated small but consistent habits that ultimately led to results that are unimaginable when I started." — James Clear

31 consistent days of solving at least one problem a day. More days to go.

Total active days: 75
Max streak: 31`,
    linkedin: lk("7028378176800129025"),
    likes: 71,
    hashtags: ["leetcode", "dsa", "consistency"],
  },
  {
    slug: "itr-2-tax-filing",
    title: "Filing my own ITR 2 with AI tools and YouTube tutorials",
    date: "2025-09",
    year: "2025",
    category: "personal",
    summary:
      "Filed my taxes for AY 2025-26 without a finance background. Five things I learned.",
    body: `Filed my ITR 2 tax return for AY 2025-26 using AI tools and YouTube tutorials — despite having no finance background. Five things I learned:

1. ITR 2 filing is manageable for those with salary income, capital gains, or multiple properties.
2. Understanding new vs. old tax regimes lets you make informed decisions.
3. Form 26AS and AIS help verify tax credits and income sources.
4. Capital gains reporting and loss carryforward are simpler when broken down systematically.
5. Self-assessment and advance tax details require accurate reporting.

Technology and clear tutorials make tax filing manageable. Don't outsource everything — try filing once. You save costs and gain financial control.`,
    linkedin: lk("7369976287437844480"),
    likes: 34,
    hashtags: ["IncomeTax", "ITR2", "TaxFiling", "PersonalFinance", "FinancialLiteracy"],
  },
  {
    slug: "netflix-billing-rant",
    title: "Netflix lets you upgrade mid-cycle, but not downgrade",
    date: "2024-06",
    year: "2024",
    category: "personal",
    summary:
      "A family member accidentally upgraded the plan. The billing date jumped forward. Downgrades aren't allowed mid-cycle. That's not fair.",
    body: `I recently encountered an issue with Netflix that I believe deserves attention.

A family member accidentally upgraded our subscription from the Basic to the Standard plan. While I appreciate Netflix's flexibility in allowing mid-cycle upgrades, the new billing date has been pushed up to June 11th from June 26th. However, Netflix doesn't allow downgrades mid-cycle.

Mistakes happen, and if upgrades are permitted at any time, there should also be a way to rectify them. Now, I have fewer days on my current billing cycle, which just doesn't seem fair.

Netflix should take this matter seriously and find a way to address these kinds of customer concerns. I wonder how many others have faced this issue. This needs to be discussed more broadly so that Netflix understands and resolves this real problem.`,
    linkedin: lk("7205251288475836417"),
    likes: 56,
    hashtags: ["netflix"],
  },
  {
    slug: "dating-app-warning",
    title: "Three traps in modern dating apps",
    date: "2025-02",
    year: "2025",
    category: "personal",
    summary:
      "Subscription scams, fake profiles, data exploitation. We forgot to talk with strangers offline.",
    body: `Three things I want people to know about dating apps:

1. Subscription scams. Paid subscriptions rarely yield meaningful connections — women typically don't pay for dating-app access.
2. Fake profile schemes. Fraudsters use stolen photos to lure users into paying for additional content viewing.
3. Data exploitation. Dating-app companies monetize user data through personalized advertising and behavioral tracking across devices.

We forgot to talk with a stranger offline and started searching on internet. Try meeting people through real-world interactions.`,
    linkedin: lk("7214296447876255744"),
    likes: 22,
    hashtags: ["onlinedating", "dating", "tinder"],
  },
  {
    slug: "travel-personal-growth",
    title: "What four years of competitions taught me",
    date: "2023-03",
    year: "2023",
    category: "personal",
    summary:
      "Competitions across cities and states taught me as much as four years of B-Tech. Step out of comfort zones.",
    body: `Exploring new places and experiences has been a highlight of my year so far.

From participating in competitions across different cities and states, I've learned so much about the world and myself. The journey has allowed me to break free from the monotony of my day-to-day life and learn lessons that go beyond the classroom.

As I enter my final year of B-Tech, I've come to realize that the knowledge and skills I've gained through these experiences are just as important — if not more — than what I've learned in four years of education.

I encourage everyone to challenge themselves and step outside of their comfort zones. Whether it's through traveling, participating in competitions, helping others, or solving real-world problems, taking these opportunities can lead to personal growth and a deeper understanding of the world around us.`,
    linkedin: lk("7211795200065568768", true),
    likes: 47,
    hashtags: ["travel", "personalgrowth", "education"],
  },
  {
    slug: "edu-summit-weird",
    title: "Find a weird like you and never let them go",
    date: "2022-12",
    year: "2022",
    category: "personal",
    summary: `From the Edu Summit 2022.`,
    body: `FIND A WEIRD LIKE YOU AND NEVER LET THEM GO.
I found 🤞.
Edu Summit 2022.`,
    linkedin: lk("7107644725213466624"),
    likes: 136,
    hashtags: ["friendship", "summit"],
  },
  {
    slug: "doglapan-ashneer-grover",
    title: "Doglapan — what Ashneer Grover taught me",
    date: "2023-03",
    year: "2023",
    category: "books",
    summary:
      "Lessons from BharatPe's most polarizing co-founder — and his hard truths about life and start-ups.",
    body: `Just finished reading Doglapan: The Hard Truth About Life and Start-Ups by Ashneer Grover.

This book takes you through Ashneer's life — from school days, to graduation from IIT Delhi, a year studying in France, an MBA from IIM Ahmedabad, and a stint as a banker at Kotak Investment Banking. The real story begins when he decides to start his own company, BharatPe — the same entrepreneur most talked about for his critical responses on Shark Tank India Season 1. His journey is full of twists and turns. The news around his resignation made headlines, but what I found truly inspiring were the lessons.

Key takeaways:
- Start things with the people closest to you, even family.
- Prioritize yourself before anyone else.
- Treat investors as workers rather than gods.

Ashneer's story is proof that coming from a middle-class background doesn't limit your potential for success. Despite challenges, he made fortunes for others and himself. The book is a must-read for anyone interested in entrepreneurship and personal growth.

Have you read Doglapan yet? If not, I highly recommend it.`,
    linkedin: lk("7028381567030882304"),
    likes: 107,
    hashtags: ["ashneergrover", "mistakes", "goodreads"],
  },
  {
    slug: "think-like-a-monk",
    title: "Think Like A Monk — the monkey mind",
    date: "2024-05",
    year: "2024",
    category: "books",
    summary:
      `"Mind is like a monkey, swinging from one thought to another." On Jay Shetty's Think Like A Monk.`,
    body: `Mind 🧠 is like a monkey 🐒 — swinging from one thought to another, just as a monkey swings from one branch to another.

Jay Shetty's Think Like A Monk is part of my Inspiring Triumphs series. The book is a transformation guide — from undisciplined thinking to focused contemplation.`,
    linkedin: lk("7148701858507743232"),
    likes: 50,
    hashtags: ["thinklikeamonk", "monk", "jayshetty"],
  },
  {
    slug: "ikigai",
    title: "Ikigai — let it come",
    date: "2024-09",
    year: "2024",
    category: "books",
    summary:
      "The Japanese believe that everyone has an ikigai. Don't worry too much about finding it.",
    body: `The people of Japan believe that everyone has an ikigai.

Don't worry too much about finding it. Let it come.`,
    linkedin: lk("7211795200065568768", true),
    likes: 40,
    hashtags: ["ikigai"],
  },
  {
    slug: "sandeep-maheshwari",
    title: "The story of Sandeep Maheshwari",
    date: "2023-04",
    year: "2023",
    category: "books",
    summary:
      "A self-made entrepreneur, motivational speaker, and founder of ImagesBazaar.",
    body: `Discover the story of Sandeep Maheshwari, a self-made entrepreneur, motivational speaker, and founder of ImagesBazaar — who inspires millions with his powerful messages of self-belief, positive thinking, and overcoming challenges.

→ Inspiring Triumphs: Discovering Your True Calling — The Inspiring Journey of Sandeep Maheshwari.`,
    linkedin: lk("7048184592062681088", true),
    likes: 105,
    hashtags: ["entrepreneur", "motivation", "sandeepmaheshwari", "publicspeaker"],
  },
  {
    slug: "aman-gupta-boat",
    title: "Aman Gupta — the sound of success",
    date: "2023-04",
    year: "2023",
    category: "books",
    summary:
      "The marketing mastermind behind boAt Lifestyle, on innovation and creativity in audio.",
    body: `Get inspired by Aman Gupta — the marketing mastermind behind boAt Lifestyle, who's turning up the volume in the world of audio with his passion for innovation and creativity.

→ Inspiring Triumphs: Aman Gupta, CMO of Boat Lifestyle — The Man Behind the Sound of Success.`,
    linkedin: lk("7050059846804508672", true),
    likes: 111,
    hashtags: ["marketing", "amangupta", "boatlifestyle"],
  },
  {
    slug: "virali-modi-mytraintoo",
    title: "Virali Modi — #MyTrainToo",
    date: "2023-03",
    year: "2023",
    category: "books",
    summary:
      "After surviving three near-death experiences and becoming paralyzed, Virali Modi launched a campaign to make Indian railways accessible.",
    body: `After surviving three near-death experiences and becoming paralyzed, Virali Modi launched the #MyTrainToo campaign to make Indian Railways more accessible for people with disabilities.

→ Inspiring Triumphs.`,
    linkedin: lk("7042915506550407168", true),
    likes: 74,
    hashtags: ["MyTrainToo", "disability", "indianrailways", "activist"],
  },
  {
    slug: "jeeveshu-ahluwalia",
    title: "From director to laughterpreneur — Jeeveshu Ahluwalia",
    date: "2023-03",
    year: "2023",
    category: "books",
    summary:
      "How Jeeveshu's decision to pursue his passion transformed his life and gave him a new sense of purpose.",
    body: `My first newsletter — Inspiring Triumphs.

Discover how Jeeveshu's decision to pursue his passion transformed his life and gave him a new sense of purpose.

→ From Director to Laughterpreneur: The Inspiring Journey of Jeeveshu Ahluwalia.`,
    linkedin: lk("7045624711539544064", true),
    likes: 43,
    hashtags: ["triumph", "standupcomedy", "happiness"],
  },
];

export const featuredPosts = posts.filter((p) => p.featured);

export const postsByCategory = {
  engineering: posts.filter((p) => p.category === "engineering"),
  build: posts.filter((p) => p.category === "build"),
  career: posts.filter((p) => p.category === "career"),
  hackathon: posts.filter((p) => p.category === "hackathon"),
  books: posts.filter((p) => p.category === "books"),
  personal: posts.filter((p) => p.category === "personal"),
} as const;

export const categoryLabels: Record<PostCategory, string> = {
  engineering: "Engineering",
  build: "Build",
  career: "Career",
  hackathon: "Hackathons",
  books: "Books",
  personal: "Personal",
};
