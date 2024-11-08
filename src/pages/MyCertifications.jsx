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
    const [pdfData, setPdfData] = useState(null); // For PDF modal
    const [showModal, setShowModal] = useState(false); // For modal visibility

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

    const handleGenerateCertificate = (certificate) => {
        const doc = new jsPDF('landscape');
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

            const pdfUrl = doc.output('datauristring'); // Generate PDF as a data URL
            setPdfData(pdfUrl); // Set the PDF data to state
            setShowModal(true); // Show the modal
        };
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
                    <div className="row justify-content-start">
                        {certificates.map((certificate, index) => (
                            <div className="col-12 col-lg-4 mb-3" key={index}>
                                <div className="card h-100">
                                    <div className="card-body d-flex flex-column justify-content-end">
                                        <h5 className="card-title">{certificate.eventTitle}</h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">{certificate.category}</h6>
                                        <p className="card-text">Conclusão: {formatDateTime(certificate.eventDate)}</p>
                                        <button onClick={() => handleGenerateCertificate(certificate)} className="btn btn-primary mt-auto mx-auto">Visualizar certificado</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <h3 className='text-center mt-5 mb-5'>{professorCertificates.length > 0 ? 'Eventos que apresentei:' : ''}</h3>
                        <div className="row justify-content-start">
                            {professorCertificates.map((certificate, index) => (
                                <div className="col-12 col-lg-4 mb-3" key={index}>
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
}

export default MyCertifications;
