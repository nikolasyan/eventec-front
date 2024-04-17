import React, { useState } from 'react';
import axios from 'axios';

const CreateEvents = () => {

  const [title, setTitle] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [dateEvent, setDateEvent] = useState('');
  const [abertoPublico, setAbertoPublico] = useState('');
  const [addressLat, setAddressLat] = useState(null);
  const [addressLng, setAddressLng] = useState(null);

  const addressCoordinates = {
    "Fatec Diadema - Luigi Papaiz - Endereço: Av. Luiz Merenda, 443 - Campanário, Diadema - SP, 09931-390": {
      lat: "-23.673137600203077",
      lng: "-46.618749338635425"
    },
  };

  const handleAddressChange = (e) => {
    const selectedAddress = e.target.value;
    setAddress(selectedAddress);

    const coords = addressCoordinates[selectedAddress];
    if (coords) {
      setAddressLat(coords.lat);
      setAddressLng(coords.lng);
    }
  };

  const handleFormEventSubmit = async (event) => {
    event.preventDefault();

    const userid = localStorage.getItem('userid')
    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');

    try {
      const response = await axios.post('http://localhost:8080/event', {
        title,
        description,
        category,
        address,
        addressLat,
        addressLng,
        dateEvent,
        cargaHoraria,
        user: {
          email: userEmail,
          password: userPassword
        },
        abertoPublico
      });
      console.log('Registration Successful', response.data);
      //location.reload()
    } catch (error) {
      console.error('There was an error registering!', error);
    }
  }

  return (
    <>
      <form action="" className="d-grid gap-3">
        <h4>Crie um novo evento</h4>
        <div className="form-group">
          <input type="text" className="form-control" id="title" placeholder="Digite o título do seu evento" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="form-group">
          <textarea className="form-control" id="description" rows="3" placeholder="Digite a descrição do seu evento" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>

        <div className="form-group">
          <select className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>Qual é a categoria do seu evento?</option>
            <option value="tecnologia">Tecnologia</option>
            <option value="financas">Finanças</option>
            <option value="comunicacao">Comunicação</option>
          </select>
        </div>

        <div className="row">
          <div className="col-6 form-group">
            <label htmlFor="data">Data e hora do evento</label>
            <input type="datetime-local" className="form-control" id="data" value={dateEvent} onChange={(e) => setDateEvent(e.target.value)} />
          </div>
          <div className="col-6 openEventInput">
            <div className="form-check form-switch open">
              <input className="form-check-input" type="checkbox" style={{marginTop: 27}} id="flexSwitchCheckDefault" checked={abertoPublico} onChange={(e) => setAbertoPublico(e.target.checked)} />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{marginTop: 22}} id='abertoPublico'>Evento aberto ao público geral?</label>
            </div>
          </div>
        </div>

        <div className="form-group">

        <div className="form-group">
          <input type="number" className="form-control" id="title" placeholder="Digite a carga horária" value={cargaHoraria} onChange={(e) => setCargaHoraria(e.target.value)} />
        </div>
        </div>

        <div className="form-group">
          <div class="form-floating">
            <select class="form-select" id="floatingSelect" aria-label="modalidade">
              <option value="" disabled selected>Escolha uma modalidade</option>
              <option value="remoto" disabled>Presencial (em breve!)</option>
              <option value="evento">Remoto</option>
            </select>
            <label for="floatingSelect">Escolha a modalidade</label>
          </div>
        </div>

        <div className="form-group" style={{maxHeight: '60px'}}>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="linkReuniao" placeholder="Link da reunião" />
            <label for="floatingInput">Link da reunião do evento (Teams, Zoom etc.)</label>
          </div>
        </div>

        <div className="form-group">
          <select type="text" className="form-control" id="address" value={address} onChange={handleAddressChange}>
            <option value="" disabled>Selecione a Fatec onde será realizado o evento</option>
            <option value="Fatec Diadema - Luigi Papaiz - Endereço: Av. Luiz Merenda, 443 - Campanário, Diadema - SP, 09931-390">
              Fatec Diadema - Luigi Papaiz - Endereço: Av. Luiz Merenda, 443 - Campanário, Diadema - SP, 09931-390
            </option>
            <option value="" disabled>
              Não encontrou sua Fatec na lista? Fale com o seu diretor sobre a implantação do Eventec na sua Fatec!
            </option>
          </select>
        </div>
        <br />
        <div className="row justify-content-center">
          <button type="submit" className="col-4 btn btn-primary" onClick={handleFormEventSubmit}>Enviar</button>
        </div>
      </form>
    </>
  );
}

export default CreateEvents;
