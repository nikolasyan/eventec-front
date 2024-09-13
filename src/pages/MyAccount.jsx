import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import "./myAccount.css";
import { useHistory } from 'react-router-dom';  // Substituímos useNavigate por useHistory
import LoggedNavbar from './LoggedNavbar';
import profileIcon from "../assets/profileIcon.png"

const MyAccount = () => {
  const history = useHistory();  // Substituímos navigate por history
  const [userInfo, setInfo] = useState({});
  const [erro, setErro] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [mostSubscribedEvents, setMostSubscribedEvents] = useState([]);

  const [userid] = useState('');
  localStorage.setItem('userid', userInfo.userid);
  localStorage.setItem('userName', userInfo.userName);
  localStorage.setItem('userType', userInfo.userType);
  localStorage.setItem('emailValidationType', userInfo.emailValidationType);

  const handleChangePassword = async () => {
    const currentPasswordInput = document.getElementById('currentPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmNewPasswordInput = document.getElementById('confirmNewPassword');

    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmNewPassword = confirmNewPasswordInput.value;

    if (newPassword !== confirmNewPassword) {
      setChangePasswordError('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/changePassword?email=${userInfo.email}&currentPassword=${currentPassword}&newPassword=${newPassword}`, {
        method: 'POST',
      });

      if (response.ok) {
        setCurrentPassword('');
        setNewPassword('');
        confirmNewPasswordInput.value = '';
        setChangePasswordError(null);
        console.log("Senha trocada com sucesso! Favor fazer login novamente");
        window.location.href = '/signinup';
      } else {
        setChangePasswordError('Senha atual incorreta');
      }
    } catch (error) {
      console.error('Erro ao trocar a senha:', error);
      setChangePasswordError('Erro ao trocar a senha');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/deleteAccount?email=${userInfo.email}&password=${userInfo.password}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log("Excluído com sucesso");
        history.push('/');  // Substituímos navigate por history.push
      } else {
        console.log("nada a exibir aqui.");
      }
    } catch (error) {
      console.error('Erro ao excluir a conta:', error);
    }
  };

  useEffect(() => {
    const userid = localStorage.getItem('userid');
    const email = localStorage.getItem('userEmail');
    const password = localStorage.getItem('userPassword');

    const consult = async () => {
      try {
        const url = `http://localhost:8080/api/users/myAccount?email=${email}&password=${password}`;
        const answer = await fetch(url);
        if (!answer.ok) {
          throw new Error();
        }
        const data = await answer.json();
        setInfo(data);
      } catch (error) {
        setErro(error.message);
      }
    };

    consult();
  }, []);

  useEffect(() => {
    const fetchMostSubscribedEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/subscriptions/most-subscribed-events');
        if (response.ok) {
          const data = await response.json();
          const eventsArray = Object.keys(data).map(key => ({ title: key, description: key, count: data[key] }));
          eventsArray.sort((a, b) => b.count - a.count);
          const top3Events = eventsArray.slice(0, 3);
          setMostSubscribedEvents(top3Events);
        } else {
          console.error('Erro ao buscar eventos mais inscritos');
        }
      } catch (error) {
        console.error('Erro ao buscar eventos mais inscritos:', error);
      }
    };

    fetchMostSubscribedEvents();
  }, []);

  return (
    <><LoggedNavbar /><>
      <div className="container-bg">
        <div className="container" style={{ minHeight: "80vh" }}>
          <br /><br />
          <div className='d-flex justify-content-between'>
            <h4 style={{ alignSelf: 'end' }} className='text-start'>Eventos mais populares 🔥🔥🔥🔥</h4>
            <a className="btn btn-lg btn-outline-danger" aria-current="page" href="/events">Eventos disponiveis</a>
          </div>
          <hr />
          <div className="row">
            <br /><br /><br />
            <div className="row">
              {Array.isArray(mostSubscribedEvents) && mostSubscribedEvents.length > 0 ? (
                mostSubscribedEvents.map((event, index) => (
                  <div key={index} className="col-12 col-xl-4">
                    <div className="event-card">
                      <div className="card" style={{ minWidth: "25rem" }}>
                        <div className="card-body">
                          <h5 className="card-title">{event.title}</h5>
                          <p className="card-text">Inscrições: {event.count}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Nenhum evento mais inscrito disponível.</p>
              )}
            </div>
          </div>
          <br />
          <hr />
          <br />
          <div className="row justify-content-start gap-5 ">
            <div className="col-lg-6 col-xl-3 myAccountBox">

              <div className="d-flex align-items-center flex-column justify-content-between menuContainer">
                <div className="">
                  <img src={profileIcon} className="img-thumbnail" style={{ maxWidth: "50%" }} />
                  <br /><br />
                  <h5>Olá, {userInfo?.userName || 'Nome não disponível'}! </h5>
                </div>
                <div className="d-grid gap-3">
                  <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#changePassword">
                    Trocar de senha
                  </button>

                  <button type='submit' className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#deleteAccount">
                    EXCLUIR CONTA
                  </button>
                </div>
              </div>

            </div>

            <div className='col-lg-6 col-xl-4 myAccountBox'>
              <div className="modal fade" id="changePassword" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Troca de senha</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <label className='form-label'>Confirmar Senha Atual:</label>
                        <input className='form-control' type='password' id='currentPassword' />

                        <label className='form-label'>Nova Senha:</label>
                        <input className='form-control' type='password' id='newPassword' />

                        <label className='form-label'>Confirmar Nova Senha:</label>
                        <input className='form-control' type='password' id='confirmNewPassword' />                    
                      </form>

                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                      <button type='submit' className="changePasswordBtn btn btn-primary" onClick={handleChangePassword}>Salvar</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="deleteAccount" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Excluir conta</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <h3>Deseja realmente excluir a conta?</h3>
                      <br />
                      <button type='submit' className='btn btn-outline-danger' data-bs-toggle="modal" data-bs-target="#deleteAccount" onClick={handleDeleteAccount}>
                        Quero excluir a conta.
                      </button>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='d-flex justify-content-between'>
                <h5 className='d-none'>{userInfo.userid}</h5>
              </div>
              <form className='formContainer'>
                <div className="form-floating mb-3">
                  <input className='form-control' type="text" placeholder='Nome' value={userInfo?.userName || ''} disabled />
                  <label className='form-label'>Nome:</label>
                </div>

                <div className="form-floating mb-3">
                  <input className='form-control' type="text" value={userInfo?.email || ''} placeholder='E-mail' disabled />
                  <label className='form-label'>E-Mail:</label>
                </div>

                <div className="form-floating mb-3">
                  <input className='form-control' type="text" placeholder='CPF' value={userInfo?.cpf || ''} disabled />
                  <label className='form-label'>CPF:</label>
                </div>

                <div className={`form-floating mb-3 ${!userInfo.emailInstitucional ? 'd-none' : ''}`}>
                  <input className='form-control' type="text" placeholder='E-mail Institucional' value={userInfo?.emailInstitucional || 'N/A'} disabled />
                  <label className='form-label'>E-Mail Institucional:</label>
                </div>

                <div className={`form-floating mb-3 ${!userInfo.ra ? 'd-none' : ''}`}>
                  <input className='form-control' type="text" value={userInfo?.ra || 'N/A'} placeholder='RA' disabled />
                  <label className='form-label'>RA:</label>
                </div>

                <div className={`form-floating mb-3 ${!userInfo.semestre ? 'd-none' : ''}`}>
                  <input className='form-control' type="text" value={userInfo?.semestre || 'N/A'} placeholder='Semestre' disabled />
                  <label className='form-label'>Semestre:</label>
                </div>

                <div className={`form-floating mb-3 ${!userInfo.unidade ? 'd-none' : ''}`}>
                  <input className='form-control' type="text" value={userInfo?.unidade || 'N/A'} placeholder='Instituição de Ensino' disabled />
                  <label className='form-label'>Instituição de Ensino:</label>            
                </div>

                <div className={`form-floating mb-3 ${!userInfo.curso ? 'd-none' : ''}`}>
                  <input className='form-control' type="text" value={userInfo?.curso || 'N/A'} placeholder='Curso' disabled />
                  <label className='form-label'>Curso:</label>
                </div>

                <div className="form-floating mb-3">
                  <input className='form-control' type="password" value={userInfo?.password || ''} disabled />
                  <label className='form-label'>Senha:</label>
                </div>

              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div></>
    </>
  );
}

export default MyAccount;
