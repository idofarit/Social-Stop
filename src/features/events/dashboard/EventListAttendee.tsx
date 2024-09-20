import { Image, ListItem } from "semantic-ui-react";
import { Attendee } from "../../../app/types/event";
import { Link } from "react-router-dom";

type Props = {
  attendee: Attendee;
};

function EventListAttendee({ attendee }: Props) {
  return (
    <ListItem as={Link} to={`/profiles/${attendee.id}`}>
      <Image
        referrerPolicy="origin-when-cross-origin"
        size="mini"
        circular
        src={attendee.photoURL}
      />
    </ListItem>
  );
}
export default EventListAttendee;
