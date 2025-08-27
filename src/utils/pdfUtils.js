export const handleDownloadPDF = (text, setError) => {
  if (!text || !window.jspdf) { setError?.("PDF library not available."); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);
  const margin = 15;
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - margin * 2;
  const lineHeight = doc.getTextDimensions("M").h;
  const lines = doc.splitTextToSize(text, maxWidth);
  let y = margin;
  lines.forEach((line) => {
    if (y + lineHeight > pageHeight - margin) { doc.addPage(); y = margin; }
    doc.text(line, margin, y); y += lineHeight;
  });
  doc.save("summary.pdf");
};
