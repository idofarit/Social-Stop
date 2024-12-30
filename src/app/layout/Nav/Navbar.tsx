import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutButton from "./SignedOutButton";
import { useAppSelector } from "../../store/store.ts";

export default function Navbar() {
  const { authenticated } = useAppSelector((state) => state.auth);

  return (
    <Menu inverted={true} fixed="top" pointing className="mobile only row">
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

        {authenticated ? <SignedInMenu /> : <SignedOutButton />}
      </Container>
    </Menu>
  );
}
