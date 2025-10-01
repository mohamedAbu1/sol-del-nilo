// todo هنا نقوم بكتابة العناصر الثابته في الموقع لاستخدمها في اكثر من مكان 
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import { FaWhatsapp } from "react-icons/fa6";
import { FaInstagram,FaTiktok } from "react-icons/fa";
import { BiLogoFacebook, BiLogoGmail } from "react-icons/bi";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const DOMAIN = "http://localhost:3000"
export const NameWebsite = "SolDelNilo"
export const ToursPathEn = "/en/tours"
export const ToursPathEs =  "/es/tours"
export const RegisterPathEn =  "/en/register"
export const RegisterPathEs =  "/es/register"
export const AboutPathEn =  "/en/about"
export const AboutPathEs =  "/es/about"
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const getNavPath = (t) => [
  {label:t("Home"),path:"/"},
  {label:t("Tours"),path:"/tours"},
  {label:t("About"),path:"/about"},
]
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const getHeroText = (t) => [
  {titel:t("title1")},
  {titel:t("title2")},
]
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const getSliderToursDiv = (t) => [
  // {img:img1,title:t("TitleDivPic"),p:t("PDivPic"),btn:t("BtnDivPic")},
  // {img:img2,title:t("TitleDivPic"),p:t("PDivPic"),btn:t("BtnDivPic")},
  // {img:img3,title:t("TitleDivPic"),p:t("PDivPic"),btn:t("BtnDivPic")},
  // {img:img4,title:t("TitleDivPic"),p:t("PDivPic"),btn:t("BtnDivPic")},
  {
    image: "/public/assets/Temple_of_the_Elephants.png",
    title: t("TitleDivPic"),
    subtitle: t("PDivPic"),
  },
  {
    image: "/assets/Abu_Simbel.jpg",
    title: t("TitleDivPic"),
    subtitle: t("PDivPic"),
  },
  {
    image: "/assets/Nile_River.jpg",
    title: t("TitleDivPic"),
    subtitle: t("PDivPic"),
  },

]
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const getCityName = (t) => [
  {city:t("Aswan"),value:"10"},
  {city:t("Cairo"),value:"20"},
  {city:t("Hurghada"),value:"30"},
  {city:t("Luxor"),value:"40"},
  {city:t("Mersa"),value:"50"},
  {city:t("Marsa"),value:"60"},
  {city:t("Sharm"),value:"70"},
]
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const MideaIcon = [
   {titleIcon:"SoloNilo.facebook" ,Icon: <BiLogoFacebook /> ,path:"https://www.facebook.com/profile.php?id=100093492715749&mibextid=ZbWKwL"},
   {titleIcon:"SoloNilo.Whatsapp" ,Icon: <FaWhatsapp /> ,path:"https://wa.me/201010104875"},
   {titleIcon:"SoloNilo.Instagram" ,Icon: <FaInstagram /> ,path:"https://www.instagram.com/egipto_milenario?igsh=MXF0azJzdzdyNTVibA=="},
   {titleIcon:"SoloNilo.Tiktok" ,Icon: <FaTiktok /> ,path:"/"},
   {titleIcon:"SoloNilo.Gmail" ,Icon: <BiLogoGmail /> ,path:"/"},
]