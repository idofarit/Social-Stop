import { MenuItem, Button } from "semantic-ui-react";

type Props = {
  setAuth: (value: boolean) => void;
};

function SignedOutButton({ setAuth }: Props) {
  return (
    <MenuItem position="right">
      <Button
        onClick={() => setAuth(true)}
        basic
        inverted
        content="Login"
        style={{ margin: "0.3rem" }}
      />
      <Button basic inverted content="Register" style={{ margin: "0.3rem" }} />
    </MenuItem>
  );
}
export default SignedOutButton;
