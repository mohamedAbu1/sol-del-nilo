import LinksMidea from "./LinksMidea";
import BtnHero from "./BtnHero";
import TextHero from "./TextHero";
import ImageMopilSize from "./ImageMopilSize";
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
      <button
        onClick={handleReplay}
        style={{ cursor: "pointer" }}
        className=" hidden lg:flex px-6 py-2 text-white rounded animate-pulse-3s hover:bg-white/20 transition"
      >
        🎬 Replay Video
      </button>
    </section>
  );
};

export default Hero;
