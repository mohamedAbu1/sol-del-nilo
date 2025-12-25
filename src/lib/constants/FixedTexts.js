// todo هنا نقوم بكتابة العناصر الثابته في الموقع لاستخدمها في اكثر من مكان
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import "../../styles/globals.css";
import { BiLogoFacebook, BiLogoGmail } from "react-icons/bi";

// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const DOMAIN = "http://localhost:3000";
export const NameWebsite = "SolDelNilo";
export const ToursPathEn = "/en/tours";
export const ToursPathEs = "/es/tours";
export const ToursPathde = "/de/tours";
export const ToursPathfr = "/fr/tours";
export const ToursPathit = "/it/tours";
export const ToursPathar = "/ar/tours";
export const RegisterPathEn = "/en/register";
export const RegisterPathEs = "/es/register";
export const AboutPathEn = "/en/about";
export const AboutPathEs = "/es/about";
export const AboutPathde = "/de/about";
export const AboutPathfr = "/fr/about";
export const AboutPathit = "/it/about";
export const AboutPathar = "/ar/about";
export const ContactPathEn = "/en/contact";
export const ContactPathEs = "/es/contact";
export const ContactPathde = "/de/contact";
export const ContactPathfr = "/fr/contact";
export const ContactPathit = "/it/contact";
export const ContactPathar = "/ar/contact";
const img = "/assets/Copilot_20251011_220928.webp";
const img2 = "/assets/Copilot_20251011_221403.webp";
const img3 = "/assets/Copilot_20251011_221703.webp";
const img4 = "/assets/Copilot_20251011_221802.webp";
const img5 = "/assets/Copilot_20251011_222046.webp";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const getNavPath = (t) => [
  { label: t("Home"), path: "/" },
  { label: t("Tours"), path: "/tours" },
  { label: t("About"), path: "/about" },
  { label: t("Contact"), path: "/contact" },
];
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const getHeroText = (t) => [
  { titel: t("title1") },
  { titel: t("title2") },
];
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const getSliderToursDiv = (t) => [
  {
    image: "/assets/Temple_of_the_Elephants.webp",
    title: t("TitleDivPic"),
    subtitle: t("PDivPic"),
  },
  {
    image: "/assets/Abu_Simbel.webp",
    title: t("TitleDivPic"),
    subtitle: t("PDivPic"),
  },
  {
    image: "/assets/Nile_River.webp",
    title: t("TitleDivPic"),
    subtitle: t("PDivPic"),
  },
];
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const getCityName = (t) => [
  { city: t("Aswan"), value: "10" },
  { city: t("Cairo"), value: "20" },
  { city: t("Hurghada"), value: "30" },
  { city: t("Luxor"), value: "40" },
  { city: t("Mersa"), value: "50" },
  { city: t("Marsa"), value: "60" },
  { city: t("Sharm"), value: "70" },
];
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// export const MideaIcon = [
//   {
//     titleIcon: "SoloNilo.facebook",
//     Icon: <BiLogoFacebook />,
//     path: "https://www.facebook.com/share/1bSxScbbn3/",
//   },
//   {
//     titleIcon: "SoloNilo.Whatsapp",
//     Icon: <FaWhatsapp />,
//     path: "https://wa.me/201010104875",
//   },
//   {
//     titleIcon: "SoloNilo.Instagram",
//     Icon: <FaInstagram />,
//     path: "https://www.instagram.com/egipto_milenario?igsh=MXF0azJzdzdyNTVibA==",
//   },
//   {
//     titleIcon: "SoloNilo.Tiktok",
//     Icon: <FaTiktok />,
//     path: "https://www.tiktok.com/@soldelnilo0?is_from_webapp=1&sender_device=pc",
//   },
//   {
//     titleIcon: "SoloNilo.Gmail",
//     Icon: <BiLogoGmail />,
//     path: "https://mail.google.com/mail/u/0/?hl=ar#inbox",
//   },
// ];
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const AdviceCard = [
  {
    id: "1",
    imageUrl: img,
    title: "🧥 Wear modest clothing in public and religious places.",
    description:
      "It is preferable to wear clothing that covers the shoulders and knees, especially when visiting mosques or rural areas.",
  },
  {
    id: "2",
    imageUrl: img2,
    title: "💵 Always carry small paper money.",
    description:
      "Tips are part of everyday culture, whether in restaurants, on tours, or even in public restrooms.",
  },
  {
    id: "3",
    imageUrl: img3,
    title: "🚫 Avoid drinking tap water.",
    description: "Drink only bottled mineral water, even in hotels.",
  },
  {
    id: "4",
    imageUrl: img4,
    title: "🗣️ Learn some basic Arabic words",
    description:
      "Words like thank you, please, and how much? help you communicate and show respect for the local culture.",
  },
  {
    id: "8",
    imageUrl: img5,
    title: "📸 Respect the rules when photographing.",
    description: "Do not take photos of military or police installations.",
  },
];
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export const desktopImages = [
  "/assets/travco-travel-c4259777-fab7-4d77-bd9f-d99e1d3fc377.webp",
  "/assets/_8989_slider1.webp",
  "/assets/_12294_slider2.webp",
  "/assets/_1402__8989_slider3.webp",
];
export const desktopImagesMB = [
  "/assets/WhatsApp2.webp",
  "/assets/_8989_slider1.webp",
  "/assets/548898267_18083849644930067_2023880468351303706_n.webp",
  "/assets/553312854_18084731197930067_1648342695818561037_n.webp",
];
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export const GetTours = (t) => [
  {
    title: "SEDAN",
    description: t("SCSD"),
    duration: "1 Day",
    image: "/assets/Copilot_20251126_103743.webp",
  },
  {
    title: "VAN",
    description: t("SCSD2"),
    duration: "5 Days",
    image: "/assets/BCO.e442b673-50cf-46ac-9d95-18c90ba23bfc.webp",
  },
  {
    title: "COASTER",
    description: t("SCSD3"),
    duration: "4 Days",
    image: "/assets/Copilot_20251126_103242.webp",
  },
];
