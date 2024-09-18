import {
  Segment,
  Item,
  ItemContent,
  ItemHeader,
  ItemImage,
  ItemGroup,
} from "semantic-ui-react";

function EventDetailedSideBar() {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        2 People Going
      </Segment>
      <Segment attached>
        <ItemGroup relaxed divided>
          <Item style={{ position: "relative" }}>
            <ItemImage size="tiny" src="/user.png" />
            <ItemContent verticalAlign="middle">
              <ItemHeader as="h3">
                <span>Tom</span>
              </ItemHeader>
            </ItemContent>
          </Item>
          <Item style={{ position: "relative" }}>
            <ItemImage size="tiny" src="/user.png" />
            <ItemContent verticalAlign="middle">
              <ItemHeader as="h3">
                <span>Bob</span>
              </ItemHeader>
            </ItemContent>
          </Item>
        </ItemGroup>
      </Segment>
    </>
  );
}
export default EventDetailedSideBar;
