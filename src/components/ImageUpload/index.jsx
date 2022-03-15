import { Box, Flex, Button, Input, Image } from "@chakra-ui/react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { useEffect, useState, useRef } from "react";

export default function ImageUpload(props) {
  const { register, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "test.son", // unique name for your Field Array
  });

  const fileLists = useWatch({ name: "test.son" });

  const [addRequested, setAddRequested] = useState(false);

  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    const newImageURLs = fileLists?.map(
      ([file]) => file && URL.createObjectURL(file)
    );
    setImageURLs(newImageURLs || []);
  }, [fileLists]);

  const lastInputRef = useRef();

  useEffect(() => {
    if (addRequested) {
      lastInputRef.current.click();
      setAddRequested(false);
    }
  }, [addRequested]);

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
          const { ref, ...inputProps } = register(`test.son.${index}`);
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
              {imageURLs[index] && (
                <Image
                  src={imageURLs[index]}
                  alt="thumbnail"
                  onLoad={() => URL.revokeObjectURL(imageURLs[index])}
                  onClick={() => remove(index)}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
