"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

/* Sparkles nho nhỏ cho vibe bling */
function Sparkles({ count = 24 }: { count?: number }) {
  const stars = useMemo(
    () =>
      new Array(count).fill(0).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 1.5,
        dur: Math.random() * 1.5 + 1.5,
      })),
    [count],
  );
  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%   { opacity:.25; transform: scale(.8); filter: blur(1px); }
          100% { opacity:1;   transform: scale(1.3); filter: blur(0); }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,200,255,0.6) 40%, rgba(255,255,255,0) 70%)",
              boxShadow: "0 0 14px rgba(255, 180, 255, 0.85)",
              animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>
    </>
  );
}

type Props = {
  /** px cách đáy trang để bật dialog. Mặc định 200px */
  threshold?: number;
  /** bật 1 lần duy nhất cho mỗi lần vào trang */
  once?: boolean;
};

export default function EndOfJourneyDialog({
  threshold = 200,
  once = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const reached =
        window.innerHeight + window.scrollY >=
        (document.documentElement.scrollHeight || document.body.scrollHeight) -
          threshold;

      if (reached && (!once || !hasShown)) {
        setOpen(true);
        setHasShown(true);
        document.documentElement.classList.add("overflow-y-hidden"); // khoá nền
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, once, hasShown]);

  // đóng: mở lại scroll
  const close = () => {
    setOpen(false);
    document.documentElement.classList.remove("overflow-y-hidden");
  };

  const restart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    close();
  };

  // esc để đóng
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Portal để overlay luôn trên cùng
  if (typeof window === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay mờ + chút sương galaxy để đồng điệu nền */}
          <motion.div
            className="fixed inset-0 z-[100] backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, backgroundColor: "rgba(6,6,8,0.65)" }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          {/* Dialog */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-6"
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, y: -10, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <div className="relative w-full max-w-lg">
              {/* viền gradient chạy + glow */}
              <div className="p-[2px] rounded-3xl bg-[linear-gradient(90deg,#f472b6,#a78bfa,#fb7185,#f472b6)] bg-[length:200%_100%] animate-[shine_7s_linear_infinite] shadow-[0_0_40px_rgba(255,160,220,.25)]">
                <div className="relative rounded-3xl bg-black/45 backdrop-blur-xl ring-1 ring-white/10 px-8 py-10 text-center">
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-3">
                    <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#f472b6,#fb7185,#a78bfa,#f472b6)] bg-[length:220%_100%] animate-[shine_8s_linear_infinite]">
                      Hành trình đã kết thúc 💖
                    </span>
                  </h3>
                  <p className="text-lg md:text-xl text-white/85 leading-relaxed">
                    Chúc mừng ngày Phụ nữ Việt Nam 20/10! Mong em luôn bình an,
                    rạng rỡ và hạnh phúc — hôm nay và mỗi ngày.
                  </p>

                  <div className="mt-8 flex items-center justify-center gap-3">
                    <button
                      onClick={restart}
                      className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:opacity-90 transition shadow-[0_0_16px_rgba(244,114,182,.6)]"
                    >
                      Xem lại từ đầu
                    </button>
                    <button
                      onClick={close}
                      className="px-5 py-2.5 rounded-full text-sm font-medium text-white/80 bg-white/10 hover:bg-white/15 backdrop-blur transition"
                    >
                      Đóng
                    </button>
                  </div>

                  {/* sparkle bên trong */}
                  <Sparkles />
                </div>
              </div>
            </div>
          </motion.div>

          {/* keyframes cho shine */}
          <style>{`
            @keyframes shine { 0% {background-position:0% 50%} 100% {background-position:200% 50%} }
          `}</style>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
