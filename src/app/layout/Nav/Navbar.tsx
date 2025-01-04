import { NavLink } from "react-router-dom";
import { Button, Menu, MenuItem, Container } from "semantic-ui-react";
import { useAppSelector } from "../../store/store.ts";

import { useMediaQuery } from "react-responsive";
import NavbarLg from "./NavbarLg.tsx";
import NavbarMb from "./NavbarMb.tsx";
import SignedInMenu from "./SignedInMenu";
import SignedOutButton from "./SignedOutButton";

export default function Navbar() {
  const { authenticated } = useAppSelector((state) => state.auth);

  const renderLinks = () => {
    return (
      <>
        <MenuItem header as={NavLink} to={"/"}>
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />{" "}
          &nbsp; Social-Stop
        </MenuItem>
        <MenuItem name="Events" as={NavLink} to={"/events"} />

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
      </>
    );
  };

  const none = useMediaQuery({ query: "(max-width:576px)" });
  const sm = useMediaQuery({ query: "(min-width:576px)" });
  const md = useMediaQuery({ query: "(min-width:768px)" });
  const lg = useMediaQuery({ query: "(min-width:992px)" });
  const xl = useMediaQuery({ query: "(min-width:1200px)" });
  const xxl = useMediaQuery({ query: "(min-width:1400px)" });
  const size = { none, sm, md, lg, xl, xxl };

  return (
    <Menu inverted={true} fixed="top">
      <Container>
        {/* <MenuItem header as={NavLink} to={"/"}>
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />{" "}
          &nbsp; Social-Stop
        </MenuItem>
        <MenuItem name="Events" as={NavLink} to={"/events"} />

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

        {authenticated ? <SignedInMenu /> : <SignedOutButton />} */}

        {size.sm ? (
          <NavbarLg renderLinks={renderLinks} />
        ) : (
          <NavbarMb renderLinks={renderLinks} />
        )}
      </Container>
    </Menu>
  );
}
