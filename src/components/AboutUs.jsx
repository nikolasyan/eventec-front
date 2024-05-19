import React from 'react';
import { Collection, GearFill, Table, Speedometer, CashCoin, Coin, PatchCheck, EmojiSmile } from 'react-bootstrap-icons';
import { motion } from 'framer-motion';

const featureVariants = {
  hiddenLeft: { x: -100, opacity: 0 },
  hiddenRight: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
      duration: 1.2
    }
  }
};

const hoverEffect = {
  hover: {
    scale: 1.05,
    rotate: 3,
    transition: {
      duration: 0.3
    },
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)'
  }
};

const Feature = ({ Icon, title, description, direction }) => (
  <motion.div
    className="col d-flex flex-column gap-2"
    initial={direction === 'left' ? 'hiddenLeft' : 'hiddenRight'}
    whileInView="visible"
    viewport={{ once: true }}
    variants={featureVariants}
    whileHover="hover"
  >
    <motion.div
      className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"
      variants={hoverEffect}
    >
      <Icon size={32} color="white" />
    </motion.div>
    <h4 className="fw-semibold mb-0 text-body-emphasis">{title}</h4>
    <p className="text-body-secondary">{description}</p>
  </motion.div>
);

const AboutUs = () => {
  return (
    <div className="container px-4 py-5">
      <h2 className="pb-2 border-bottom"></h2>

      <div className="text-start row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
        <motion.div
          className="col d-flex flex-column align-items-start gap-2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="fw-bold text-body-emphasis"> Descubra os Benefícios do Eventec</h2>
          {/* <p className="text-body-secondary">
            Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.
          </p>
          <a href="#" className="btn btn-primary btn-lg">Primary button</a> */}
        </motion.div>

        <div className="col">
          <div className="row row-cols-1 row-cols-sm-2 g-4">
            <Feature Icon={PatchCheck} title="Certificados" description="Receba certificados de participação em eventos e valorize seu currículo." direction="left" />
            <Feature Icon={Collection} title="Diversidade" description="Explore eventos dos mais variados temas" direction="right" />
            <Feature Icon={Coin} title="Totalmente gratuito" description="Aproveite essa oportunidade para aprender e se desenvolver sem nenhum custo." direction="left" />
            <Feature Icon={EmojiSmile} title="Inscrições Simples" description="Utilize nossa plataforma para se inscrever em eventos de forma rápida e prática. Tudo em um só lugar." direction="right" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
