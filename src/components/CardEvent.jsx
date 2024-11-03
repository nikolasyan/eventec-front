import React, { useState } from 'react';
import EventDetailsModal from './EventDetailsModal';

const CardEvent = ({ eventTitle, eventDescription, eventCategory, cargaHora, eventAddress, eventDate, distance, dateEndEvent, vagas, bannerImage, onSubscribe }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="card text-start w-100 h-100">
        <img src={`data:image/jpeg;base64,${bannerImage}`} className="card-img-top h-50" alt="banner" style={{ width: "100%" }} />
        <div className="card-body cardEvent flex-col justify-content-end">
          <h4 className="card-title h-100">{eventTitle}</h4>
          <div className="d-flex">
            <strong>Categoria: </strong>
            <span>{eventCategory}</span>
            <span className='d-none'><strong>Distância: </strong>{typeof distance === 'number' ? distance.toFixed(2) : 'N/A'} km</span>
          </div>
          <button type="button" className="btn btn-primary mt-3" onClick={handleOpenModal}>
            Ver mais
          </button>
        </div>
      </div>

      {/* Modal para o evento atual */}
      {showModal && (
        <EventDetailsModal
          eventTitle={eventTitle}
          eventDescription={eventDescription}
          eventCategory={eventCategory}
          cargaHora={cargaHora}
          eventAddress={eventAddress}
          eventDate={eventDate}
          dateEndEvent={dateEndEvent}
          distance={distance}
          vagas={vagas}
          onSubscribe={onSubscribe}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default CardEvent;
