import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { db } from "../../../app/config/firebase";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { AppEvent } from "../../../app/types/event";
import EventList from "./EventList";
import { setEvents } from "../eventSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";

function EventDashboard() {
  const { events } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "events"));
    const unsubscribe = onSnapshot(q, {
      next: (querySnapshot) => {
        const evts: AppEvent[] = [];
        querySnapshot.forEach((doc) => {
          evts.push({ id: doc.id, ...doc.data() } as AppEvent);
        });
        dispatch(setEvents(evts));
        setLoading(false);
      },
      error: (err) => {
        console.log(err);
        setLoading(false);
      },
      complete: () => console.log("Never will see this"),
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) return <LoadingComponent />;

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
