import { Heading, Button, Box, ScaleFade } from "@chakra-ui/react";
import { useState } from "react";
import InspectionAct from "./InspectionAct";
import { ListItem, ListIcon, Divider } from "@chakra-ui/react";
import { SettingsIcon, AddIcon } from "@chakra-ui/icons";
import { useFieldArray, useFormContext } from "react-hook-form";

const buttonProps = { fontStyle: "italic", size: "sm", leftIcon: <AddIcon /> };

export default function SubSection({ section, title, name }) {
  const { getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name,
  });

  return (
    <>
      <Divider w="70%" borderColor="blackAlpha.400" my={4} mx="auto" />
      <ListItem>
        <Box display="flex" alignItems="center">
          <ListIcon as={SettingsIcon} color="blue.400" />
          <Heading size="md">{title}</Heading>
        </Box>

        <Box>
          {fields.map((field, index) => (
            <InspectionAct
              key={field.id}
              name={`${name}.${index}`}
              actType={getValues(`${name}.${index}`).actType}
              section={section}
              subsection={title}
              onRemove={() => remove(index)}
            />
          ))}

          <Button
            {...buttonProps}
            m={4}
            colorScheme="yellow"
            onClick={() => append({ actType: "intervention" })}
          >
            Intervention
          </Button>
          <Button
            {...buttonProps}
            colorScheme="green"
            onClick={() => append({ actType: "commendation" })}
          >
            Commendation
          </Button>
        </Box>
      </ListItem>
    </>
  );
}
