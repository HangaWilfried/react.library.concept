import { FaFilePdf } from "react-icons/fa6";
import { ChangeEvent, useState } from "react";
import { SlCloudDownload } from "react-icons/sl";

import PDFViewer from "./PdfViewer";


type Source = {
  file: File;
  href: string;
}

export default function DownloadPdf() {
  const [files, setFiles] = useState<Source[]>([])

  const handleFilesChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const items = e.target.files
    if(items) {
      const roasters = Array.from(items).map(it => ({
        file: it,
        href: URL.createObjectURL(it)
      }))
      setFiles(roasters);
    }
  }

  return (
    <section>
      <input type="file" multiple onChange={handleFilesChanges} />
      {files.map(it => (
        <>
          <div className="bg-yellow-100 text-black flex justify-between items-center p-2 rounded-lg">
        <div className="flex gap-2 items-center">
          <FaFilePdf className="size-4 text-red-600" />
        </div>
        <a href={it.href} download="view_demo.pdf" className="flex gap-2 items-center">
          <span>Telecharger</span>
          <SlCloudDownload className="size-4 text-white" />
        </a>
      </div>
      <PDFViewer pdfUrl={it.file} />
        </>
      ))}
    </section>
  );
}
