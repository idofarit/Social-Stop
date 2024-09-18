import { Link, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Image,
  MenuItem,
} from "semantic-ui-react";

type Props = {
  setAuth: (value: boolean) => void;
};

function SignedInMenu({ setAuth }: Props) {
  const navigate = useNavigate();

  function handleSignOut() {
    setAuth(false);
    navigate("/");
  }

  return (
    <MenuItem position="right">
      <Image avatar spaced="right" src="/user.png" />
      <Dropdown pointing="top left" text="maddy">
        <DropdownMenu>
          <DropdownItem
            as={Link}
            to="/createEvent"
            text="create event"
            icon="plus"
          />
          <DropdownItem as={Link} text="my profile" icon="user" />
          <DropdownItem
            text="Sign out"
            icon="log out"
            onClick={handleSignOut}
          />
        </DropdownMenu>
      </Dropdown>
    </MenuItem>
  );
}
export default SignedInMenu;
