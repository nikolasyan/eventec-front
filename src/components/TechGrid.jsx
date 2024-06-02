import React from 'react';
import './style/global.css';
import git from '../assets/images/git.png';
import framermotion from '../assets/images/framermotion.jpg';
import java from '../assets/images/java-icon.svg';
import mysql from '../assets/images/mysql.png';
import reactLogo from '../assets/images/react-logo.svg';
import springboot from '../assets/images/springboot.jpg';
import bootstrap from '../assets/images/bootstrap.jpeg';
import heroku from '../assets/images/heroku-logo.png';

const TechGrid = () => {
    return (
        <div className="container p-5">
            <div className="row" data-masonry='{"percentPosition": true }'>
                <div className="col-sm-6 col-lg-4 mb-4">
                    <div className="card">
                        <img src={reactLogo} className="card-img-top" alt="React Logo" />
                        <div className="card-body">
                            <h5 className="card-title">React</h5>
                            <p className="card-text">Uma biblioteca JavaScript para construir interfaces de usuário, usada no front-end.</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                    <div className="card">
                        <figure className="mb-0">
                                <img src={framermotion} alt="" className='w-100'/>
                        </figure>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                    <div className="card">
                        <img src={java} className="p-5 card-img-top w-50 align-self-center" alt="Java Logo" />
                        <div className="card-body">
                            <h5 className="card-title">Java</h5>
                            <p className="card-text">Uma linguagem de programação de alto nível, baseada em classes e orientada a objetos. usada no back-end</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                    <div className="card text-bg-primary text-center p-0">
							<img src={bootstrap} alt=""  className='w-100'/>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                    <div className="card text-center">
                        <div className="card-body">
							<img src={git} alt="" className='w-50'/>
						</div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                    <div className="card">
					<img src={mysql} className="card-img-top" alt="Java Logo" />
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                    <div className="card p-0 text-end">
					<img src={springboot} alt="" className='w-100'/>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                    <div className="card">
                        <div className="card-body p-0">
							<img src={heroku} alt="" className='w-100'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechGrid;
