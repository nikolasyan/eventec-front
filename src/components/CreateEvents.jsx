import React, { useState } from 'react';
import axios from 'axios';

const CreateEvents = () => {
  const [title, setTitle] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [dateEvent, setDateEvent] = useState('');
  const [abertoPublico, setAbertoPublico] = useState(false);
  const [addressLat, setAddressLat] = useState(null);
  const [addressLng, setAddressLng] = useState(null);
  const [dateEndEvent, setDateEndEvent] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [error, setError] = useState('');
  const [preRequisitos, setPreRequisitos] = useState('');
  const [vagas, setVagas] = useState('');
  const [locationEvent, setLocationEvent] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para controlar o modal de sucesso

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

    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('address', address);
    formData.append('addressLat', addressLat);
    formData.append('addressLng', addressLng);
    formData.append('dateEvent', dateEvent);
    formData.append('dateEndEvent', dateEndEvent);
    if (bannerImage) {
      formData.append('bannerImage', bannerImage);
    }
    formData.append('cargaHoraria', cargaHoraria);
    formData.append('abertoPublico', abertoPublico);
    formData.append('userEmail', userEmail);
    formData.append('userPassword', userPassword);
    formData.append('preRequisitos', preRequisitos);
    formData.append('vagas', vagas);
    formData.append('locationEvent', locationEvent);

    try {
      const response = await axios.post('http://localhost:8080/event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Registration Successful', response.data);
      setShowSuccessModal(true); // Mostrar o modal de sucesso
    } catch (error) {
      console.error('There was an error registering!', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
    }
  };

  const handleCloseSuccessModal = () => setShowSuccessModal(false); // Função para fechar o modal de sucesso

  return (
    <>
      <form onSubmit={handleFormEventSubmit} className="d-grid gap-3">
        <h4>Crie um novo evento</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <input type="text" className="form-control" id="title" placeholder="Digite o título do seu evento" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="form-group">
          <textarea className="form-control" id="description" rows="3" placeholder="Digite a descrição do seu evento" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>

        <div className="form-group">
          <select className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="" disabled>Qual é a categoria do seu evento?</option>
            <option value="tecnologia">Tecnologia</option>
            <option value="financas">Finanças</option>
            <option value="comunicacao">Comunicação</option>
          </select>
        </div>

        <div className="row">
          <div className="col-6 form-group">
            <label htmlFor="dateEvent">Inicio do evento</label>
            <input type="datetime-local" className="form-control" id="dateEvent" value={dateEvent} onChange={(e) => setDateEvent(e.target.value)} required />
          </div>
          <div className="col-6 openEventInput">
            <div className="form-check form-switch open">
              <input className="form-check-input" type="checkbox" style={{marginTop: 27}} id="flexSwitchCheckDefault" checked={abertoPublico} onChange={(e) => setAbertoPublico(e.target.checked)} />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{marginTop: 22}} id='abertoPublico'>Evento aberto ao público geral?</label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-4 form-group">
            <label htmlFor="dateEndEvent">Encerramento do evento</label>
            <input type="datetime-local" className="form-control" id="dateEndEvent" value={dateEndEvent} onChange={(e) => setDateEndEvent(e.target.value)} required />
          </div>

          <div className="col-4 form-group">
          <label htmlFor="cargaHoraria">Carga horária</label>
          <input type="number" className="form-control" id="cargaHoraria" placeholder="Digite a carga horária" value={cargaHoraria} onChange={(e) => setCargaHoraria(e.target.value)} required />
          </div>
          
          <div className="col-4 form-group">
          <label htmlFor="vagas">Número de vagas</label>
          <input type="number" className="form-control" id="vagas" placeholder="Digite o número de vagas" value={vagas} onChange={(e) => setVagas(e.target.value)} required />
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <textarea className="form-control" id="preRequisitos" rows="3" placeholder="Digite os requisitos para ingressar no evento" value={preRequisitos} onChange={(e) => setPreRequisitos(e.target.value)} required></textarea>
          </div>
        </div>

        <div className="row">
          <label htmlFor="bannerImage" className="mb-1">Banner do evento</label>
          <div className="input-group mb-3 mt-1">
            <input type="file" className="form-control" id="bannerImage" onChange={(e) => setBannerImage(e.target.files[0])} required/>
          </div>
        </div>

        <div className="form-group">
          <div className="form-floating">
            <select className="form-select" id="floatingSelect" aria-label="modalidade">
              <option value="remoto" selected>Remoto</option>
              <option value="presencial" disabled>Presencial (em breve!)</option>
            </select>
            <label htmlFor="floatingSelect">Escolha a modalidade</label>
          </div>
        </div>

        <div className="form-group" style={{maxHeight: '60px'}}>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="locationEvent" placeholder="Link da reunião" value={locationEvent} onChange={(e) => setLocationEvent(e.target.value)} required />
            <label htmlFor="floatingInput">Link da reunião do evento (Teams, Zoom etc.)</label>
          </div>
        </div>

        <div className="form-group">
          <select className="form-control" id="address" value={address} onChange={handleAddressChange} required>
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
          <button type="submit" className="col-4 btn btn-primary">Enviar</button>
        </div>
      </form>

      <div className={`modal fade ${showSuccessModal ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showSuccessModal} style={showSuccessModal ? {display: 'block'} : {}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Sucesso</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseSuccessModal}></button>
            </div>
            <div className="modal-body">
              Evento criado com sucesso!
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseSuccessModal}>Fechar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateEvents;
