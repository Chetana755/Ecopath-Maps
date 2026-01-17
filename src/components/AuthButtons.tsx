import { Button, Box } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../auth/AuthContext";

export default function AuthButtons() {
  const { user } = useAuth();

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
      {user ? (
        <Button variant="contained" onClick={() => signOut(auth)}>
          Logout
        </Button>
      ) : (
        <>
          <Button variant="outlined" onClick={login}>
            Login
          </Button>
          <Button variant="contained" sx={{ ml: 1 }} onClick={login}>
            Sign Up
          </Button>
        </>
      )}
    </Box>
  );
}
