import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemImage,
  Label,
  List,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import { AppEvent } from "../../../app/types/event";
import EventListAttendee from "./EventListAttendee";

type Props = {
  event: AppEvent;
};

function EventListItem({ event }: Props) {
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <ItemImage
              referrerPolicy="origin-when-cross-origin"
              size="tiny"
              circular
              src={event.hostPhotoURL || "/user.png"}
            ></ItemImage>
            <ItemContent>
              <ItemHeader>{event.title}</ItemHeader>
              <ItemDescription>hosted by {event.hostedBy}</ItemDescription>
              {event.isCancelled && (
                <Label
                  style={{ top: "-40px" }}
                  ribbon="right"
                  color="red"
                  content="Event cancelled"
                />
              )}
            </ItemContent>
          </Item>
        </ItemGroup>
      </Segment>

      <Segment>
        <span>
          <Icon name="clock" />
          {event.date}
          <Icon name="marker" />
          {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>

      <Segment clearing>
        <span>{event.description}</span>

        <Button
          as={Link}
          to={`/events/${event.id}`}
          color="teal"
          floated="right"
          content="view"
        />
      </Segment>
    </SegmentGroup>
  );
}
export default EventListItem;
