import React from 'react';
import { motion } from 'framer-motion';

const InfoGrid = () => {
  const leftBlockVariants = {
    hidden: { x: -100, opacity: 0 },
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

  const rightBlockVariants = {
    hidden: { x: 100, opacity: 0 },
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

  return (
    <div className="container py-4">
      <motion.div
        className="p-5 mb-4 bg-body-tertiary rounded-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.6,
            },
          },
        }}
      >
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Inscreva-se e Participe</h1>
          <p className="col-md-8 fs-4">
            Ainda não tem uma conta? Cadastre-se agora para acessar todos os eventos, inscrever-se e aproveitar conteúdos exclusivos.          </p>
          <button className="btn btn-primary btn-lg" type="button">Criar Conta</button>
        </div>
      </motion.div>

      <div className="row align-items-md-stretch">
        <motion.div
          className="col-md-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={leftBlockVariants}
        >
          <div className="h-100 p-5 text-bg-danger rounded-3">
            <h2>Networking e Oportunidades</h2>
            <p>
            Além de aprender, você terá a chance de fazer networking com outros estudantes e profissionais. Fortaleça sua rede de contatos e abra portas para novas oportunidades.            </p>
            {/* <button className="btn btn-outline-light" type="button">Example button</button> */}
          </div>
        </motion.div>
        
        <motion.div
          className="col-md-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={rightBlockVariants}
        >
          <div className="h-100 p-5 text-bg-primary border rounded-3">
            <h2>Aprenda com os Melhores</h2>
            <p>
            Participe de eventos ministrados por especialistas de diversas áreas.            </p>
            {/* <button className="btn btn-outline-secondary" type="button">Example button</button> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InfoGrid;
