import { Box, Flex, Button, Input, Image } from "@chakra-ui/react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { useEffect, useState, useRef } from "react";

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
      return (
        <Image
          src={fileURL}
          alt="thumbnail"
          onLoad={() => URL.revokeObjectURL(fileURL)}
          onClick={() => remove(index)}
        />
      );
    }
  }

  return (
    <Box>
      <Flex flexDir="row-reverse">
        <Button
          onClick={() => {
            append("");
            setAddRequested(true);
          }}
        >
          Upload Image
        </Button>
      </Flex>
      <Box>
        {fields.map((field, index) => {
          const { ref, ...inputProps } = register(`${name}.${index}`);
          return (
            <Box key={field.id}>
              <Input
                type="file"
                key={field.id}
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
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
