import { motion } from "framer-motion";
import heroImage from "../assets/hero.webp";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Hero() {
  const navigate = useNavigate();
  const { token } = useAuth();
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background */}

      <img
        src={heroImage}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}

      <div className="relative z-10 h-full flex items-center">

        <div className="max-w-7xl mx-auto px-6 w-full">

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
            className="max-w-2xl"
          >

            <p className="uppercase tracking-[4px] text-green-300 font-semibold">
              AI Powered Product Writing
            </p>

            <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 leading-tight">

              Generate Product
              <br />

              Descriptions
              <br />

              That Sell More.

            </h1>

            <p className="mt-8 text-lg md:text-xl text-gray-200 leading-9">

              Create professional,
              SEO-friendly descriptions
              for food products,
              grocery items and local businesses
              within seconds using Artificial Intelligence.

            </p>

            <div className="mt-10">
              <Button onClick={() => {
                    if(token)
                        navigate("/dashboard");
                    else
                      navigate("/login");                  
                   }}
               >
                   Start Generating
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Curved Bottom */}

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">

        <svg
          viewBox="0 0 1440 180"
          className="w-full h-[110px]"
          preserveAspectRatio="none"
        >
          <path
            fill="#F8FAF5"
            d="M0,64L80,74.7C160,85,320,107,480,122.7C640,139,800,149,960,133.3C1120,117,1280,75,1360,53.3L1440,32L1440,181L1360,181C1280,181,1120,181,960,181C800,181,640,181,480,181C320,181,160,181,80,181L0,181Z"
          />
        </svg>

      </div>

    </section>
  );
}

export default Hero;