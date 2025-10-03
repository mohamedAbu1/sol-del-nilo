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
const img = "/assets/553369982_18084719236930067_3616584709694153081_n.jpg"
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
    image: "/assets/Temple_of_the_Elephants.png",
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
   {titleIcon:"SoloNilo.facebook" ,Icon: <BiLogoFacebook /> ,path:"https://www.facebook.com/share/1bSxScbbn3/"},
   {titleIcon:"SoloNilo.Whatsapp" ,Icon: <FaWhatsapp /> ,path:"https://wa.me/201010104875"},
   {titleIcon:"SoloNilo.Instagram" ,Icon: <FaInstagram /> ,path:"https://www.instagram.com/egipto_milenario?igsh=MXF0azJzdzdyNTVibA=="},
   {titleIcon:"SoloNilo.Tiktok" ,Icon: <FaTiktok /> ,path:"https://www.tiktok.com/@soldelnilo0?is_from_webapp=1&sender_device=pc"},
   {titleIcon:"SoloNilo.Gmail" ,Icon: <BiLogoGmail /> ,path:"https://mail.google.com/mail/u/0/?hl=ar#inbox"},
]
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const AdviceCard = [
  {id:"1",imageUrl:img,title:"mohamed",description:"asdasdasdsad"},
  {id:"2",imageUrl:img,title:"ahmed",description:"sadsadsdasdsadsadsda"},
  {id:"3",imageUrl:img,title:"ali",description:"sdasadsdsdadsasd"},
  {id:"4",imageUrl:img,title:"mosad",description:"sadsaddsafgdfgdgfgf"},
  {id:"8",imageUrl:img,title:"sa dsa",description:"kuykyytjyjtjytjyt"},
  {id:"6",imageUrl:img,title:"sadasd",description:"gfdfdgfgfgdfdggfgfd"},
  {id:"9",imageUrl:img,title:"sadsad",description:"rteytyttyujyjhjhytjytj"}
]