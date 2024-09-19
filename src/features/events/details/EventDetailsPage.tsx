import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, GridColumn } from "semantic-ui-react";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useAppSelector } from "../../../app/store/store";
import { actions } from "../eventSlice";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSideBar from "./EventDetailedSideBar";

function EventDetailsPage() {
  const { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.data.find((e) => e.id === id)
  );
  const { loadDocument } = useFireStore("events");
  const { status } = useAppSelector((state) => state.events);

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);

  if (status === "loading") return <LoadingComponent />;

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
