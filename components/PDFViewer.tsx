// components/PDFViewer.tsx
"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  fileUrl: string;
}

export default function PDFViewer({ fileUrl }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages }, (_, i) => (
          <Page key={`page_${i + 1}`} pageNumber={i + 1} />
        ))}
      </Document>
    </div>
  );
}
