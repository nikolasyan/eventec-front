import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import LoggedNavbar from './LoggedNavbar';

const DiretorMyAccount = () => {

    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');

    console.log('userEmail:', userEmail);
    console.log('userPassword:', userPassword);

    const [pendingEventsData, setPendingEventsData] = useState([]);
    const [approvedEventsData, setApprovedEventsData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/pendingEvents', {
            params: {
                email: userEmail,
                password: userPassword
            }
        })
            .then(response => {
                setPendingEventsData(response.data);
            })
            .catch(error => {
                console.error("Error:", error.response.data);
            });


        axios.get('http://localhost:8080/approvedEvents')
            .then(response => {
                setApprovedEventsData(response.data);
            })
            .catch(error => {
                console.error("Error fetching approved events", error);
            });
    }, []);

    const handleApprove = (eventId) => {
        axios.put(`http://localhost:8080/approveEvent/${eventId}?email=${userEmail}&password=${userPassword}`)
            .then(response => {
                setPendingEventsData(prevEvents => prevEvents.filter(event => event.id !== eventId));
            })
            .catch(error => {
                console.error("Error approving event", error);
            });
    };

    const renderEvent = (event) => (
        <div className="card text-start" style={{ width: "100%" }}>
            <div className="card-body">
                <h4 className="card-title">{event.title}</h4>
                <p className="card-text">{event.description}</p>
                <div className="d-flex">
                    <p>Categoria: </p>
                    <span>{event.category}</span>
                </div>

                <span>Localização: </span>
                <span>{event.address}</span>
                <br />
                <span>Data e horário: </span>
                <input type="datetime-local" value={event.date} disabled />
                <br />
            </div>
        </div>
    );
    if (localStorage.userType === "professor" || localStorage.userType === "diretor") {
    return (
        <><LoggedNavbar/>
        <div className="container-bg">
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-6">
                        <h2>Eventos para aprovar:</h2>
                        {pendingEventsData.map((event, index) => (
                            <div key={event.id}>
                                {renderEvent(event)}
                                <div className="container eventDecision">
                                <div className="d-flex justify-content-between mb-3">
                                    <button className='btn btn-danger'>Reprovar</button>
                                    <button className='btn btn-success' onClick={() => handleApprove(event.id)}>Aprovar</button>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div></div>
            <Footer />
        </>
    );
} else {
    return (
      <h1 className='align-middle'>ACESSO NEGADO</h1>
    )
  }
}

export default DiretorMyAccount;
