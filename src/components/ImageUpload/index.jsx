import { Box, Flex, Button, Input, Image, IconButton } from "@chakra-ui/react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { useEffect, useState, useRef, Fragment } from "react";
import Thumbnail from "./Thumbnail";

export default function ImageUpload({ namePrefix = "test" }) {
  const name = `${namePrefix}.images`;

  const { register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name,
  });

  const fileLists = useWatch({ name });

  const [addRequested, setAddRequested] = useState(false);

  const lastInputRef = useRef();

  useEffect(() => {
    if (addRequested) {
      lastInputRef.current.click();
      setAddRequested(false);
    }
  }, [addRequested]);

  function renderThumbnail(fileLists, index) {
    const file = fileLists[index][0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      return <Thumbnail src={fileURL} onRemove={() => remove(index)} />;
    }
  }

  return (
    <Flex flexDirection="column" alignItems="flex-end">
      <Button
        onClick={() => {
          append("");
          setAddRequested(true);
        }}
        mb={8}
      >
        Upload Image
      </Button>
      <Flex flexWrap="wrap" columnGap={4} rowGap={4} mb={4}>
        {fields.map((field, index) => {
          const { ref, ...inputProps } = register(`${name}.${index}`);
          return (
            <Fragment key={field.id}>
              <Input
                accept="image/*"
                type="file"
                display="none"
                ref={(el) => {
                  ref(el);
                  if (index === fields.length - 1) {
                    lastInputRef.current = el;
                  }
                }}
                {...inputProps}
              />
              {fileLists &&
                fileLists[index] &&
                renderThumbnail(fileLists, index)}
            </Fragment>
          );
        })}
      </Flex>
    </Flex>
  );
}
