import { AppEvent } from "../../../app/types/event";
import EventListItem from "./EventListItem";

type Props = {
  events: AppEvent[];
  selectEvent: (event: AppEvent) => void;
  deleteEvent: (eventID: string) => void;
};

function EventList({ events, selectEvent, deleteEvent }: Props) {
  return (
    <>
      {events.map((event) => (
        <EventListItem
          deleteEvent={deleteEvent}
          key={event.id}
          event={event}
          selectEvent={selectEvent}
        />
      ))}
    </>
  );
}
export default EventList;
