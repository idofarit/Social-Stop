import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardGroup,
  CardHeader,
  CardMeta,
  Grid,
  GridColumn,
  Header,
  Image,
  Tab,
  TabPane,
} from "semantic-ui-react";
import { Profile } from "../../app/types/profile";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { useAppSelector } from "../../app/store/store";
import { CollectionOptions } from "../../app/hooks/firestore/types";
import { actions } from "../events/eventSlice";
import dayjs from "dayjs";

type Props = {
  profile: Profile;
};

function ProfileEvents({ profile }: Props) {
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
        <GridColumn width={16}>
          <Header floated="left" icon="calendar" content="events" />
        </GridColumn>
        <GridColumn width={16}>
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes}
            onTabChange={(_e, data) =>
              handleSetQuery(data.activeIndex as number)
            }
          />
          <CardGroup itemsPerRow={4} style={{ marginTop: 10 }}>
            {events.map((event) => (
              <Card as={Link} to="/" key={event.id}>
                <Image
                  src={`/categoryImages/${event.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <CardContent>
                  <CardHeader content={event.title} textAlign="center" />
                  <CardMeta textAlign="center">
                    <span>
                      {dayjs(event.date).format("DD-MMM-YYYY h:mm A")}
                    </span>
                  </CardMeta>
                </CardContent>
              </Card>
            ))}
          </CardGroup>
        </GridColumn>
      </Grid>
    </TabPane>
  );
}
export default ProfileEvents;
