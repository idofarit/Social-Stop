import {
  Button,
  Divider,
  Grid,
  GridColumn,
  Header,
  Item,
  ItemContent,
  ItemGroup,
  ItemImage,
  Reveal,
  RevealContent,
  Segment,
  Statistic,
  StatisticGroup,
} from "semantic-ui-react";
import { Profile } from "../../app/types/profile";

type Props = {
  profile: Profile;
};

function ProfileHeader({ profile }: Props) {
  return (
    <Segment>
      <Grid>
        <GridColumn width={12}>
          <ItemGroup>
            <Item>
              <ItemImage
                referrerPolicy="origin-when-cross-origin"
                avatar
                size="small"
                src={profile.photoURL || "/user.png"}
              />
              <ItemContent verticalAlign="middle">
                <Header
                  as="h1"
                  style={{ display: "block", marginBottom: 10 }}
                  content={profile.displayName}
                />
              </ItemContent>
            </Item>
          </ItemGroup>
        </GridColumn>
        <GridColumn width={4}>
          <StatisticGroup>
            <Statistic label="Followers" value={15} />
            <Statistic label="Following" value={10} />
          </StatisticGroup>

          <Divider />

          <Reveal animated="move">
            <RevealContent visible style={{ width: "100%" }}>
              <Button fluid color="teal" content="Following" />
            </RevealContent>
            <RevealContent hidden style={{ width: "100%" }}>
              <Button basic fluid color="red" content="Unfollow" />
            </RevealContent>
          </Reveal>
        </GridColumn>
      </Grid>
    </Segment>
  );
}
export default ProfileHeader;
