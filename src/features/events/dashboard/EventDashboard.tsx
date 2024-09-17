import { Grid, GridColumn } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../Form/EventForm";
import { sampleData } from "../../../app/api/sampleData";
import { useEffect, useState } from "react";
import { AppEvent } from "../../../app/types/event";

type Props = {
  formOpen: boolean;
  setFormOpen: (value: boolean) => void;
  selectEvent: (event: AppEvent | null) => void;
  selectedEvent: AppEvent | null;
};

function EventDashboard({
  formOpen,
  setFormOpen,
  selectedEvent,
  selectEvent,
}: Props) {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    setEvents(sampleData);
  }, []);

  function addEvent(event: AppEvent) {
    setEvents((prevState) => {
      return [...prevState, event];
    });
  }

  function updateEvent(updateEvent: AppEvent) {
    setEvents(
      events.map((ev) => (ev.id === updateEvent.id ? updateEvent : ev))
    );
    selectEvent(null);
    setFormOpen(false);
  }

  function deleteEvent(eventID: string) {
    setEvents(events.filter((ev) => ev.id !== eventID));
  }

  return (
    <Grid>
      <GridColumn width={10}>
        <EventList
          events={events}
          selectEvent={selectEvent}
          deleteEvent={deleteEvent}
        />
      </GridColumn>
      <GridColumn width={6}>
        {formOpen && (
          <EventForm
            updateEvent={updateEvent}
            selectedEvent={selectedEvent}
            setFormOpen={setFormOpen}
            addEvent={addEvent}
            key={selectedEvent ? selectedEvent.id : "create"}
          />
        )}
      </GridColumn>
    </Grid>
  );
}
export default EventDashboard;
