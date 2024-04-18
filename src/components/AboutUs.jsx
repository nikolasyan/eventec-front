import React from 'react';
import { Collection, GearFill, Table, Speedometer } from 'react-bootstrap-icons';

const AboutUs = () => {
  return (
    <div class="container px-4 py-5">
    <h2 class="pb-2 border-bottom">Features with title</h2>

    <div class="text-start row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
      <div class="col d-flex flex-column align-items-start gap-2">
        <h2 class="fw-bold text-body-emphasis">Left-aligned title explaining these awesome features</h2>
        <p class="text-body-secondary">Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        <a href="#" class="btn btn-primary btn-lg">Primary button</a>
      </div>

      <div class="col">
        <div class="row row-cols-1 row-cols-sm-2 g-4">
          <div class="col d-flex flex-column gap-2">
            <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
              <Collection/>
            </div>
            <h4 class="fw-semibold mb-0 text-body-emphasis">Featured title</h4>
            <p class="text-body-secondary">Paragraph of text beneath the heading to explain the heading.</p>
          </div>

          <div class="col d-flex flex-column gap-2">
            <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
              <GearFill/>
            </div>
            <h4 class="fw-semibold mb-0 text-body-emphasis">Featured title</h4>
            <p class="text-body-secondary">Paragraph of text beneath the heading to explain the heading.</p>
          </div>

          <div class="col d-flex flex-column gap-2">
            <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
              <Speedometer/>
            </div>
            <h4 class="fw-semibold mb-0 text-body-emphasis">Featured title</h4>
            <p class="text-body-secondary">Paragraph of text beneath the heading to explain the heading.</p>
          </div>

          <div class="col d-flex flex-column gap-2">
            <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
              <Table/>
            </div>
            <h4 class="fw-semibold mb-0 text-body-emphasis">Featured title</h4>
            <p class="text-body-secondary">Paragraph of text beneath the heading to explain the heading.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const Feature = ({ Icon, title }) => (
  <div className="col d-flex flex-column align-items-center gap-2 text-center">
    <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-primary rounded-circle p-3">
      <Icon size={32} color="white" />
    </div>
    <h4 className="fw-semibold mb-0 text-body-emphasis">{title}</h4>
    <p className="text-body-secondary">Paragraph of text beneath the heading to explain the heading.</p>
  </div>
);

export default AboutUs;
