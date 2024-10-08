import { Header, Menu, MenuItem } from "semantic-ui-react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useRef, useState } from "react";
import { QueryOptions } from "../../../app/hooks/firestore/types";
import { useAppSelector } from "../../../app/store/store";

type Props = {
  setQuery: (query: QueryOptions[]) => void;
};

function EventFilters({ setQuery }: Props) {
  const startDate = useRef(new Date());
  const [filter, setFilter] = useState("all");
  const { currentUser } = useAppSelector((state) => state.auth);
  const { status } = useAppSelector((state) => state.events);

  function handleSetFilter(filter: string) {
    if (!currentUser?.uid) return;
    let q: QueryOptions[];
    switch (filter) {
      case "isGoing":
        q = [
          {
            attribute: "attendeeIds",
            operator: "array-contains",
            value: currentUser.uid,
          },
          { attribute: "date", operator: ">=", value: startDate.current },
        ];
        break;
      case "isHost":
        q = [
          {
            attribute: "hostUid",
            operator: "==",
            value: currentUser.uid,
          },
          { attribute: "date", operator: ">=", value: startDate.current },
        ];
        break;
      default:
        q = [
          {
            attribute: "date",
            operator: ">=",
            value: startDate.current,
          },
        ];
        break;
    }
    setFilter(filter);
    setQuery(q);
  }

  return (
    <div>
      <Menu vertical size="large" style={{ width: "100%" }}>
        <Header
          attached
          color="teal"
          content="Filters"
          icon="filter"
          style={{ border: "none" }}
        />
        <MenuItem
          content="All events"
          active={filter === "all"}
          onClick={() => handleSetFilter("all")}
          disabled={status === "loading"}
        />
        <MenuItem
          content="I'm going"
          active={filter === "isGoing"}
          onClick={() => handleSetFilter("isGoing")}
          disabled={status === "loading"}
        />
        <MenuItem
          content="I'm hosting"
          active={filter === "isHost"}
          onClick={() => handleSetFilter("isHost")}
          disabled={status === "loading"}
        />
      </Menu>
      <Header icon="calendar" attached color="teal" content="Select date" />
      <Calendar
        onChange={(date) => {
          startDate.current = date as Date;
          handleSetFilter(filter);
        }}
        value={startDate.current}
      />
    </div>
  );
}
export default EventFilters;
