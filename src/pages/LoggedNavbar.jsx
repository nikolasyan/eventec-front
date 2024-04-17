import React from 'react'

const LoggedNavbar = () => {
  return (
    <nav className="navbar bg-primary navbar-expand-xl navbar-dark loggedNavbar">
      <div class="container">
        <a href="/home" class="navbar-brand logoEventec">Eventec</a>
        <button class="navbar-toggler" type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarOffcanvas"
          aria-controls="navbarOffcanvas"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end bg-secondary" id="navbarOffcanvas"
          tabindex="-1" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title text-light" id="offcanvasNavbarLabel">Olá!</h5>
            <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div class="navbar-nav justify-content-end flex-grow-1 pe-3 gap-3">
              <a class="nav-item nav-link active hover-underline-animation" aria-current="page" href="/events">Eventos disponiveis</a>
              {localStorage.getItem('userType') === 'professor' || localStorage.getItem('userType') === 'diretor' ? (
              <a className="nav-item nav-link active hover-underline-animation" aria-current="page" href="/crudevent">
                Gerenciar Eventos
              </a>
            ) : null}
              {localStorage.getItem('userType') === 'diretor' ? (
              <a class="nav-item nav-link active hover-underline-animation" aria-current="page" href="/myAccountDiretor">Aprovar eventos</a>
              ) : null}
              <li class="nav-item dropdown hover-underline-animation">
                <a class="nav-link active dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Minha conta
                </a>

                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/myAccount">Meus dados</a></li>
                  <li><a class="dropdown-item" href="/myEvents">Minhas inscrições</a></li>
                  <li><a class="dropdown-item" href="/myCertifications">Meus certificados</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item text-danger" href="/home">Sair</a></li>
                </ul>
              </li>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default LoggedNavbar