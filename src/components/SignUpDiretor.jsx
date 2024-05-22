import React from 'react'

const SignUpDiretor = ({ setUnidade, unidade, emailInstitucional, setEmailInstitucional }) => {
    return (
      <div className="col-sm-12 col-md-5">
        <div className="d-flex justify-content-start">
          <h5>Informações adicionais</h5>
        </div>
        <div className="form-floating mb-3">
                    <select className='form-select'
                        type="text"
                        id="unidade"
                        value={unidade}
                        onChange={(e) => setUnidade(e.target.value)}
                    >
                      <option value="" disabled>Selecione a sua unidade</option>
                        <option value="Fatec Diadema - Luigi Papaiz - Endereço: Av. Luiz Merenda, 443 - Campanário, Diadema - SP, 09931-390">Fatec Diadema - Luigi Papaiz</option>
                        <option value="" disabled>Não encontrou sua Fatec na lista? Implante o Eventec na sua Fatec!</option>
                    </select>
                    <label className='form-label' htmlhtmlFor="unidade">Unidade*</label>
                </div>
        <div className="form-floating mb-3">
          <input className='form-control'
            type="text"
            id="emailInstitucional"
            value={emailInstitucional}
            onChange={(e) => setEmailInstitucional(e.target.value)} 
            placeholder='E-mail Institucional'
          />
          <label className='form-label' htmlFor="emailInstitucional">E-mail Fatec*</label>
        </div>
      </div>
    );
  };

export default SignUpDiretor