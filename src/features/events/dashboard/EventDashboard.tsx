import { useCallback, useEffect, useState } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { QueryOptions } from "../../../app/hooks/firestore/types";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import EmptyState from "../../../app/layout/EmptyState";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { actions } from "../eventSlice";
import EventFilters from "./EventFilters";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemPlaceHolder";

function EventDashboard() {
  const dispatch = useAppDispatch();
  const {
    data: events,
    status,
    loadedInitial,
  } = useAppSelector((state) => state.events);
  const { loadCollection, hasMore } = useFireStore("events");
  const [query, setQuery] = useState<QueryOptions[]>([
    { attribute: "date", operator: ">=", value: new Date() },
  ]);

  const loadEvents = useCallback(
    async (reset?: boolean) => {
      loadCollection(actions, {
        queries: query,
        limit: 2,
        sort: { attribute: "date", order: "asc" },
        pagination: true,
        reset,
        get: true,
      });
    },
    [loadCollection, query]
  );

  useEffect(() => {
    loadEvents(true);

    return () => {
      dispatch(actions.reset());
    };
  }, [loadEvents, dispatch]);

  function loadMore() {
    loadEvents();
  }

  return (
    <Grid stackable columns={2}>
      <GridColumn mobile={16} tablet={8} computer={16} className="grid_ten">
        {!loadedInitial ? (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        ) : (
          <>
            {events.length === 0 ? (
              <EmptyState />
            ) : (
              <EventList
                events={events}
                hasMore={hasMore.current}
                loadMore={loadMore}
                loading={status === "loading"}
              />
            )}
          </>
        )}
      </GridColumn>
      <GridColumn mobile={16} tablet={8} computer={16} className="grid_six">
        <div
          className="ui fixed top sticky stick_bar"
          style={{ top: 98, width: 405, zIndex: 1 }}
        >
          <EventFilters setQuery={setQuery} />
        </div>
      </GridColumn>
    </Grid>
  );
}
export default EventDashboard;
