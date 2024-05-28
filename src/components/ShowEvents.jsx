import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowEvents = () => {
    const [events, setEvents] = useState([]);
    const [editingEventId, setEditingEventId] = useState(null);
    const [editedEventDate, setEditedEventDate] = useState('');
    const [editedEndEventDate, setEditedEndEventDate] = useState('');
    const [eventUsers, setEventUsers] = useState([]);
    const [currentEventId, setCurrentEventId] = useState(null);

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        const userPassword = localStorage.getItem('userPassword');
        

        axios.get(`http://localhost:8080/myEvents?email=${userEmail}&password=${userPassword}`)
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar eventos:", error);
            });
    }, []);

    const deleteEvent = (eventId) => {
        axios.delete(`http://localhost:8080/event/${eventId}`)
            .then(response => {
                setEvents(events.filter(event => event.id !== eventId));
            })
            .catch(error => {
                console.error("Erro ao excluir evento:", error);
                alert("Erro ao excluir o evento. Por favor, tente novamente.");
            });
    };

    const startEditing = (eventId, eventDate, endEventDate) => {
        setEditingEventId(eventId);
        setEditedEventDate(eventDate);
        setEditedEndEventDate(endEventDate);
    };

    const fetchEventUsers = (eventId) => {
        axios.get(`http://localhost:8080/eventUsers/${eventId}`)
            .then(response => {
                setCurrentEventId(eventId);
                setEventUsers(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar usuários do evento:", error);
            });
    };

    const generateCertificates = (eventId) => {
        const selectedUsers = [];
        const professorName = localStorage.getItem('userName');
        const userid = localStorage.getItem('userid');
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            selectedUsers.push(Number(checkbox.value));
        });
    
        if (selectedUsers.length === 0) {
            alert('Selecione pelo menos 1 usuário');
            return;
        }
    
        axios.post(`http://localhost:8080/api/certifications/generate/${eventId}?professorName=${professorName}&userid=${userid}`, selectedUsers)
        .then(response => {
            alert("Certificados gerados com sucesso!");
        })
        .catch(error => {
            console.error("Erro ao gerar certificados:", error);
        });
    }

    const saveEditedEvent = () => {
        axios.put(`http://localhost:8080/eventEdit/${editingEventId}`, { dateEvent: editedEventDate, dateEndEvent: editedEndEventDate })
            .then(response => {
                setEvents(events.map(event => {
                    if (event.id === editingEventId) {
                        return { ...event, dateEvent: editedEventDate, dateEndEvent: editedEndEventDate };
                    }
                    return event;
                }));
                setEditingEventId(null);
            })
            .catch(error => {
                console.error("Erro ao editar evento:", error);
                alert("Erro ao editar o evento. Por favor, tente novamente.");
            });
    };

    return (
        <div className="container">
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Concluir evento e enviar certificados</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p className="text-danger">Apenas envie certificados para pessoas que participaram do evento.</p>
                            {eventUsers.map(user => (
                                <div key={user.id} className="input-group mb-3">
                                    <div className="input-group-text">
                                        <input className="form-check-input mt-0" type="checkbox" value={user.user.userid} aria-label="Checkbox for following text input" />
                                    </div>
                                    <input type="text" className="form-control d-none" value={user.user.userid} aria-label="Text input with checkbox" disabled />
                                    <input type="text" className="form-control" value={user.user.userName} aria-label="Text input with checkbox" disabled />
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={() => generateCertificates(currentEventId)}>Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>

            <h4>Esses são os seus eventos criados:</h4>
            <div className="accordion" id="accordionExample">
                {events.map(event => (
                    <div key={event.id} className="accordion-item">
                        <h2 className="accordion-header" id={`heading${event.id}`}>
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${event.id}`} aria-expanded={event.id === events[0].id} aria-controls={`collapse${event.id}`}>
                                {event.title}
                            </button>
                        </h2>
                        <div id={`collapse${event.id}`} className={`accordion-collapse collapse ${event.id === events[0].id ? 'show' : ''}`} aria-labelledby={`heading${event.id}`} data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className="row d-grid gap-3">
                                    <div className="col-12">
                                        <label htmlFor="descricao">Descrição</label>
                                        <textarea className="form-control" id="description" rows="3" placeholder="Digite a descrição" value={event.description} disabled></textarea>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="categoria">Categoria</label>
                                        <select className="form-control" id="category" value={event.category} disabled>
                                            <option value="tecnologia">Tecnologia</option>
                                            <option value="financas">Finanças</option>
                                            <option value="comunicacao">Comunicação</option>
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 form-group">
                                            <label htmlFor="data">Inicio do evento</label>
                                            {editingEventId === event.id ? (
                                                <input type="datetime-local" className="form-control" id="data" value={editedEventDate} onChange={(e) => setEditedEventDate(e.target.value)} />
                                            ) : (
                                                <input type="datetime-local" className="form-control" id="data" value={event.dateEvent} disabled />
                                            )}
                                        </div>
                                        <div className="col-6 openEventInput">
                                            <div className="form-check form-switch openEventInput">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" disabled />
                                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Aberto ao público?</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5 form-group">
                                            <label htmlFor="data">Fim do evento</label>
                                            {editingEventId === event.id ? (
                                                <input type="datetime-local" className="form-control" id="data" value={editedEndEventDate} onChange={(e) => setEditedEndEventDate(e.target.value)} />
                                            ) : (
                                                <input type="datetime-local" className="form-control" id="dateEndEvent" value={event.dateEndEvent} disabled />
                                            )}
                                        </div>
                                        <div className="col-4 form-group">
                                            <label htmlFor="data">Carga Horária</label>
                                            <input type="number" className="form-control" id="cargaHoraria" value={event.cargaHoraria} disabled />
                                        </div>
                                        <div className="col-3 form-group">
                                            <label htmlFor="data">Nº de vagas</label>
                                            <input type="number" className="form-control" id="vagas" value={event.vagas} disabled />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="descricao">Requisitos do evento</label>
                                        <textarea className="form-control" id="preRequisitos" rows="3" placeholder="Requisitos do evento" value={event.preRequisitos} disabled></textarea>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="endereço">Modalidade</label>
                                        <select type="text" className="form-control" id="modalidade" value={event.modalidade} disabled>
                                            <option value="Remoto">Remoto</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="endereço">Link da reunião</label>
                                        <input type="text" className="form-control" value={event.locationEvent} disabled />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="endereço">Endereço</label>
                                        <select type="text" className="form-control" id="address" value={event.address} disabled>
                                            <option value="Fatec Diadema - Luigi Papaiz - Endereço: Av. Luiz Merenda, 443 - Campanário, Diadema - SP, 09931-390">Fatec Diadema - Luigi Papaiz - Endereço: Av. Luiz Merenda, 443 - Campanário, Diadema - SP, 09931-390</option>
                                            <option value="Fatec São Bernardo do Campo – Adib Moises Dib - Endereço: Av. Pereira Barreto, 400 - Vila Baeta Neves - Centro, São Bernardo do Campo - SP, 09751-000">Fatec São Bernardo do Campo – Adib Moises Dib - Endereço: Av. Pereira Barreto, 400 - Vila Baeta Neves - Centro, São Bernardo do Campo - SP, 09751-000</option>
                                        </select>
                                    </div>
                                    <div className="row justify-content-center">
                                        {editingEventId === event.id ? (
                                            <>
                                                <div className="col-3">
                                                    <button className="btn btn-success" onClick={saveEditedEvent}>Salvar</button>
                                                </div>
                                                <div className="col-3">
                                                    <button className="btn btn-secondary" onClick={() => setEditingEventId(null)}>Cancelar</button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="col-3">
                                                <button className="btn btn-primary" onClick={() => startEditing(event.id, event.dateEvent, event.dateEndEvent)}>Editar</button>
                                            </div>
                                        )}
                                        <div className="col-3">
                                            <button className="btn btn-danger" onClick={() => deleteEvent(event.id)}>Deletar</button>
                                        </div>
                                        <div className="col-3">
                                            <button className="btn btn-success" onClick={() => fetchEventUsers(event.id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Concluir</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowEvents;