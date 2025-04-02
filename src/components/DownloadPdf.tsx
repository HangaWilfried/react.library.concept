import { FaFilePdf } from "react-icons/fa6";
import { SlCloudDownload } from "react-icons/sl";
import PDFViewer from "./PdfViewer";
import { useMemo, useState } from "react";

export default function DownloadPdf() {
  const [file, setFile] = useState<File>()

  const source = useMemo(() => file ? URL.createObjectURL(file) : "", [file])

  return (
    <section>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
      <div className="bg-yellow-100 text-black flex justify-between items-center p-2 rounded-lg">
        <div className="flex gap-2 items-center">
          <FaFilePdf className="size-4 text-red-600" />
        </div>
        <a href={source} download="view_demo.pdf" className="flex gap-2 items-center">
          <span>Telecharger</span>
          <SlCloudDownload className="size-4 text-white" />
        </a>
      </div>
      {file && <PDFViewer pdfUrl={file} />}
    </section>
  );
}
