//NavbarLg.jsx
import { Menu, Segment } from "semantic-ui-react";
export default function NavbarLg({ renderLinks }: any) {
  return (
    <Segment inverted attached size="mini">
      <Menu inverted secondary>
        {renderLinks()}
      </Menu>
    </Segment>
  );
}
