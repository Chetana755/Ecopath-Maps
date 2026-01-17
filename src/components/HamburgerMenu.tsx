import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function HamburgerMenu({ onClick }: { onClick: () => void }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 20,
        bgcolor: "white",
        boxShadow: 2,
      }}
    >
      <MenuIcon />
    </IconButton>
  );
}
