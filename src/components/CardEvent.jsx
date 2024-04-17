import React from 'react'

const CardEvent = ({ eventTitle, eventDescription, eventCategory, cargaHora,eventAddress, eventDate, distance, onSubscribe}) => {

  return (
    <div className="card text-start" style={{ width: "100%" }}>
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

        <span>Localização: </span>
        <span>{eventAddress}</span>
        <span>Distância: {typeof distance === 'number' ? distance.toFixed(2) : 'N/A'} km</span>
        <input type="datetime-local" value={eventDate} disabled />
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