import { Button, Container, Menu, MenuItem } from "semantic-ui-react";

type Props = {
  setFormOpen: (value: boolean) => void;
};

function Navbar({ setFormOpen }: Props) {
  return (
    <Menu inverted={true} fixed="top">
      <Container>
        <MenuItem header>
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />{" "}
          &nbsp; Social-Stop
        </MenuItem>
        <MenuItem name="Events" />
        <MenuItem>
          <Button
            floated="right"
            positive={true}
            inverted={true}
            content="Create event"
            onClick={() => setFormOpen(true)}
          />
        </MenuItem>
        <MenuItem position="right">
          <Button basic inverted content="Login" style={{ margin: "0.3rem" }} />
          <Button
            basic
            inverted
            content="Register"
            style={{ margin: "0.3rem" }}
          />
        </MenuItem>
      </Container>
    </Menu>
  );
}
export default Navbar;
