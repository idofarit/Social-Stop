import { MenuItem, Button } from "semantic-ui-react";
import { useAppDispatch } from "../../store/store";
import { openModal } from "../../common/modals/modalSlice";

function SignedOutButton() {
  const dispatch = useAppDispatch();

  return (
    <MenuItem position="right">
      <Button
        onClick={() => dispatch(openModal({ type: "LoginForm" }))}
        basic
        inverted
        content="Login"
        style={{ margin: "0.3rem" }}
      />
      <Button
        onClick={() => dispatch(openModal({ type: "RegisterForm" }))}
        basic
        inverted
        content="Register"
        style={{ margin: "0.3rem" }}
      />
    </MenuItem>
  );
}
export default SignedOutButton;
