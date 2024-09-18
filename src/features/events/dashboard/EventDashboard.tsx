import { useEffect, useState } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { sampleData } from "../../../app/api/sampleData";
import { AppEvent } from "../../../app/types/event";
import EventList from "./EventList";

function EventDashboard() {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    setEvents(sampleData);
  }, []);

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
