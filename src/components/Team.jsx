import React from 'react';
import { motion } from 'framer-motion';

const Team = () => {
  const cardVariants = {
    offscreen: {
      opacity: 0,
      y: 50
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <div className='container'>
      <section className="bg-light py-5 py-xl-8">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <p className="display-5 mb-4 mb-md-5 text-center">Equipe</p>
              <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle"/>
            </div>
          </div>
        </div>

        <div className="container overflow-hidden">
          <div className="row gy-4 gy-md-0 gx-xxl-5">
            {['Guilherme Henrique', 'Níkolas Costa', 'Víctor Viana'].map((name, index) => (
              <motion.div
                className="col-12 col-md-4"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                key={index}
                variants={cardVariants}
              >
                <div className="card border-0 border-bottom border-primary shadow-sm">
                  <div className="card-body p-4 p-xxl-5">
                    <figure>
                      <img className="img-fluid teamImg rounded rounded-circle mb-4 border border-5" loading="lazy" 
                        src="https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png" 
                        alt={`${name}`} 
                      />
                      <figcaption>
                        <div className="bsb-ratings text-warning mb-3" data-bsb-star="5" data-bsb-star-off="0"></div>
                        <h4 className="mb-2">{name}</h4>
                        <h5 className="fs-6 text-secondary mb-0">{index === 0 ? 'Banco de dados' : index === 1 ? 'Front-end' : 'Back-end'}</h5>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
