import React, { useEffect, useState } from 'react';
import LoggedNavbar from './LoggedNavbar';
import Footer from '../components/Footer';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import logo from '../assets/logocps.jpg';
import ProfessorCertificateItem from '../components/ProfessorCertificateItem';

const MyCertifications = () => {
    const [certificates, setCertificates] = useState([]);
    const [professorCertificates, setProfessorCertificates] = useState([]);

    const formatDateTime = (isoDate) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        };
        return new Date(isoDate).toLocaleDateString(undefined, options).replace(',', ' ');
    };

    const handleDownloadCertificate = (certificate) => {
        window.parent.postMessage({
            action: 'downloadCertificate',
            certificate: {
                userName: certificate.userName,
                eventTitle: certificate.eventTitle,
                eventDate: certificate.eventDate,
                cargaHoraria: certificate.subscription.event.cargaHoraria
            }
        }, '*');
    };
      

    const convertBlobToBase64 = (blob) => 
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

    useEffect(() => {
        const userid = localStorage.getItem('userid');
    
        const fetchCertificates = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/certifications/user/${userid}`);
                if (response.status === 200) {
                    setCertificates(response.data);
                    const professorResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/certifications/professor/${userid}`);
                    if (professorResponse.status === 200) {
                        setProfessorCertificates(professorResponse.data);
                    }
                } else {
                    console.error('Erro ao buscar os certificados:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar os certificados:', error);
            }
        };
    
        fetchCertificates();
    }, []);

    return (
        <>
            <LoggedNavbar />
            <div className="container-bg">
                <div className="container">
                    <h3 className='text-center mb-5'>Eventos que participei: </h3>
                    <div className="d-flex flex-wrap gap-3 justify-content-center">
                        {certificates.map((certificate, index) => (
                            <div className="" key={index}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{certificate.eventTitle}</h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">{certificate.category}</h6>
                                        <p className="card-text">Conclusão: {formatDateTime(certificate.eventDate)}</p>
                                        <button onClick={() => handleDownloadCertificate(certificate)} className="btn btn-primary">Pegar certificado</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <h3 className='text-center mt-5 mb-5'>{professorCertificates.length > 0 ? 'Eventos que apresentei:' : ''}</h3>
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            {professorCertificates.map((certificate, index) => (
                                <div className="" key={index}>
                                    <ProfessorCertificateItem certificate={certificate} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default MyCertifications;
