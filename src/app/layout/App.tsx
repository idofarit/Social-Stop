import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { logOut, signIn } from "../../auth/authSlice";
import HomePage from "../../features/Home/HomePage";
import ModalManager from "../common/modals/ModalManager";
import { auth } from "../config/firebase";
import { useAppDispatch } from "../store/store";
import Navbar from "./Nav/Navbar";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, {
      next: (user) => {
        if (user) {
          dispatch(signIn(user));
        } else {
          dispatch(logOut());
        }
      },
      error: (error) => console.log(error),
      complete: () => {},
    });
  }, [dispatch]);

  return (
    <>
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <ScrollRestoration />
          <ModalManager />
          <Navbar />
          <Container className="main">
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default App;
