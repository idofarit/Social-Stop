import { PayloadAction } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";
import {
  createGenericSlice,
  GenericActions,
  GenericState,
} from "../../app/store/genericSlice";
import { AppEvent } from "./../../app/types/event";

type State = {
  data: AppEvent[];
};

const initialState: State = {
  data: [],
};

export const eventSlice = createGenericSlice({
  name: "events",
  initialState: initialState as GenericState<AppEvent[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<AppEvent[]>) => {
        state.data = action.payload;
        state.status = "finished";
      },
      prepare: (events: any) => {
        let eventArray: AppEvent[] = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        Array.isArray(events) ? (eventArray = events) : eventArray.push(events);

        const mapped = eventArray.map((e: any) => {
          return { ...e, date: (e.date as Timestamp).toDate().toISOString() };
        });
        return { payload: mapped };
      },
    },
  },
});

export const actions = eventSlice.actions as GenericActions<AppEvent[]>;
