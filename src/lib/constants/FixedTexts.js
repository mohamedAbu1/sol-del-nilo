// todo هنا نقوم بكتابة العناصر الثابته في الموقع لاستخدمها في اكثر من مكان 
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import { FaWhatsapp } from "react-icons/fa6";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { BiLogoFacebook, BiLogoGmail } from "react-icons/bi";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
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
  {label:t("Admin"),path:"/admin"},
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
    image: "/assets/pexels-axp-photography-500641970-18991590.jpg",
    title: t("TitleDivPic"),
    subtitle: t("PDivPic"),
  },
  {
    image: "/assets/pexels-ahmed-aziz-126288236-12607742.jpg",
    title: t("TitleDivPic"),
    subtitle: t("PDivPic"),
  },
  {
    image: "/assets/pexels-mert-celik-1876960105-33634565.jpg",
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
   {titleIcon:"SoloNilo.facebook" ,Icon: <BiLogoFacebook /> ,path:"/"},
   {titleIcon:"SoloNilo.Whatsapp" ,Icon: <FaWhatsapp /> ,path:"/"},
   {titleIcon:"SoloNilo.Instagram" ,Icon: <FaInstagram /> ,path:"/"},
   {titleIcon:"SoloNilo.Linkedin" ,Icon: <FaLinkedin /> ,path:"/"},
   {titleIcon:"SoloNilo.Gmail" ,Icon: <BiLogoGmail /> ,path:"/"},
]