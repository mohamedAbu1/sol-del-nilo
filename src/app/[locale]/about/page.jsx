import Mission from "@/auth/components/About/Mission";
import WhoWeAre from "@/auth/components/About/WhoWeAre";
import WhySolDelNilo from "@/auth/components/About/WhySolDelNilo";
import DecorativeBorder from "@/auth/components/About/DecorativeBorder";
import Header from "@/auth/components/Header";
export default function AboutUsPage() {
  return (
    <main
      style={{ color: "#ff9800" }}
      className="backgroundPic flex flex-col items-center justify-center font-serif min-h-screen px-6 py-16"
    >
      <div className=" container flex flex-col items-center justify-center">
        <Header />
        <div style={{ marginTop: "22px" }} className="text-center">
          <h1 className="text-5xl font-bold tracking-wide">ABOUT US</h1>
          <div className="">
            <svg
              width="300"
              height="300"
              viewBox="0 0 300 300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="300" height="300" fill="#181a1b" />

              <circle cx="150" cy="120" r="40" fill="#ff9800" />

              <g stroke="#ff9800" strokeWidth="4" style={{borderRadius:'10px'}}>
                {Array.from({ length: 16 }).map((_, i) => {
                  const spread = 120;
                  const startAngle = 180 - spread / 2; // يبدأ من 120°
                  const angle =
                    (startAngle + i * (spread / 12)) * (Math.PI / 60);

                  const r1 = 70; // نصف قطر الشمس
                  const r2 = 20; // طول الشعاع
                  const cx = 150;
                  const cy = 120;

                  const x1 = cx + r1 * Math.cos(angle);
                  const y1 = cy + r1 * Math.sin(angle);
                  const x2 = cx + r2 * Math.cos(angle);
                  const y2 = cy + r2 * Math.sin(angle);

                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                })}
              </g>

              <path
                d="M60 180 Q90 160 120 180 T180 180 T240 180"
                stroke="#ff9800"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M60 200 Q90 180 120 200 T180 200 T240 200"
                stroke="#ff9800"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </div>
        </div>

        <Mission />
        <WhoWeAre />
        <WhySolDelNilo />
        <DecorativeBorder />
      </div>
    </main>
  );
}
