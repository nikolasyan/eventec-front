
import React from 'react';
import logo from '../assets/logocps.jpg'; 
import jsPDF from 'jspdf';

const ProfessorCertificateItem = ({ certificate }) => {

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

            const text = `Certificamos para os devidos fins que ${certificate.userName} ministrou com sucesso o evento:\n\nEvento: ${certificate.eventTitle}\nConclusão: ${formatDateTime(certificate.eventDate)}\nCarga Horária:`;
            const textXPosition = marginLeft;

            doc.text(text, textXPosition, 50);

            doc.save(`Certificado_${certificate.eventTitle}.pdf`);
        };
        console.log("cacete:"+ JSON.stringify(certificate))
    };

    return (
        <div className="certificate">
            <div className="card">
                <div className="card-body">
                    <h5 className='card-title'>{certificate.eventTitle}</h5>
                    <p>{`Professor: ${certificate.professorName}`}</p>
                    <p>Conclusão: {formatDateTime(certificate.eventDate)}</p>
                    <button onClick={() => handleDownloadCertificate(certificate)} className="btn btn-primary">Pegar certificado</button>
                </div>
            </div>
        </div>
    );
}

export default ProfessorCertificateItem;
