import { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useAppSelector } from "../../../app/store/store";
import { actions } from "../eventSlice";
import EventList from "./EventList";

function EventDashboard() {
  const { data: events, status } = useAppSelector((state) => state.events);
  const { loadCollection } = useFireStore("events");

  useEffect(() => {
    loadCollection(actions);
  }, [loadCollection]);

  if (status === "loading") return <LoadingComponent />;

  return (
    <Grid>
      <GridColumn width={10}>
        <EventList events={events} />
      </GridColumn>
      <GridColumn width={6}>
        <h2>filter</h2>
      </GridColumn>
    </Grid>
  );
}
export default EventDashboard;
