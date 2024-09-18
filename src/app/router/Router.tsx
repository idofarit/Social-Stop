import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetailsPage from "../../features/events/details/EventDetailsPage";
import EventForm from "../../features/events/Form/EventForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/events", element: <EventDashboard /> },
      { path: "/events/:id", element: <EventDetailsPage /> },
      { path: "/manage/:id", element: <EventForm /> },
      { path: "/createEvent", element: <EventForm /> },
    ],
  },
]);
