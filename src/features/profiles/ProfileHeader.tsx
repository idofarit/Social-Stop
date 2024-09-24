import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
import { batchFollowToggle } from "../../app/actions/fireStoreActions";
import { auth, db } from "../../app/config/firebase";
import { useAppDispatch } from "../../app/store/store";
import { Profile } from "../../app/types/profile";
import { actions } from "./profileSlice";

type Props = {
  profile: Profile;
};

function ProfileHeader({ profile }: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const docRef = doc(
      db,
      `profiles/${profile.id}/followers/${auth.currentUser?.uid}`
    );
    getDoc(docRef).then((docSnap) => {
      dispatch(
        actions.setFollowing({ id: profile.id, isFollowing: docSnap.exists() })
      );
    });
  }, [dispatch, profile.id]);

  async function handleFollowToggle(follow: boolean) {
    if (!profile.id || !auth.currentUser?.uid) return;
    setLoading(true);
    try {
      await batchFollowToggle(profile, follow);
      dispatch(actions.setFollowing({ id: profile.id, isFollowing: follow }));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

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
            <Statistic label="Followers" value={profile.followerCount || 0} />
            <Statistic label="Following" value={profile.followingCount || 0} />
          </StatisticGroup>

          <Divider />

          <Reveal animated="move">
            <RevealContent visible style={{ width: "100%" }}>
              <Button
                fluid
                color="teal"
                content={profile.isFollowing ? "Following" : "Not following"}
              />
            </RevealContent>
            <RevealContent hidden style={{ width: "100%" }}>
              <Button
                basic
                fluid
                color={profile.isFollowing ? "red" : "teal"}
                content={profile.isFollowing ? "Unfollow" : "Follow"}
                onClick={() => handleFollowToggle(!profile.isFollowing)}
                loading={loading}
              />
            </RevealContent>
          </Reveal>
        </GridColumn>
      </Grid>
    </Segment>
  );
}
export default ProfileHeader;
