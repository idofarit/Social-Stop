import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetailsPage from "../../features/events/details/EventDetailsPage";
import EventForm from "../../features/events/Form/EventForm";
import Scratch from "../../features/scratch/Scratch";
import AccountPage from "../../auth/AccountPage";
import ProfilePage from "../../features/profiles/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/events", element: <EventDashboard /> },
      { path: "/events/:id", element: <EventDetailsPage /> },
      { path: "/manage/:id", element: <EventForm /> },
      { path: "/profiles/:id", element: <ProfilePage /> },
      { path: "/createEvent", element: <EventForm key="create" /> },
      { path: "/account", element: <AccountPage /> },
      { path: "/scratch", element: <Scratch /> },
    ],
  },
]);
