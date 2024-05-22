import React from 'react'

const SignUpAluno = ({ emailInstitucional, setEmailInstitucional,
    ra, setRA,
    semestre, setSemestre,
    unidade, setUnidade,
    curso, setCurso
}) => {
    return (
        <>
            <div className="col-sm-12 col-md-5">
                <div className="d-flex justify-content-start">
                    <h5>Informações adicionais</h5>
                </div>
                <div className="form-floating mb-3">
                    <input className='form-control'
                        type="text"
                        id="emailInstitucional"
                        value={emailInstitucional}
                        onChange={(e) => setEmailInstitucional(e.target.value)}
                        placeholder='Email institucional'
                    />
                    <label className='form-label' htmlhtmlFor="emailInstitucional">E-mail Fatec*</label>
                </div>

                <div className="form-floating mb-3">
                    <input className='form-control'
                        type="text"
                        id="ra"
                        value={ra}
                        onChange={(e) => setRA(e.target.value)}
                        placeholder='RA'
                    />
                    <label className='form-label' htmlhtmlFor="ra">RA*</label>
                </div>

                <div className="form-floating mb-3">
                    <input className='form-control'
                        type="number"
                        id="semestre"
                        value={semestre}
                        onChange={(e) => setSemestre(e.target.value)}
                        placeholder='Semestre'
                    />
                    <label className='form-label' htmlhtmlFor="semestre">Semestre*</label>
                </div>

                <div className="form-floating mb-3">
                    <select className='form-select'
                        type="text"
                        id="unidade"
                        value={unidade}
                        onChange={(e) => setUnidade(e.target.value)}
                    >
                        <option value="" disabled>Selecione a sua unidade</option>
                        <option value="Fatec Diadema">Fatec Diadema - Luigi Papaiz</option>
                        <option value="" disabled>Não encontrou sua Fatec na lista? Fale com o seu diretor sobre a implantação do Eventec na sua Fatec!</option>
                    </select>
                    <label className='form-label' htmlhtmlFor="unidade">Unidade</label>
                </div>

                <div className="form-floating mb-3">
                    <select className='form-select'
                        type="text"
                        id="curso"
                        value={curso}
                        onChange={(e) => setCurso(e.target.value)}
                    >
                        <option value="" disabled>Selecione o seu curso</option>
                        <option value="Desenvolvimento de Software Multiplataforma">Desenvolvimento de Software Multiplataforma</option>
                        <option value="Gestão da Produção Industrial">Gestão da Produção Industrial</option>
                        <option value="Gestão da Produção Industrial">Cosméticos</option>
                    </select>
                    <label className='form-label' htmlhtmlFor="curso">Curso*</label>
                </div>
            </div>
        </>
    )
}

export default SignUpAluno