import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import LoggedNavbar from './LoggedNavbar';
import { motion } from 'framer-motion';
import "./myAccount.css";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userInfo, setInfo] = useState({});
    const [erro, setErro] = useState(null);
    const [mostSubscribedEvents, setMostSubscribedEvents] = useState([]);
    const userType = localStorage.getItem('userType');

    useEffect(() => {
        const removeElements = () => {
            const staticBackdrop = document.getElementById("staticBackdrop");
            const modalBackdrop = document.querySelector(".modal-backdrop");
            
            if (staticBackdrop) {
                staticBackdrop.remove();
            }
            
            if (modalBackdrop) {
                modalBackdrop.remove();
            }
        };
        
        setTimeout(removeElements, 1000);
    }, []);
  
    useEffect(() => {
        const userid = localStorage.getItem('userid');
        const email = localStorage.getItem('userEmail');
        const password = localStorage.getItem('userPassword');

        const consult = async () => {
            try {
                const url = `http://localhost:8080/api/users/myAccount?email=${email}&password=${password}`;
                const answer = await fetch(url);
                if (!answer.ok) {
                    throw new Error();
                }
                const data = await answer.json();
                setInfo(data);
            } catch (error) {
                setErro(error.message);
            }
        };

        consult();
    }, []);

    useEffect(() => {
        const fetchMostSubscribedEvents = async () => {
            try {
                const response = await fetch('http://localhost:8080/subscriptions/most-subscribed-events');
                if (response.ok) {
                    const data = await response.json();
                    const eventsArray = Object.keys(data).map(key => ({ title: key, description: key, count: data[key] }));
                    eventsArray.sort((a, b) => b.count - a.count);
                    const top3Events = eventsArray.slice(0, 3);
                    setMostSubscribedEvents(top3Events);
                } else {
                    console.error('Erro ao buscar eventos mais inscritos');
                }
            } catch (error) {
                console.error('Erro ao buscar eventos mais inscritos:', error);
            }
        };

        fetchMostSubscribedEvents();
    }, []);

    const cardVariants = {
        hidden: { opacity: 0 },
        visible: (i) => ({
            opacity: 1,
            transition: {
                delay: i * 0.3,
                duration: 0.5,
            }
        })
    };

    return (
        <>
            <LoggedNavbar />
            <div className="container-bg">
                <div className="container" style={{ minHeight: "80vh" }}>
                    <br /><br />
                    <div className='d-flex justify-content-between'>
                        <h4 style={{ alignSelf: 'end' }} className='text-start'>Eventos mais populares 🔥🔥🔥🔥</h4>
                        <a className="btn btn-lg btn-outline-danger" aria-current="page" href="/events">Eventos disponíveis</a>
                    </div>
                    <hr />
                    <div className="row">
                        <br /><br /><br />
                        <div className="row">
                            {Array.isArray(mostSubscribedEvents) && mostSubscribedEvents.length > 0 ? (
                                mostSubscribedEvents.map((event, index) => (
                                    <div key={index} className="col-12 col-xl-4">
                                        <div className="event-card">
                                            <div className="card" style={{ minWidth: "25rem" }}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{event.title}</h5>
                                                    <p className="card-text">Inscrições: {event.count}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhum evento mais inscrito disponível.</p>
                            )}
                        </div>
                    </div>
                    <br />
                    <hr />
                    <br />

                    <div className="d-flex flex-wrap justify-content-center gap-5 botoesaqui">
                        <motion.div 
                            className="card text-bg-primary mb-3 pe-auto" 
                            style={{ width: '18rem' }} 
                            onClick={() => navigate('/events')}
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="card-body align-content-center">
                                <h5 className="card-title">Eventos disponíveis</h5>
                                <p className="card-text">Confira aqui todos os eventos disponíveis na plataforma!</p>
                            </div>
                        </motion.div>
                        <motion.div 
                            className="card text-bg-danger mb-3 pe-auto" 
                            style={{ width: '18rem' }} 
                            onClick={() => navigate('/myaccount')}
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="card-body align-content-center">
                                <h5 className="card-title">Minha conta</h5>
                                <p className="card-text">Conferir os seus dados.</p>
                            </div>
                        </motion.div>
                        {(userType === 'professor' || userType === 'diretor') && (
                            <motion.div 
                                className="card text-bg-light mb-3 border-3 pe-auto" 
                                style={{ width: '18rem' }} 
                                onClick={() => navigate('/crudevent')}
                                custom={2}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="card-body align-content-center">
                                    <h5 className="card-title">Criar eventos</h5>
                                    <p className="card-text">Está na hora de criar um incrível evento!</p>
                                </div>
                            </motion.div>
                        )}
                        {userType === 'diretor' && (
                            <motion.div 
                                className="card text-bg-dark mb-3 pe-auto" 
                                style={{ width: '18rem' }} 
                                onClick={() => navigate('/myaccountdiretor')}
                                custom={3}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="card-body align-content-center">
                                    <h5 className="card-title">Aprovar eventos</h5>
                                    <p className="card-text">Aprovar ou reprovar eventos na sua unidade.</p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Dashboard;
