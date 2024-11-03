import React from 'react';

const EventDetailsModal = ({ eventTitle, eventDescription, eventCategory, cargaHora, eventAddress, eventDate, dateEndEvent, distance, vagas, onSubscribe, onClose }) => {
  return (
    <div className="modal show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{eventTitle}</h1>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body text-start">
            <strong>Descrição:</strong> {eventDescription}
            <div><strong>Categoria:</strong> {eventCategory}</div>
            <div><strong>Carga horária:</strong> {cargaHora} horas</div>
            <div><strong>Localização:</strong> {eventAddress}</div>
            <div><strong>Distância:</strong> {typeof distance === 'number' ? distance.toFixed(2) : 'N/A'} km</div>
            <div><strong>Início do evento:</strong> {eventDate}</div>
            <div><strong>Fim do evento:</strong> {dateEndEvent}</div>
            <div><strong>Modalidade:</strong> Remoto</div>
            <div><strong>Número de vagas:</strong> {vagas}</div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Fechar</button>
            <button type="button" className="btn btn-primary" onClick={onSubscribe}>
              Inscrever-se
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
