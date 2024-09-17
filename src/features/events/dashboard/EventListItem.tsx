import {
  Button,
  Icon,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemImage,
  List,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { AppEvent } from "../../../app/types/event";

type Props = {
  event: AppEvent;
  selectEvent: (event: AppEvent) => void;
  deleteEvent: (eventID: string) => void;
};

function EventListItem({ event, selectEvent, deleteEvent }: Props) {
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <ItemImage
              size="tiny"
              circular
              src={event.hostPhotoURL || "/user.png"}
            ></ItemImage>
            <ItemContent>
              <ItemHeader>{event.title}</ItemHeader>
              <ItemDescription>{event.hostedBy}</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </Segment>

      <Segment>
        <span>
          <Icon name="clock" />
          Date
          <Icon name="marker" />
          Venue
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
          color="red"
          floated="right"
          content="delete"
          onClick={() => deleteEvent(event.id)}
        />
        <Button
          color="teal"
          floated="right"
          content="view"
          onClick={() => selectEvent(event)}
        />
      </Segment>
    </SegmentGroup>
  );
}
export default EventListItem;
