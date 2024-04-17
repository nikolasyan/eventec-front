import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [userid] = useState(localStorage.getItem('userid'));
  const [userName] = useState(localStorage.getItem('userName'));
  const [userEmail] = useState(localStorage.getItem('userEmail'));
  const [userType] = useState(localStorage.getItem('userType'));


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
      setAllEvents(nearbyEvents);
    }
  }

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/approvedEvents/${userType}`);
        console.log(response.data); 
        setAllEvents(response.data);
      } catch (error) {
        console.error('Error fetching all events', error);
      }
    }
  
    fetchAllEvents();
  }, [userType]);
  
  
  useEffect(() => {
    if (userLocation) {
      const nearbyEvents = filterEventsNearby();
      setAllEvents(nearbyEvents);
    }
  }, [userLocation]);
  
  const handleSubscribeToEvent = async (eventId, title, dateEvent, address) => {
    try {
      const response = await axios.post('http://localhost:8080/subscriptions', null, {
        params: {
          userid,
          userName,
          eventId,title, dateEvent, address
        }
      });
  
      if (response.status === 200) {
        alert(response.data);
      } else if (!userid) {
        console.error("userid não encontrado.");
      } else{
        console.error("Erro ao se inscrever no evento.");
      }
    } catch (error) {
      console.error('Error subscribing to the event', error);
      alert('Erro ao se inscrever. Por favor, tente novamente.');
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
        <div className="d-flex justify-content-">
          <h3>Confira os eventos disponíveis</h3>
        </div>
      
      <br /><br /><br />
      <div className='container'>
        <div className="row">
          <div className="col-3">
            <h4>Eventos próximos a mim</h4>
            <p class="text-danger">Para maior precisão, prefira uma rede móvel, e não utilize VPNs.</p>
            <button type='submit' className='btn btn-primary' onClick={handleFilterNearby}>Próximos a mim</button>

          </div>
          <div className="col-9 d-grid gap-4">
            {allEvents.map(event => (
              <CardEvent 
                key={event.id}
                eventTitle={event.title}
                eventDescription={event.description}
                eventCategory={event.category}
                eventAddress={event.address}
                eventDate={event.dateEvent}
                distance={event.distanceFromUser}
                cargaHora={event.cargaHoraria} 
                onSubscribe={() => handleSubscribeToEvent(event.id)} 
              />
            ))}
          </div>
        </div>
      </div>
      </div>
      <Footer/></div></>
  )
}

export default AllEvents;
