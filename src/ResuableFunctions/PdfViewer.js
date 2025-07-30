import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ 
    pdfUrl,className
 }) => {

    const containerRef = useRef(null);
    const [width, setWidth] = useState(null);

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
        }

        // Optional: Update width on resize
        const handleResize = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className={className}>
            <Suspense fallback={<div>Loading PDF...</div>}>
                {width && (
                    <Document file={pdfUrl} onLoadError={console.error}>
                        <Page
                            pageNumber={1}
                            width={width}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </Document>
                )}
            </Suspense>
        </div>
    );
};

export default PdfViewer;
