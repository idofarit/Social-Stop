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
      <Image
        avatar
        spaced="right"
        src={currentUser?.photoURL || "/user.png"}
        referrerPolicy="origin-when-cross-origin"
      />
      <Dropdown pointing="top left" text={currentUser?.displayName as string}>
        <DropdownMenu>
          <DropdownItem
            as={Link}
            to="/createEvent"
            text="create event"
            icon="plus"
          />
          <DropdownItem
            as={Link}
            to={`/profiles/${currentUser?.uid}`}
            text="my profile"
            icon="user"
          />
          {currentUser && (
            <DropdownItem
              as={Link}
              to="/account"
              text="my account"
              icon="settings"
            />
          )}
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
