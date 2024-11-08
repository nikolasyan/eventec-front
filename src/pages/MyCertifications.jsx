import React, { useEffect, useState } from 'react';
import LoggedNavbar from './LoggedNavbar';
import Footer from '../components/Footer';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Capacitor } from '@capacitor/core';
import logo from '../assets/logocps.jpg';
import ProfessorCertificateItem from '../components/ProfessorCertificateItem';

const MyCertifications = () => {
    const [certificates, setCertificates] = useState([]);
    const [professorCertificates, setProfessorCertificates] = useState([]);
    const [pdfUrls, setPdfUrls] = useState({});

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

    const handleGenerateCertificate = async (certificate) => {
        const doc = new jsPDF('landscape');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Adding logo
        const img = new Image();
        img.src = logo;
        await new Promise((resolve) => { img.onload = resolve; });

        const imgWidth = 50;
        const imgHeight = 20;
        const xPosition = (pageWidth - imgWidth) / 2;
        const yPosition = pageHeight - imgHeight - 10;
        doc.addImage(img, 'JPG', xPosition, yPosition, imgWidth, imgHeight);

        // Adding certificate content
        doc.text(`Certificamos para os devidos fins que ${certificate.userName} concluiu com sucesso o evento:`, 20, 50);
        doc.text(`Evento: ${certificate.eventTitle}`, 20, 60);
        doc.text(`Conclusão: ${formatDateTime(certificate.eventDate)}`, 20, 70);
        doc.text(`Carga Horária: ${certificate.subscription.event.cargaHoraria} horas`, 20, 80);

        // Generate PDF as Blob and create a Blob URL
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Copy the URL to the clipboard
        try {
            await navigator.clipboard.writeText(pdfUrl);
            alert('O link do certificado foi copiado para a área de transferência. Cole no navegador para abrir.');
        } catch (error) {
            console.error('Erro ao copiar o link:', error);
            alert('Erro ao copiar o link. Tente novamente.');
        }
    };

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
                                        <div className='d-flex flex-column gap-1'>
                                        <button onClick={() => handleGenerateCertificate(certificate)} className="btn btn-primary mb-2">Gerar certificado</button>
                                        {pdfUrls[certificate.eventTitle] && (
                                            <a href={pdfUrls[certificate.eventTitle]} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Abrir Certificado</a>
                                        )}
                                        </div>
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

            {/* Modal to display PDF */}
            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Certificado</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                            {pdfData && (
    <object data={pdfData} type="application/pdf" width="100%" height="500px">
        <p>Seu navegador não suporta exibição de PDFs. <a href={pdfData}>Baixar PDF</a></p>
    </object>
)}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyCertifications;
