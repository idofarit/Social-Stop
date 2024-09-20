import {
  Segment,
  Item,
  ItemContent,
  ItemHeader,
  ItemImage,
  ItemGroup,
  Label,
} from "semantic-ui-react";
import { AppEvent } from "../../../app/types/event";
import { Link } from "react-router-dom";

type Props = {
  event: AppEvent;
};

function EventDetailedSideBar({ event }: Props) {
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
        {event.attendees.length} people{" "}
        {event.attendees.length > 1 ? "are" : "is"} going
      </Segment>
      <Segment attached>
        <ItemGroup relaxed divided>
          {event.attendees.map((attendee) => (
            <Item style={{ position: "relative" }} key={attendee.id}>
              {event.hostUid === attendee.id && (
                <Label
                  style={{ position: "absolute" }}
                  color="blue"
                  ribbon="right"
                >
                  Host
                </Label>
              )}
              <ItemImage
                referrerPolicy="strict-origin-when-cross-origin"
                size="tiny"
                src={attendee.photoURL || "/user.png"}
              />
              <ItemContent verticalAlign="middle">
                <ItemHeader as={Link} to={`/profiles/${attendee.id}`}>
                  <span>{attendee.displayName}</span>
                </ItemHeader>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </Segment>
    </>
  );
}
export default EventDetailedSideBar;
