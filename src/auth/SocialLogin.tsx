import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useFireStore } from "../app/hooks/firestore/useFirestore";
import { useAppDispatch } from "../app/store/store";
import {
  AuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../app/config/firebase";
import { Timestamp } from "firebase/firestore";
import { closeModal } from "../app/common/modals/modalSlice";

function SocialLogin() {
  const [status, setStatus] = useState<any>({ loading: false, provider: null });

  const { set } = useFireStore("profiles");

  const dispatch = useAppDispatch();

  async function handleSocialLogin(selectedProvider: string) {
    setStatus({ loading: true, provider: selectedProvider });
    const provider: AuthProvider = new GoogleAuthProvider();

    try {
      if (provider) {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        if (
          result.user.metadata.creationTime ===
          result.user.metadata.lastSignInTime
        ) {
          await set(result.user.uid, {
            dispalyName: result.user.displayName,
            email: result.user.email,
            createdAt: Timestamp.now(),
            photoURL: result.user.photoURL,
          });
        }
        dispatch(closeModal());
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setStatus({ laoding: false, provider: null });
    }
  }

  return (
    <Button
      loading={status.loading}
      onClick={() => handleSocialLogin("google")}
      type="button"
      fluid
      color="red"
      style={{ marginBottom: 10 }}
    >
      <Icon name="google" />
      Login with google
    </Button>
  );
}
export default SocialLogin;
