import { useEffect, useRef, useState } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { QueryOptions } from "../../../app/hooks/firestore/types";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import { useAppSelector } from "../../../app/store/store";
import { actions } from "../eventSlice";
import EventFilters from "./EventFilters";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemPlaceHolder";

function EventDashboard() {
  const contextRef = useRef(null);
  const { data: events, status } = useAppSelector((state) => state.events);
  const { loadCollection } = useFireStore("events");
  const [query, setQuery] = useState<QueryOptions[]>([
    { attribute: "date", operator: ">=", value: new Date() },
  ]);

  useEffect(() => {
    loadCollection(actions, {
      queries: query,
      limit: 1,
    });
  }, [loadCollection, query]);

  return (
    <Grid>
      <GridColumn width={10} ref={contextRef}>
        {status === "loading" ? (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        ) : (
          <EventList events={events} />
        )}
      </GridColumn>
      <GridColumn width={6}>
        <div
          className="ui fixed top sticky"
          style={{ top: 98, width: 405, zIndex: -1 }}
        >
          <EventFilters setQuery={setQuery} />
        </div>
      </GridColumn>
    </Grid>
  );
}
export default EventDashboard;
