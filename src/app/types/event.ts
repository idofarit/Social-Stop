export type AppEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  city: string;
  venue: string;
  hostedBy: string;
  hostPhotoURL: string;
  attendees: Attendee[];
  category: string;
};

export type Attendee = {
  id: string;
  name: string;
  photoURL: string;
};
