import React from 'react'

const SignUpBasicInfo = ({ 
    userName, setUserName, 
    email, setEmail, 
    cpf, setCpf, 
    password, setPassword 
  }) => {
    return (
      <div className="col-sm-12 col-md-5">
        <div className="d-flex justify-content-start">
          <h5>Informações básicas</h5>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control" 
            type="text" 
            id="userName" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Nome*"
          />
          <label htmlFor="userName">Nome*</label>
        </div>
        <div className="form-floating mb-3">
          <input className='form-control'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@email.com*"
          />
          <label htmlFor="email">E-mail*</label>
        </div>
        <div className="form-floating mb-3">
          <input className='form-control'
            type="number"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder='CPF'
          />
          <label htmlFor="cpf">CPF*</label>
        </div>
        <div className="form-floating mb-3">
          <input className='form-control'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <label htmlFor="password">Senha*</label>
        </div>
      </div>
    );
  };

export default SignUpBasicInfo