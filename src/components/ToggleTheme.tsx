import { useColorMode, MenuItem } from "@chakra-ui/react";

export function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <MenuItem onClick={toggleColorMode}>
      {colorMode === "light" ? "Modo escuro" : "Modo claro"}
    </MenuItem>
  );
}
