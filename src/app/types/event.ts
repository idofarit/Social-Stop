export type AppEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  city: string;
  venue: string;
  hostedBy: string;
  hostUid: string;
  hostPhotoURL: string;
  attendees: Attendee[];
  attendeeIds: string[];
  isCancelled: boolean;
  category: string;
  isHost?: boolean;
  isGoing?: boolean;
};

export type Attendee = {
  id: string;
  displayName: string;
  photoURL: string;
};
