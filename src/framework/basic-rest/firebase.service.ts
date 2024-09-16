import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { toast } from "react-toastify";
import { app } from "./firebase.config";

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async (login) => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    const [firstName, lastName] = user.displayName?.split(" ")!;
    const newUser = {
      firstName,
      lastName,
      email: user.email,
      phone: user.phoneNumber,
      loginType: "google",
    };
    login(newUser);
  } catch (error: any) {
    toast.error(error.response ? error.response.data.message : error.message);
  }
};
