import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken(); // Obtén el token JWT
    console.log("User Token:", token);
    return token;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};
