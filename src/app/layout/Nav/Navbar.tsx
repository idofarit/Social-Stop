import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import { useAppSelector } from "../../store/store";
import SignedInMenu from "./SignedInMenu";
import SignedOutButton from "./SignedOutButton";
import { sampleData } from "../../api/sampleData";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

function Navbar() {
  const { authenticated } = useAppSelector((state) => state.auth);

  function seedData() {
    sampleData.forEach(async (event) => {
      const { id, ...rest } = event;
      await setDoc(doc(db, "events", id), {
        ...rest,
      });
    });
  }

  return (
    <Menu inverted={true} fixed="top">
      <Container>
        <MenuItem header as={NavLink} to={"/"}>
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />{" "}
          &nbsp; Social-Stop
        </MenuItem>
        <MenuItem name="Events" as={NavLink} to={"/events"} />
        <MenuItem name="Scratch" as={NavLink} to={"/scratch"} />
        <MenuItem>
          <Button
            as={NavLink}
            to="/createEvent"
            floated="right"
            positive={true}
            inverted={true}
            content="Create event"
          />
        </MenuItem>

        {import.meta.env.DEV && (
          <MenuItem>
            <Button
              onClick={seedData}
              color="teal"
              inverted={true}
              content="seed data"
            />
          </MenuItem>
        )}
        {authenticated ? <SignedInMenu /> : <SignedOutButton />}
      </Container>
    </Menu>
  );
}
export default Navbar;
