import React, { useEffect, useState } from 'react';
import LoggedNavbar from './LoggedNavbar';
import Footer from '../components/Footer';
import axios from 'axios';
import jsPDF from 'jspdf';
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
    // console.log(certificates)
    const handleDownloadCertificate = (certificate) => {
        const doc = new jsPDF('landscape');
        // console.log(certificate)
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const marginBottom = 10;
        const marginLeft = 20;
        
        const img = new Image();
        img.src = logo;
        img.onload = () => {
            const originalWidth = img.width;
            const originalHeight = img.height;

            const maxWidth = 50;
            const maxHeight = 20;
            let imgWidth = maxWidth;
            let imgHeight = (originalHeight / originalWidth) * imgWidth;

            if (imgHeight > maxHeight) {
                imgHeight = maxHeight;
                imgWidth = (originalWidth / originalHeight) * imgHeight;
            }

            const xPosition = (pageWidth - imgWidth) / 2;
            const yPosition = pageHeight - imgHeight - marginBottom;

            doc.addImage(logo, 'JPG', xPosition, yPosition, imgWidth, imgHeight);

            const text = `Certificamos para os devidos fins que ${certificate.userName} concluiu com sucesso o evento:\n\nEvento: ${certificate.eventTitle}\nConclusão: ${formatDateTime(certificate.eventDate)}\nCarga Horária: ${certificate.subscription.event.cargaHoraria}`;
            const textXPosition = marginLeft;

            doc.text(text, textXPosition, 50);

            doc.save(`Certificado_${certificate.eventTitle}.pdf`);
        };
        console.log(certificate)
    };

    useEffect(() => {
        const userid = localStorage.getItem('userid');
    
        const fetchCertificates = async () => {
            try {
                // Busca os certificados dos alunos
                const response = await axios.get(`http://localhost:8080/api/certifications/user/${userid}`);
                if (response.status === 200) {
                    setCertificates(response.data);
    
                    // Busca os certificados dos professores
                    const professorResponse = await axios.get(`http://localhost:8080/api/certifications/professor/${userid}`);
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
                                        <br />
                                        <p className="card-text">Conclusão: {formatDateTime(certificate.eventDate)}</p>
                                        <button onClick={() => handleDownloadCertificate(certificate)} className="btn btn-primary">Pegar certificado</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <br />
                    <div className="row">
                        <h3 className='text-center mt-5 mb-5'> {professorCertificates.length > 0 ? 'Eventos que apresentei:' : ''}</h3>
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
}

export default MyCertifications;
