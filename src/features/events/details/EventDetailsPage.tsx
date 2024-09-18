import { Grid, GridColumn } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSideBar from "./EventDetailedSideBar";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";

function EventDetailsPage() {
  const { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.events.find((e) => e.id === id)
  );

  if (!event) {
    return <h2>Event not found</h2>;
  }

  return (
    <Grid>
      <GridColumn width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </GridColumn>
      <GridColumn width={6}>
        <EventDetailedSideBar />
      </GridColumn>
    </Grid>
  );
}
export default EventDetailsPage;
