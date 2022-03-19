import { useEffect, useState } from "react";
import genPDF from "./genPDF";

export default function usePDF(sections) {
  const [inputData, setInputData] = useState({});
  const [PDF, setPDF] = useState();

  useEffect(() => {
    if (sections) {
      setPDF(genPDF(sections, inputData));
    }
  }, [sections, inputData]);

  return [PDF?.output("bloburl"), setInputData];
}
