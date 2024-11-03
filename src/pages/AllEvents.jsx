import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import LoggedNavbar from './LoggedNavbar';
import CardEvent from '../components/CardEvent';
import Footer from '../components/Footer';

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  return distance; 
}

const AllEvents = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [userid] = useState(localStorage.getItem('userid'));
  const [userName] = useState(localStorage.getItem('userName'));
  const [userType] = useState(localStorage.getItem('userType'));
  const [modalMessage, setModalMessage] = useState('');

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setUserLocation({ lat: latitude, lng: longitude });
  }

  const filterEventsNearby = (radius = 10) => {
    if (!userLocation) return [];

    const eventsWithDistance = allEvents.map(event => {
      const eventLat = parseFloat(event.addressLat);
      const eventLon = parseFloat(event.addressLng);
      const distance = haversineDistance(userLocation.lat, userLocation.lng, eventLat, eventLon);
      return { ...event, distanceFromUser: distance };
    });

    return eventsWithDistance
      .filter(event => event.distanceFromUser <= radius)
      .sort((a, b) => a.distanceFromUser - b.distanceFromUser);
  }

  const handleFilterNearby = () => {
    if (!userLocation) {
      getUserLocation();
    } else {
      const nearbyEvents = filterEventsNearby();
      setFilteredEvents(nearbyEvents);
    }
  }

  const handleFilterAlphabetical = () => {
    const sortedEvents = [...allEvents].sort((a, b) => a.title.localeCompare(b.title));
    setFilteredEvents(sortedEvents);
  }

  const handleFilterByDate = () => {
    const sortedEvents = [...allEvents].sort((a, b) => new Date(a.dateEvent) - new Date(b.dateEvent));
    setFilteredEvents(sortedEvents);
  }

  const handleFilterByCategory = (category) => {
    if (category === "Todos") {
      setFilteredEvents(allEvents);
    } else {
      const filteredByCategory = allEvents.filter(event => event.category === category);
      setFilteredEvents(filteredByCategory);
    }
  }

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/approvedEvents/${userType}`);
        setAllEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching all events', error);
      }
    }
  
    fetchAllEvents();
  }, [userType]);

  useEffect(() => {
    if (userLocation) {
      const nearbyEvents = filterEventsNearby();
      setFilteredEvents(nearbyEvents);
    }
  }, [userLocation]);

  const handleSubscribeToEvent = async (eventId, title, dateEvent, address) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/subscriptions`, null, {
        params: {
          userid,
          userName,
          eventId,
          title,
          dateEvent,
          address
        }
      });
  
      if (response.status === 200) {
        setModalMessage('Inscrição realizada com sucesso!');
      } else if (!userid) {
        setModalMessage("userid não encontrado.");
      } else {
        setModalMessage("Erro ao se inscrever no evento.");
      }
    } catch (error) {
      console.error('Error subscribing to the event', error);
      setModalMessage('Erro ao se inscrever. Por favor, tente novamente.');
    }
  }

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.error("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.error("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
      default:
        console.error("An unknown error occurred.");
        break;
    }
  }

  return (
    <>
      <LoggedNavbar />
      <div className="container-bg">
        <div className="container">
          <div className="d-flex justify-content-center justify-content-lg-start">
            <h3 >Confira os eventos disponíveis</h3>
          </div>
          <br /><br /><br />
          <div className='container'>
            <div className="row justify-content-center">
              <div className="col-sm-12 col-md-6 mb-5">
                <h4>Eventos próximos a mim</h4>
                <p className="text-danger">Para maior precisão, prefira uma rede móvel, e não utilize VPNs.</p>
                <button type='submit' className='btn btn-primary' onClick={handleFilterNearby}>Próximos a mim</button>
              </div>
              <div className="col-sm-12 col-md-6 mb-5">
                <h4>Filtrar por: </h4>
                <div className="d-flex gap-2 justify-content-center">
                  <button type='submit' className='btn btn-primary' onClick={handleFilterAlphabetical}>Alfabética</button>
                  <button type='submit' className='btn btn-primary' onClick={handleFilterByDate}>Data</button>
                </div>
                <div className="row mt-3 justify-content-center">
                  <div className="col-8">
                    <label htmlFor="filtroCategoria">Filtrar por categoria: </label>
                    <select onChange={(e) => handleFilterByCategory(e.target.value)} className="form-select">
                      <option value="Todos">Todas categorias</option>
                      <option value="financas">Finanças</option>
                      <option value="tecnologia">Tecnologia</option>
                      <option value="comunicacao">Comunicação</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className='col-12 col-sm-6 col-md-4 mb-3'
                  >
                    <CardEvent 
                      eventTitle={event.title}
                      eventDescription={event.description}
                      eventCategory={event.category}
                      eventAddress={event.address}
                      eventDate={event.dateEvent}
                      distance={event.distanceFromUser}
                      cargaHora={event.cargaHoraria} 
                      dateEndEvent={event.dateEndEvent}
                      vagas={event.vagas}
                      bannerImage={event.bannerImage}
                      onSubscribe={() => handleSubscribeToEvent(event.id, event.title, event.dateEvent, event.address)} 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <div className="modal fade" id="modalInscricao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              {modalMessage}
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllEvents;
