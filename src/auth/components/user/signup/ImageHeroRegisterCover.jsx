import Image from "next/image";
const imag2 = "/assets/Copilot_20250910_005440.png";
const imga = "/assets/Copilot_20250909_192112.png"
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const ImageHeroRegisterCover = () => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <>
      <Image
        src={imga}
        alt="background"
        fill
        loading="eager"
        className="hidden lg:flex object-cover"
      />
      <Image
        src={imag2}
        alt="background"
        fill
        loading="eager"
        className="flex object-cover lg:hidden"
      />
    </>
  );
};

export default ImageHeroRegisterCover;
