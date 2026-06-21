function Footer({ darkMode }) {
  return (
    <footer
      className={`border-t mt-8 md:mt-12 lg:mt-16 ${
        darkMode
          ? "bg-slate-900 border-slate-700 text-slate-300"
          : "bg-white border-gray-200 text-gray-500"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-4 md:py-6 text-center">

        <p className="text-sm md:text-base">
          © 2026 Product Description Generator
        </p>

        <p className="mt-2 text-xs md:text-sm">
          TBI - Graphic Era University | Summer Internship Program 2026
        </p>

      </div>
    </footer>
  );
}

export default Footer;