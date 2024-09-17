import { Image, ListItem } from "semantic-ui-react";
import { Attendee } from "../../../app/types/event";

type Props = {
  attendee: Attendee;
};

function EventListAttendee({ attendee }: Props) {
  return (
    <ListItem>
      <Image size="mini" circular src={attendee.photoURL} />
    </ListItem>
  );
}
export default EventListAttendee;
