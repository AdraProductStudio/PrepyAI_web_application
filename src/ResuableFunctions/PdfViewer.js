import React, { useEffect, useRef, useState } from "react";

const PdfViewer = ({
    pdfUrl = "https://devcdn.2ndcareers.com/professional/resume/Anil_Menon.pdf",
    className, title, height = '600px' }) => {


    const containerRef = useRef(null);
    const [width, setWidth] = useState(null);
    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
        }

        const handleResize = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchPdfAsBlob = async () => {
            try {
                const response = await fetch(pdfUrl);
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                console.log(blobUrl)
                setPdfBlobUrl(blobUrl);
            } catch (error) {
                console.error("Failed to fetch PDF as blob:", error);
            }
        };

        if (pdfUrl) {
            fetchPdfAsBlob();
        }
    }, [pdfUrl]);

    return (
        <div ref={containerRef} className={className}>
            <h3>{title || ''}</h3>
            {pdfBlobUrl ? (
                <iframe
                    src={pdfBlobUrl}
                    title={title || ''}
                    width={width || '100%'}
                    height={height}
                    style={{ border: '1px solid #ccc' }}
                    allowFullScreen
                />
            ) : (
                <div>Loading PDF...</div>
            )}
        </div>
    );
};

export default PdfViewer;