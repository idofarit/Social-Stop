import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
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
  List,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import { db } from "../../../app/config/firebase";
import { AppEvent } from "../../../app/types/event";
import EventListAttendee from "./EventListAttendee";

type Props = {
  event: AppEvent;
};

function EventListItem({ event }: Props) {
  const [loading, setLoading] = useState(false);

  async function removeEvent() {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "events", event.id));
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

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
          loading={loading}
          onClick={removeEvent}
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
