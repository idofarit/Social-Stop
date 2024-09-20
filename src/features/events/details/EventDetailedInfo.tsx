import {
  Grid,
  GridColumn,
  Icon,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import { AppEvent } from "../../../app/types/event";
import dayjs from "dayjs";

type Props = {
  event: AppEvent;
};

function EventDetailedInfo({ event }: Props) {
  return (
    <SegmentGroup>
      <Segment attached="top">
        <Grid>
          <GridColumn width={1}>
            <Icon size="large" color="teal" name="info" />
          </GridColumn>
          <GridColumn width={15}>
            <p>{event.description}</p>
          </GridColumn>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <GridColumn width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </GridColumn>
          <GridColumn width={15}>
            <span>{dayjs(event.date).format("DD-MMM-YYYY h:mm A")}</span>
          </GridColumn>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <GridColumn width={1}>
            <Icon name="marker" size="large" color="teal" />
          </GridColumn>
          <GridColumn width={11}>
            <span>{event.venue}</span>
          </GridColumn>
          {/* <GridColumn width={4}>
            <Button color="teal" size="tiny" content="Show Map" />
          </GridColumn> */}
        </Grid>
      </Segment>
    </SegmentGroup>
  );
}
export default EventDetailedInfo;
