import { Heading, Button } from "@chakra-ui/react";
import { useState } from "react";
import InpsectionAct from "./InspectionAct";

export default function SubSection({ section, title }) {
  const [inspectionActs, setInspectionActs] = useState([]);

  function addInspectionAct(actType) {
    setInspectionActs([...inspectionActs, actType]);
  }

  return (
    <>
      <Heading size="md" mt={4}>
        {title}
      </Heading>
      {inspectionActs.map((actType) => (
        <InpsectionAct section={section} subsection={title} actType={actType} />
      ))}
      <Button
        m={4}
        colorScheme="yellow"
        onClick={() => addInspectionAct("intervention")}
      >
        Add Intervention
      </Button>
      <Button
        colorScheme="green"
        onClick={() => addInspectionAct("commendation")}
      >
        Add Commendation
      </Button>
    </>
  );
}
