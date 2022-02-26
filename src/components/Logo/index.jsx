import logoSrc from "../../assets/logo.png";
import { Image } from "@chakra-ui/react";

export default function Logo(props) {
  return <Image src={logoSrc} alt="Logo" {...props} />;
}
