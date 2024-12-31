import { createBrowserRouter } from "react-router-dom";
import AccountPage from "../../auth/AccountPage";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetailsPage from "../../features/events/details/EventDetailsPage";
import EventForm from "../../features/events/Form/EventForm";
import ProfilePage from "../../features/profiles/ProfilePage";
import App from "../layout/App";
import UnauthComponent from "../layout/UnauthComponent";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "/manage/:id", element: <EventForm /> },
          { path: "/profiles/:id", element: <ProfilePage /> },
          { path: "/createEvent", element: <EventForm key="create" /> },
          { path: "/account", element: <AccountPage /> },
        ],
      },
      { path: "/events", element: <EventDashboard /> },
      { path: "/events/:id", element: <EventDetailsPage /> },

      { path: "/unauthorised", element: <UnauthComponent /> },
    ],
  },
]);
