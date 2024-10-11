import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import HomePage from "../../features/Home/HomePage";
import ModalManager from "../common/modals/ModalManager";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAppDispatch } from "../store/store";
import { logOut, signIn } from "../../auth/authSlice";
import NavBar from "./nav/NavBar";

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
          <NavBar />
          <Container className="main">
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default App;
