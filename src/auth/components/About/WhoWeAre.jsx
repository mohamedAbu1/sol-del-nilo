import Image from 'next/image';
import SectionTitle from './SectionTitle ';

const imga = "/assets/Copilot_20250912_105907.png";

const WhoWeAre = () => (
  <section className="mb-12 flex flex-col lg:flex-row items-center gap-10">
    <div className="flex-1">
      <SectionTitle title="WHO WE ARE" />
      <p className="text-lg text-gray-400">
        SolDelNilo is a travel company dedicated to showcasing the rich heritage and timeless beauty of Egypt.
        Our team of experts is passionate about crafting exceptional tours that reveal the magic of this ancient land.
      </p>
    </div>
    <div className="flex-1">
      <Image
        src={imga}
        alt="Egyptian Woman"
        width={400}
        height={600}
        className="w-full max-w-sm mx-auto h-auto"
        loading="eager"
      />
    </div>
  </section>
);

export default WhoWeAre;
