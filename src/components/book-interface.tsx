"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const wishes = [
  {
    title: "Gửi người con gái anh thương 💝",
    content:
      "Cảm ơn em đã đến và khiến thế giới của anh dịu dàng hơn. Mỗi ngày bên em đều là món quà anh trân trọng.",
  },
  {
    title: "Sức mạnh dịu dàng 🌷",
    content:
      "Em mạnh mẽ theo cách riêng của mình – bằng lòng tốt và nụ cười. Anh luôn muốn được che chở và sẻ chia cùng em.",
  },
  {
    title: "Vẻ đẹp từ trái tim ✨",
    content:
      "Em đẹp ở sự chân thành, ở ánh mắt biết nói, và ở cách em khiến người khác cảm thấy được yêu thương.",
  },
  {
    title: "Dấu ấn của em 🌟",
    content:
      "Dù đi đến đâu, em cũng mang theo năng lượng tích cực. Cảm ơn em vì đã khiến cuộc sống của anh rực rỡ và ấm áp hơn.",
  },
  {
    title: "Lời hứa nhỏ 💕",
    content:
      "Anh hứa sẽ luôn lắng nghe, luôn ở bên, và yêu em bằng tất cả những gì anh có – hôm nay và cả sau này.",
  },
  {
    title: "Biết ơn em 🌹",
    content:
      "Cảm ơn em đã để anh bước vào thế giới của em. Mong rằng mỗi ngày em đều nở nụ cười hạnh phúc.",
  },
];

function Sparkles({ count = 20 }: { count?: number }) {
  const stars = useMemo(
    () =>
      new Array(count).fill(0).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 1.2,
        dur: Math.random() * 1.2 + 1.2,
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

export default function BookInterface() {
  return (
    <section className="relative w-full py-32 md:py-40">
      <div className="mx-auto flex max-w-5xl flex-col gap-28 px-4 md:gap-36">
        {wishes.map((wish, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.98, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              delay: 0.06 * i,
              type: "spring",
              stiffness: 160,
              damping: 22,
            }}
            className="relative mx-auto w-full max-w-3xl"
          >
            {/* viền gradient + glow */}
            <div className="p-[2px] rounded-3xl bg-[linear-gradient(90deg,#f472b6,#a78bfa,#fb7185,#f472b6)] bg-[length:200%_100%] animate-[shine_7s_linear_infinite]">
              <div className="relative rounded-3xl bg-black/45 backdrop-blur-xl p-8 md:p-14 shadow-[0_0_30px_rgba(255,150,255,0.25)] ring-1 ring-white/10">
                <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-6">
                  <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#f472b6,#fb7185,#a78bfa,#f472b6)] bg-[length:220%_100%] animate-[shine_8s_linear_infinite]">
                    {wish.title}
                  </span>
                </h2>
                <p className="text-center text-lg md:text-xl text-white/85 leading-relaxed">
                  {wish.content}
                </p>

                <Sparkles />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <style>{`
        @keyframes shine { 0% {background-position:0% 50%} 100% {background-position:200% 50%} }
      `}</style>
    </section>
  );
}
