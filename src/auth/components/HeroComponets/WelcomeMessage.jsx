"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const WelcomeMessageBubble = () => {
  const t = useTranslations("HomeHeroPage");
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي (light/dark)

  const [hasMounted, setHasMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [typedLines, setTypedLines] = useState([]);
  const [typingDone, setTypingDone] = useState(false);
  const [fullLines, setFullLines] = useState([]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const lines = [t("welcome"), t("welcome1"), t("welcome2"), t("welcome3")];
    setFullLines(lines);

    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, [hasMounted, t]);

  useEffect(() => {
    if (!startTyping || fullLines.length === 0) return;

    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = "";

    const typingInterval = setInterval(() => {
      currentLine += fullLines[lineIndex][charIndex];
      charIndex++;

      setTypedLines((prev) => {
        const updated = [...prev];
        updated[lineIndex] = currentLine;
        return updated;
      });

      if (charIndex === fullLines[lineIndex].length) {
        lineIndex++;
        charIndex = 0;
        currentLine = "";
      }

      if (lineIndex === fullLines.length) {
        clearInterval(typingInterval);
        setTypingDone(true);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [startTyping, fullLines]);

  const animation = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        onComplete: () => setStartTyping(true),
      },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };

  if (!hasMounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={animation}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full px-4 py-4 max-w-[95vw] lg:max-w-[clamp(280px,80vw,420px)] h-auto max-h-[90vh] lg:max-h-[clamp(400px,90vh,820px)] rounded-3xl shadow-2xl font-[Raleway]"
          style={{
            background: `linear-gradient(135deg, ${muiTheme.palette.primary.main}20, ${muiTheme.palette.secondary.main}30)`, // ✅ خلفية متدرجة من ألوان الثيم
            color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
          }}
        >
          {/* ✅ المحتوى */}
          <div
            className="flex flex-col justify-center h-full space-y-6 text-center z-10 px-5 pb-12"
            style={{ padding: "20px" }}
          >
            <h2
              className="text-2xl lg:text-[clamp(1.75rem,5vw,2.5rem)] font-bold drop-shadow-sm tracking-wide"
              style={{ color: muiTheme.palette.secondary.main }} // ✅ العنوان من اللون الثانوي
            >
              {typedLines[0]}
              {!typingDone && typedLines[0]?.length < fullLines[0]?.length && (
                <span style={{ color: muiTheme.palette.secondary.main }} className="animate-pulse">
                  |
                </span>
              )}
            </h2>

            <div
              className="space-y-4 text-base lg:text-[clamp(0.95rem,4vw,1.2rem)] leading-relaxed font-medium"
              style={{ color: muiTheme.palette.text.secondary }} // ✅ النصوص الثانوية
            >
              {typedLines.slice(1).map((line, i) => (
                <p key={i}>
                  {line}
                  {!typingDone &&
                    fullLines[i + 1] &&
                    i === typedLines.slice(1).length - 1 &&
                    line.length < fullLines[i + 1].length && (
                      <span style={{ color: muiTheme.palette.secondary.main }} className="animate-pulse">
                        |
                      </span>
                    )}
                </p>
              ))}
            </div>
          </div>

          {/* ✅ الذيل السفلي المرتبط بالحاوية */}
          <div className="absolute bottom-0 left-[8%] translate-y-full w-[40px] h-[40px] lg:w-[clamp(30px,8vw,50px)] lg:h-[clamp(30px,8vw,50px)] overflow-hidden z-0">
            <div
              className="w-full h-full backdrop-blur-md shadow-md rounded-br-full rounded-tl-sm"
              style={{ backgroundColor: muiTheme.palette.primary.main + "20" }} // ✅ الذيل بنفس لون الثيم الأساسي
            ></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeMessageBubble;
