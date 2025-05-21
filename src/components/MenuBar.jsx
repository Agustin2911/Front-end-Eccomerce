import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@chakra-ui/react";

function MenuBar({ objeto, numero, lista }) {
  return (
    <div>
      <MenuRoot>
        <MenuTrigger asChild>
          <Button fontSize={"xs"} variant="plain" size="sm">
            {objeto} {numero}
          </Button>
        </MenuTrigger>

        <MenuContent
          className="w-80"
          style={{ background: "#333333", marginTop: "-6px" }}
        >
          {lista.map((iphone) => (
            <Link
              style={{ textDecoration: "none", color: "red" }}
              to={iphone.url}
            >
              <MenuItem value={iphone.name} key={iphone.name} fontSize={"xs"}>
                {objeto} {iphone.name}
              </MenuItem>
            </Link>
          ))}
        </MenuContent>
      </MenuRoot>
    </div>
  );
}

export default MenuBar;
