import { motion } from "framer-motion";

function Card({
  title,
  description,
  icon,
  darkMode,
  delay = 0,
}) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0, 10, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.05,
      }}
      className={`
      rounded-3xl
      p-8
      shadow-lg
      transition-all

      ${
        darkMode
          ? "bg-[#243127] text-white"
          : "bg-white text-gray-800"
      }
      `}
    >
      <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="mt-6 text-2xl font-bold">
        {title}
      </h3>

      <p
        className={`mt-4 leading-8 ${
          darkMode
            ? "text-gray-300"
            : "text-gray-600"
        }`}
      >
        {description}
      </p>
    </motion.div>
  );
}

export default Card;