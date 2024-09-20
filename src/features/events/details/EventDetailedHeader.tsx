import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { AppEvent } from "../../../app/types/event";
import { useAppSelector } from "../../../app/store/store";
import toast from "react-hot-toast";
import { useState } from "react";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import dayjs from "dayjs";

type Props = {
  event: AppEvent;
};

function EventDetailedHeader({ event }: Props) {
  const eventImageStyle = {
    filter: "brightness(30%)",
  };
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { update } = useFireStore("events");

  const eventImageTextStyle = {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "white",
  };

  async function toggleAttendance() {
    if (!currentUser) {
      toast.error("Must be logged in to do this");
    }
    setLoading(true);
    if (event.isGoing) {
      const attendee = event.attendees.find((x) => x.id === currentUser?.uid);
      await update(event.id, {
        attendees: arrayRemove(attendee),
        attendeeIds: arrayRemove(currentUser?.uid),
      });
      setLoading(false);
    } else {
      await update(event.id, {
        attendees: arrayUnion({
          id: currentUser?.uid,
          displayName: currentUser?.displayName,
          photoURL: currentUser?.photoURL,
        }),
        attendeeIds: arrayUnion(currentUser?.uid),
      });
      setLoading(false);
    }
  }

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          referrerPolicy="origin-when-cross-origin"
          src={`/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: "white" }}
                />
                <p>{dayjs(event.date).format("DD-MMM-YYYY h:mm A")}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {event.isHost ? (
          <Button
            color="orange"
            floated="right"
            as={Link}
            to={`/manage/${event.id}`}
          >
            Manage Event
          </Button>
        ) : (
          <Button
            loading={loading}
            onClick={toggleAttendance}
            color={event.isGoing ? "grey" : "teal"}
            content={event.isGoing ? "Cancel my place" : "Join"}
          />
        )}
      </Segment>
    </Segment.Group>
  );
}
export default EventDetailedHeader;
