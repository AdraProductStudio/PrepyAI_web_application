import jsPDF from "jspdf";
import "jspdf-autotable";
import Image from "Utils/Image"

export async function DownloadPDF(params) {
    if (params?.data?.length) {
        const doc = new jsPDF(params?.pdfType);
        const getTableHeadKeys = Object.keys(params?.data[0])
        getTableHeadKeys.unshift("S.No")

        // Base64-encoded version of your watermark image
        const watermarkBase64 = Image.truckPdfBase64Img; // Replace this with your full Base64 string.

        const tableData = [];

        // Prepare table data
        params?.data?.map((entry, index) => {
            const trData = Object.values(entry)
            trData.unshift(index + 1)
            tableData.push(trData)
        });

        // Set title properties
        doc.setFontSize(16); // Larger font size for the title
        doc.setFont("helvetica", "bold"); // Set the font to bold
        doc.setTextColor(220, 53, 69); // Bootstrap "danger" theme (red color)
        doc.text(params?.reportTitle, doc.internal.pageSize.width / 2, 20, { align: "center" }); // Center align the title

        // Add current balance heading
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal"); // Reset to normal font for the balance
        doc.setTextColor(0, 0, 0); // Reset text color to black


        // Add the table
        doc.autoTable({
            head: [getTableHeadKeys],
            body: tableData,
            startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 40,
            theme: "grid",
            headStyles: { fillColor: [100, 100, 255] },
            bodyStyles: { fillColor: null },
            styles: { fontSize: 8, cellPadding: 2 }, // Adjust text size and padding
            columnStyles: {
                0: { cellWidth: 15 }, // Customize column widths
                1: { cellWidth: 'auto' }, // Auto-adjust remaining columns
            },
            didDrawPage: (data) => {
                // Add watermark image
                const pageWidth = doc.internal.pageSize.width;
                const pageHeight = doc.internal.pageSize.height;
        
                // Watermark size and position
                const watermarkWidth = pageWidth * 0.5; // Adjust width as needed
                const watermarkHeight = watermarkWidth * 0.9; // Maintain aspect ratio
                const watermarkX = (pageWidth - watermarkWidth) / 2; // Center horizontally
                const watermarkY = (pageHeight - watermarkHeight) / 2; // Center vertically
        
                // Add watermark image with transparency
                doc.setGState(new doc.GState({ opacity: 0.1 })); // Set watermark opacity to 10%
                doc.addImage(watermarkBase64, "PNG", watermarkX, watermarkY, watermarkWidth, watermarkHeight);
                doc.setGState(new doc.GState({ opacity: 1 })); // Reset opacity for other elements
        
                // Add footer with report download date
                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString(); // Format as per locale
                const footerText = `Report downloaded on: ${formattedDate}`;
                doc.setFontSize(10);
                doc.setFont("helvetica", "normal");
                doc.text(
                    footerText,
                    pageWidth / 2,
                    pageHeight - 10, // Position footer 10 units from the bottom
                    { align: "center" }
                );
            },
        });

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10); // Formats as "YYYY-MM-DD"        
        const sanitizedReportTitle = params?.reportTitle?.trim().replace(" ", "") || "Untitled";
        const fileName = `TruckMessage-${sanitizedReportTitle}-${formattedDate}.pdf`;

        // Save the PDF
        doc.save(fileName);
    } 
};