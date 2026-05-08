import { profile } from "../data/profile";
import { repo } from "../data/site-tree";
import {
  fetchContributions,
  currentStreak,
  maxStreak,
  PRIMARY_USERNAME,
} from "../lib/github";
import { HeroInteractive } from "./HeroInteractive";

export async function Hero() {
  const contribs = await fetchContributions(PRIMARY_USERNAME);
  const streak = currentStreak(contribs.days);
  const longest = maxStreak(contribs.days);

  return (
    <HeroInteractive
      profile={{ name: profile.name, githubUrl: profile.links.github }}
      repo={{
        owner: repo.owner,
        name: repo.name,
        branch: repo.branch,
        description: repo.description,
        topics: repo.topics,
      }}
      contribTotal={contribs.total}
      contribStreak={streak}
      contribLongest={longest}
      weeks={contribs.weeks}
      readMoreHref="/#about"
    />
  );
}
