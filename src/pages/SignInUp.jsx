import React, { useState } from 'react';
import axios from 'axios';
import LogoImg from '../static/Logo.svg';
import { useNavigate } from 'react-router-dom';
import SignUpAluno from '../components/SignUpAluno';
import SignUpProfessor from '../components/SignUpProfessor';
import SignUpBasicInfo from '../components/SignUpBasicInfo';
import SignUpDiretor from '../components/SignUpDiretor';
// import SignUpAddress from '../components/SignUpAddress';

const SignInUp = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState('Cadastrar');
  const [userName, setUserName] = useState('');
  const [cpf, setCpf] = useState('');
  const [emailInstitucional, setEmailInstitucional] = useState('');
  const [ra, setRA] = useState('');
  const [semestre, setSemestre] = useState('');
  const [instituicao] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('usuarioComum');
  const [unidade, setUnidade] = useState('');
  const [curso, setCurso] = useState('');
  const [showModalContent, setShowModalContent] = useState(false);
  const [userid] = useState('');

  const [zipCode, setZipcode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function refreshPage() {
    localStorage.clear();
    window.location.reload(false);
  }
  const handleZipCodeChange = async (cepValue) => {
    setZipcode(cepValue);

    if (cepValue.length === 8) {
      try {
        const response = await axios.get(`http://localhost:8080/api/endereco/${cepValue}`);
        const enderecoData = response.data;

        if (enderecoData) {
          setState(enderecoData.state || '');
          setCity(enderecoData.city || '');
          setNeighborhood(enderecoData.neighborhood || '');
          setStreet(enderecoData.street || '');
        }
      } catch (error) {
        console.error("Erro ao buscar endereço pelo CEP:", error);
      }
    }
  };
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleFormSubmit = async () => {
    setIsLoading(true);
    if (action === 'Cadastrar') {

      try {
        const response = await axios.post('http://localhost:8080/api/users/create', {
          userid,
          userName,
          email,
          password,
          userType,
          cpf,
          emailInstitucional,
          ra,
          semestre,
          curso,
          instituicao,
          unidade,
          zipCode,
          state,
          city,
          street,
          neighborhood
        });
        console.log('Registration Successful', response.data);
        setRegistrationStatus('success');
        setShowModalContent(true);
      } catch (error) {
        console.error('There was an error registering!', error);
        setRegistrationStatus('error');
        setShowModalContent(true);
      } finally {
        setTimeout(() => {
          setIsLoading(false); 
        }, 1000);
      }

    } else if (action === 'Login') {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          userid,
          email,
          password,
        });

        console.log('Login Successful', response.data);
        localStorage.setItem('userid', userid);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        localStorage.setItem('cpf', cpf);
        const accountDetailsResponse = await axios.get(`http://localhost:8080/api/users/myAccount?email=${email}&password=${password}`);
        console.log('Account Details:', accountDetailsResponse.data);
        navigate('/MyAccount');
      } catch (error) {
        console.error('There was an error logging in!', error);
      }
    }
  };

  return (
    <>
      <div className="row" style={{ height: "100vh" }}>
        <div className="col-3 d-none d-md-block gradient-background"></div>
        <div className="p-5 col-12 col-md-9 formStyle">
          <div className='logoNavbar'>
            <img src={LogoImg} alt="Logo" />
          </div>
          <div className="header">
            <div className="text">{action}</div>
          </div>
          <div className="btn-group" role="group" aria-label="Tipo de Usuário">
            <input
              className="btn-check"
              type="radio"
              id="usuarioComum"
              autoComplete="off"
              value="usuarioComum"
              checked={userType === 'usuarioComum'}
              onChange={handleUserTypeChange}
            />
            <label className="btn btn-outline-primary" htmlFor="usuarioComum">Externo</label>

            <input
              className="btn-check"
              type="radio"
              id="aluno"
              autoComplete="off"
              value="aluno"
              checked={userType === 'aluno'}
              onChange={handleUserTypeChange}
            />
            <label className="btn btn-outline-primary" htmlFor="aluno">Aluno</label>

            <input
              className="btn-check"
              type="radio"
              id="professor"
              autoComplete="off"
              value="professor"
              checked={userType === 'professor'}
              onChange={handleUserTypeChange}
            />
            <label className="btn btn-outline-primary" htmlFor="professor">Professor</label>

            <input
              className="btn-check"
              type="radio"
              id="diretor"
              autoComplete="off"
              value="diretor"
              checked={userType === 'diretor'}
              onChange={handleUserTypeChange}
            />
            <label className="btn btn-outline-primary" htmlFor="diretor">Diretor</label>
          </div>

          <br /><br /><br />

          <div className="row justify-content-center">
            {action === 'Login' ? (
              <>
                <div className="row justify-content-center">
                  <div className="col-4">
                    <div className="form-floating mb-3">
                      <input className='form-control'
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} placeholder='E-mail*'
                      />
                      <label className='form-label' htmlhtmlFor="email">E-mail*</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input className='form-control'
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Senha*'
                      />
                      <label className='form-label' htmlhtmlFor="password">Senha*</label>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <SignUpBasicInfo
                  userName={userName}
                  setUserName={setUserName}
                  email={email}
                  setEmail={setEmail}
                  cpf={cpf}
                  setCpf={setCpf}
                  password={password}
                  setPassword={setPassword}
                />

                {/* <SignUpAddress
                  zipCode={zipCode}
                  setZipcode={setZipcode}
                  state={state}
                  setState={setState}
                  city={city}
                  setCity={setCity}
                  neighborhood={neighborhood}
                  setNeighborhood={setNeighborhood}
                  street={street}
                  setStreet={setStreet}
                  handleZipCodeChange={handleZipCodeChange}
                /> */}

                {userType === 'aluno' && (

                  <SignUpAluno
                    emailInstitucional={emailInstitucional}
                    setEmailInstitucional={setEmailInstitucional}
                    ra={ra}
                    setRA={setRA}
                    semestre={semestre}
                    setSemestre={setSemestre}
                    unidade={unidade}
                    setUnidade={setUnidade}
                    curso={curso}
                    setCurso={setCurso} />
                )}
                {userType === 'professor' && (
                  <>
                    <SignUpProfessor
                      unidade={unidade}
                      setUnidade={setUnidade}
                      emailInstitucional={emailInstitucional}
                      setEmailInstitucional={setEmailInstitucional}
                    />
                  </>
                )}
                {userType === 'diretor' && (
                  <SignUpDiretor
                    unidade={unidade}
                    setUnidade={setUnidade}
                    emailInstitucional={emailInstitucional}
                    setEmailInstitucional={setEmailInstitucional}
                  />
                )}
              </>
            )}
            <div className="d-flex gap-3 justify-content-center loginRegisterbtn">
              <div data-bs-toggle="modal" data-bs-target="#staticBackdrop" className={action === 'Login' ? 'btn btn-lg btn-outline-secondary' : 'btn btn-lg btn-success'}
                onClick={() => {
                  if (action === 'Cadastrar') {
                    handleFormSubmit();
                  } else {
                    setAction('Cadastrar');
                  }
                }}
              >
                Cadastrar

              </div>
              <div
                className={action === 'Cadastrar' ? 'btn btn-lg btn-outline-secondary' : 'btn btn-lg btn-success'}
                onClick={() => {
                  if (action === 'Login') {
                    handleFormSubmit();
                  } else {
                    setAction('Login');
                  }
                }}
              >
                Entrar
              </div>
            </div>

            <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-body">
                    {isLoading && <div className="spinner-border" role="status"></div>}
                    {showModalContent && !isLoading && (
                      registrationStatus === 'success' ?
                        'Conta criada com sucesso.\nAgora só precisa validar pelo e-mail que você recebeu!' :
                        'Erro durante a operação.'
                    )}

                  </div>
                  <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-primary" onClick={refreshPage} >Continuar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignInUp;