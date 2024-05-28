import React from 'react';

const CardEvent = ({ eventTitle, eventDescription, eventCategory, cargaHora, eventAddress, eventDate, distance, onSubscribe, dateEndEvent, vagas, bannerImage }) => {

  return (
    <div className="card text-start" style={{ maxWidth: "400px" }}>
      <img src={`data:image/jpeg;base64,${bannerImage}`} className="card-img-top" alt="banner" style={{ maxHeight: "200px", width: "100%"}} />
      <div className="card-body cardEvent">
        <h4 className="card-title">{eventTitle}</h4>
        <strong className="card-text">{eventDescription}</strong>
        <div className="d-flex">
          <strong>Categoria: </strong>
          <span>{eventCategory}</span>
        </div>
        <div className="d-flex">
          <strong>Carga horária:</strong>
          <span> {cargaHora} horas</span>
        </div>
        <span><strong>Localização: </strong></span>
        <span>{eventAddress}</span>
        <span><strong>Distância: </strong>{typeof distance === 'number' ? distance.toFixed(2) : 'N/A'} km</span>
        <span><strong>Inicio do evento:</strong> <input type="datetime-local" value={eventDate} disabled /></span>
        <span><strong>Fim do evento:</strong> <input type="datetime-local" value={dateEndEvent} disabled /></span>
        <span><strong>Modalidade:</strong> Remoto</span>
        <span><strong>Número de vagas:</strong> {vagas}</span>
        <br />
        <button className="btn btn-primary" onClick={(e) => {
            e.preventDefault(); // Evitar a ação padrão do link
            onSubscribe(); // Chamar a função passada como prop
          }}>
            Inscrever-se
        </button>
      </div>
    </div>
  );
};

export default CardEvent;
