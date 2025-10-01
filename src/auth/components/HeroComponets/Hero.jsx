import LinksMidea from "./LinksMidea";
import BtnHero from "./BtnHero";
import TextHero from "./TextHero";
// ? $$$$$$$$$$$$$$$$$$$$$$
const Hero = ({ handleReplay }) => {
  return (
    <section
      style={{ color: "var(--textLithe)" }}
      className="w-full h-full flex items-center justify-center gap-5 flex-col absolute  inset-0 z-20"
    >
      <TextHero />
      <BtnHero />
      <LinksMidea />
    </section>
  );
};

export default Hero;
