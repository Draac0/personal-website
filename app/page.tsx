import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Contributions } from "./components/Contributions";
import { Experience } from "./components/Experience";
import { Photos } from "./components/Photos";
import { WritingPreview } from "./components/WritingPreview";
import { Contact } from "./components/Contact";
import { BuiltWithClaude } from "./components/BuiltWithClaude";

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <About />
      <Contributions />
      <Experience />
      <Photos />
      <WritingPreview />
      <Contact />
      <BuiltWithClaude />
    </main>
  );
}
