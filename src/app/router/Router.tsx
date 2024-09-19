import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetailsPage from "../../features/events/details/EventDetailsPage";
import EventForm from "../../features/events/Form/EventForm";
import Scratch from "../../features/scratch/Scratch";
import AccountPage from "../../auth/AccountPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/events", element: <EventDashboard /> },
      { path: "/events/:id", element: <EventDetailsPage /> },
      { path: "/manage/:id", element: <EventForm /> },
      { path: "/createEvent", element: <EventForm key="create" /> },
      { path: "/account", element: <AccountPage /> },
      { path: "/scratch", element: <Scratch /> },
    ],
  },
]);
