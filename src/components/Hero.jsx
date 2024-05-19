import React, { useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  const text = "Descubra eventos gratuitos dedicados às Fatecs. Junte-se agora para explorar eventos acadêmicos e extracurriculares.";

  const words = text.split(" ");

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <motion.section
      className="bsb-hero-1 px-3 bsb-overlay bsb-hover-pull hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="background-animation"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #000000, #dc3545)`,
        }}
      />
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-11 col-lg-9 col-xl-7 col-xxl-6 text-center text-white">
            <motion.h2 className="display-3 fw-bold mb-3" variants={itemVariants}>
              Eventec
            </motion.h2>
            <motion.p className="lead mb-5">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordAnimation}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </motion.p>
            <motion.div className="d-grid gap-2 d-sm-flex justify-content-sm-center" variants={itemVariants}>
              <motion.a whileHover={{ scale: 0.85 }}>
                <a href="/signinup" className="btn bsb-btn-xl btn-light gap-3">Cadastrar-se</a>
              </motion.a>
              <motion.a whileHover={{ scale: 0.85 }}>
                <a href="/signinup" className="btn bsb-btn-xl btn-outline-light">Entrar</a>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
