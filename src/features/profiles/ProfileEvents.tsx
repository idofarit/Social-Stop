import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Grid, Header, Tab, Image, TabPane } from "semantic-ui-react";
import { Profile } from "../../app/types/profile";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { useAppSelector } from "../../app/store/store";
import { CollectionOptions } from "../../app/hooks/firestore/types";
import { actions } from "../events/eventSlice";
import { format } from "date-fns";

type Props = {
  profile: Profile;
};

export default function ProfileEvents({ profile }: Props) {
  const { loadCollection } = useFireStore("events");
  const { data: events, status } = useAppSelector((state) => state.events);
  const panes = [
    { menuItem: "Future events", pane: { key: "future" } },
    { menuItem: "Past events", pane: { key: "past" } },
    { menuItem: "Hosting", pane: { key: "hosting" } },
  ];

  const initialOptions: CollectionOptions = {
    queries: [
      {
        attribute: "attendeeIds",
        operator: "array-contains",
        value: profile.id,
      },
      { attribute: "date", operator: ">=", value: new Date() },
    ],
    sort: { attribute: "date", order: "asc" },
    reset: true,
  };

  const [options, setOptions] = useState<CollectionOptions>(initialOptions);

  function handleSetQuery(tab: number) {
    let options: CollectionOptions = {} as CollectionOptions;
    switch (tab) {
      case 1: // past events
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (options.queries = [
          {
            attribute: "attendeeIds",
            operator: "array-contains",
            value: profile.id,
          },
          { attribute: "date", operator: "<", value: new Date() },
        ]),
          (options.sort = { attribute: "date", order: "desc" });
        options.reset = true;
        break;
      case 2: // hosted
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (options.queries = [
          { attribute: "hostUid", operator: "==", value: profile.id },
        ]),
          (options.sort = { attribute: "date", order: "asc" });
        options.reset = true;
        break;
      default:
        options = initialOptions;
        options.reset = true;
        break;
    }
    setOptions(options);
  }

  useEffect(() => {
    loadCollection(actions, options);
  }, [loadCollection, options]);

  return (
    <TabPane loading={status === "loading"}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content="events" />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            onTabChange={(_e, data) =>
              handleSetQuery(data.activeIndex as number)
            }
            panes={panes}
            menu={{ secondary: true, pointing: true }}
          />
          <Card.Group itemsPerRow={4} style={{ marginTop: 10 }}>
            {events.map((event) => (
              <Card as={Link} to="/" key={event.id}>
                <Image
                  src={`/categoryImages/${event.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header content={event.title} textAlign="center" />
                  <Card.Meta textAlign="center">
                    <span>
                      {format(new Date(event.date), "dd MMM yyyy, h:mm a")}
                    </span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </TabPane>
  );
}
