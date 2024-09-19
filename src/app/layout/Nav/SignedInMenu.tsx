import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Image,
  MenuItem,
} from "semantic-ui-react";
import { auth } from "../../config/firebase";
import { useAppSelector } from "../../store/store";

function SignedInMenu() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <MenuItem position="right">
      <Image avatar spaced="right" src="/user.png" />
      <Dropdown pointing="top left" text={currentUser?.email as string}>
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
