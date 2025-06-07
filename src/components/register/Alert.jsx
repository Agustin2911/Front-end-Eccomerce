import {
  Button,
  Text,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

function Alert(variable, title_alert, text, setter) {
  return (
    <DialogRoot open={variable}>
      <DialogContent bg={"#333333"}>
        <DialogHeader>
          <DialogTitle color={"white"} fontSize={"4xl"}>
            {title_alert}
          </DialogTitle>
        </DialogHeader>
        <DialogBody color={"white"}>
          <Text fontSize={"md"}>{text}</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              onClick={() => {
                setter(false);
              }}
              colorPalette={"red"}
              borderRadius={"l3"}
            >
              Cancel
            </Button>
          </DialogActionTrigger>
          <Link to={"/signup"}>
            <Button colorPalette={"blue"} borderRadius={"l3"}>
              iniciar sesion
            </Button>
          </Link>
        </DialogFooter>
        <DialogCloseTrigger
          onClick={() => {
            setter(false);
          }}
        />
      </DialogContent>
    </DialogRoot>
  );
}

export default Alert;
