import React from 'react';

const Team = () => {

  return (
    <div className='container'>

<section class="bg-light py-5 py-xl-8">
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
        <p class="display-5 mb-4 mb-md-5 text-center">Equipe</p>
        <hr class="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle"/>
      </div>
    </div>
  </div>

  <div class="container overflow-hidden">
    <div class="row gy-4 gy-md-0 gx-xxl-5">
      <div class="col-12 col-md-4">
        <div class="card border-0 border-bottom border-primary shadow-sm">
          <div class="card-body p-4 p-xxl-5">
            <figure>
            <img class="img-fluid teamImg rounded rounded-circle mb-4 border border-5" loading="lazy" src="https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png" alt="Descrição da imagem" />
              <figcaption>
                <div class="bsb-ratings text-warning mb-3" data-bsb-star="5" data-bsb-star-off="0"></div>
                <h4 class="mb-2">Guilherme Henrique</h4>
                <h5 class="fs-6 text-secondary mb-0">Guilherme</h5>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card border-0 border-bottom border-primary shadow-sm">
          <div class="card-body p-4 p-xxl-5">
            <figure>
              <img class="img-fluid teamImg rounded rounded-circle mb-4 border border-5" loading="lazy" src="https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png" alt="Descrição da imagem" />
              <figcaption>
                <div class="bsb-ratings text-warning mb-3" data-bsb-star="4" data-bsb-star-off="1"></div>
                <h4 class="mb-2">Níkolas Costa</h4>
                <h5 class="fs-6 text-secondary mb-0">Front-end</h5>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card border-0 border-bottom border-primary shadow-sm">
          <div class="card-body p-4 p-xxl-5">
            <figure>
              <img class="img-fluid teamImg rounded rounded-circle mb-4 border border-5" loading="lazy" src="https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png" alt="Descrição da imagem" />

              <figcaption>
                <div class="bsb-ratings text-warning mb-3" data-bsb-star="5" data-bsb-star-off="0"></div>
                <h4 class="mb-2">Víctor Viana</h4>
                <h5 class="fs-6 text-secondary mb-0">Back-end</h5>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Team;
