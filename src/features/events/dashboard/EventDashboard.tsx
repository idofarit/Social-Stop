import { Grid, GridColumn } from "semantic-ui-react";
import { useAppSelector } from "../../../app/store/store";
import EventList from "./EventList";

function EventDashboard() {
  const { events } = useAppSelector((state) => state.events);

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
