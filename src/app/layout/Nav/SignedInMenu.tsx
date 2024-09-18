import { Link, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Image,
  MenuItem,
} from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signOut } from "../../../auth/authSlice";

function SignedInMenu() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSignOut() {
    dispatch(signOut());
    navigate("/");
  }

  return (
    <MenuItem position="right">
      <Image avatar spaced="right" src="/user.png" />
      <Dropdown pointing="top left" text={currentUser?.email}>
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
