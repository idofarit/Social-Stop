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
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../app/store/store";
import { deleteEvent } from "../eventSlice";

type Props = {
  event: AppEvent;
};

function EventListItem({ event }: Props) {
  const dispatch = useAppDispatch();

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
          onClick={() => dispatch(deleteEvent(event.id))}
          color="red"
          floated="right"
          content="delete"
        />
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
