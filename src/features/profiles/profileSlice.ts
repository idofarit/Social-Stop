import { PayloadAction } from "@reduxjs/toolkit";
import { createGenericSlice, GenericState } from "../../app/store/genericSlice";
import { Timestamp } from "firebase/firestore";
import { Profile } from "../../app/types/profile";

type State = {
  data: Profile[];
};

const initialState: State = {
  data: [],
};

export const profileSlice = createGenericSlice({
  name: "profiles",
  initialState: initialState as GenericState<Profile[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<Profile[]>) => {
        state.data = action.payload;
        state.status = "finished";
      },
      prepare: (profiles) => {
        let profilArray: Profile[] = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        Array.isArray(profiles)
          ? (profilArray = profiles)
          : profilArray.push(profiles);
        const mapped = profilArray.map((profile) => {
          return {
            ...profile,
            createdAt: (profile.createdAt as unknown as Timestamp)
              .toDate()
              .toISOString(),
          };
        });
        return { payload: mapped };
      },
    },
  },
});

export const actions = profileSlice.actions;
