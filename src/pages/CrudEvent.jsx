import React from 'react';
import { motion } from 'framer-motion';
import ShowEvents from '../components/ShowEvents';
import CreateEvents from '../components/CreateEvents';
import LoggedNavbar from './LoggedNavbar';
import Footer from '../components/Footer';

const CrudEvent = () => {
  if (localStorage.userType === "professor" || localStorage.userType === "diretor") {
    return (
      <>
        <LoggedNavbar />
        <motion.div
          className="container-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className='container'>
            <div className="row">
              <motion.div
                className="col-sm-12 col-lg-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <CreateEvents />
              </motion.div>
              <motion.div
                className="col-sm-12 col-lg-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <ShowEvents />
              </motion.div>
            </div>
          </div>
        </motion.div>
        <Footer />
      </>
    );
  } else {
    return (
      <h1 className='align-middle'>ACESSO NEGADO</h1>
    );
  }
}

export default CrudEvent;
