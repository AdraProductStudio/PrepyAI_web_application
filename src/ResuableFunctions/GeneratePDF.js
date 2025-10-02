import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateQuestionPaperPDF = (
  questions,
  fileName,
  withAnswers = false
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const maxLineWidth = pageWidth - margin * 2;

  doc.setFontSize(16);
  doc.text("Question Paper", pageWidth / 2, 15, { align: "center" });

  let cursorY = 30

  questions.forEach((q, index) => {
    doc.setFontSize(12);
    const questionText = doc.splitTextToSize(
      `Q${q.Question_no}: ${q.Question}`,
      maxLineWidth
    );
    doc.text(questionText, margin, cursorY);

    cursorY += questionText.length * 6 + 5;

    const options = q.options.map((opt) => [
      withAnswers && opt.answer ? `${opt.option} ✅` : opt.option,
    ]);

    autoTable(doc, {
      startY: cursorY,
      head: [["Options"]],
      body: options,
      theme: "grid",
      styles: {
        fontSize: 11,
        cellWidth: "wrap",
      },
      columnStyles: {
        0: { cellWidth: maxLineWidth },
      },
      margin: { left: margin, right: margin },
    });

    cursorY = doc.lastAutoTable.finalY + 8;


    if (withAnswers) {
      doc.setFontSize(10);
      const explanationText = doc.splitTextToSize(
        `Explanation: ${q.Explanation}`,
        maxLineWidth
      );
      doc.text(explanationText, margin, cursorY);

      cursorY += explanationText.length * 5 + 12; 
    } else {
      cursorY += 10; 
    }

    if (cursorY > pageHeight - 30) {
      doc.addPage();
      cursorY = 30;
    }
  });

  doc.save(fileName);
};
