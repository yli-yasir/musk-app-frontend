import { Heading, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import InspectionAct from "./InspectionAct";
import { ListItem, ListIcon } from "@chakra-ui/react";
import { SettingsIcon, AddIcon } from "@chakra-ui/icons";

export default function SubSection({ section, title }) {
  const [inspectionActs, setInspectionActs] = useState([]);

  function addInspectionAct(actType) {
    setInspectionActs([...inspectionActs, actType]);
  }

  return (
    <ListItem>
      <Box display="flex" alignItems="center">
        <ListIcon as={SettingsIcon} color="blue.400" />
        <Heading size="md">{title}</Heading>
      </Box>
      <Box>
        {inspectionActs.map((actType, index) => (
          <InspectionAct
            key={index}
            section={section}
            subsection={title}
            index={index}
            actType={actType}
          />
        ))}
        <Button
          m={4}
          fontStyle="italic"
          colorScheme="yellow"
          size="sm"
          leftIcon={<AddIcon />}
          onClick={() => addInspectionAct("intervention")}
        >
          Intervention
        </Button>
        <Button
          fontStyle="italic"
          size="sm"
          leftIcon={<AddIcon />}
          colorScheme="green"
          onClick={() => addInspectionAct("commendation")}
        >
          Commendation
        </Button>
      </Box>
    </ListItem>
  );
}
