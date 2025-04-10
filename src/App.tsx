// import DownloadPdf from './components/DownloadPdf'

import DrawSignature from "./components/DrawSignature"

function App() {
  const createFile = (blob: Blob): void => {
    console.log(".............[save file]........");
    console.log(blob);
  }


  return (
    // <DownloadPdf />
    <DrawSignature onSave={createFile} />
  )
}

export default App
