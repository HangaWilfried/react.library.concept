import { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

type PDFViewerProps = {
  pdfUrl: string | File | null;
  width?: number;
  onLoadError?: (error: Error) => void;
};

export default function PDFViewer({ pdfUrl, width = 200, onLoadError }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    setError('Erreur lors du chargement du PDF');
    setIsLoading(false);
    onLoadError?.(error);
  };

  const goToPreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    if (numPages) {
      setPageNumber((prev) => Math.min(prev + 1, numPages));
    }
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const actualWidth = Math.min(width, window.innerWidth - 40);

  return (
    <div className="pdf-viewer" ref={containerRef}>
      {error && <div className="pdf-error">{error}</div>}

      <div className="pdf-container">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<div>Chargement du PDF...</div>}
          error={<div>Erreur lors du chargement du PDF</div>}
        >
          {isLoading && <div>Chargement en cours...</div>}
          <Page
            pageNumber={pageNumber}
            scale={scale}
            width={actualWidth}
            loading={<div>Chargement de la page...</div>}
          />
        </Document>
      </div>

      <div className="pdf-controls">
        <div className="pdf-navigation">
          <button
            disabled={pageNumber <= 1}
            onClick={goToPreviousPage}
            aria-label="Page précédente"
          >
            Précédent
          </button>

          <span className="pdf-page-info">
            Page {pageNumber} sur {numPages || '--'}
          </span>

          <button
            disabled={!!numPages && pageNumber >= numPages}
            onClick={goToNextPage}
            aria-label="Page suivante"
          >
            Suivant
          </button>
        </div>

        <div className="pdf-zoom">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            aria-label="Zoom arrière"
          >
            -
          </button>
          <span>{Math.round(scale * 100)}%</span>
          <button
            onClick={zoomIn}
            disabled={scale >= 3.0}
            aria-label="Zoom avant"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

// Types supplémentaires pour les props avancées
type PDFPageProps = {
  pageNumber: number;
  scale: number;
  width: number;
  loading?: React.ReactNode;
};

type PDFDocumentProps = {
  file: string | File | null;
  onLoadSuccess: (pdf: PDFDocumentProxy) => void;
  onLoadError?: (error: Error) => void;
  loading?: React.ReactNode;
  error?: React.ReactNode;
  children?: React.ReactNode;
};