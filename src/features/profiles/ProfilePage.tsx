import { Grid, GridColumn } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store/store";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { actions } from "./profileSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useEffect } from "react";

function ProfilePage() {
  const { id } = useParams();
  const { status, data } = useAppSelector((state) => state.profiles);
  const profile = data.find((x) => x.id === id);
  const { loadDocument } = useFireStore("profiles");

  useEffect(() => {
    if (id) loadDocument(id, actions);
  }, [id, loadDocument]);

  if (status === "loading")
    return <LoadingComponent content="Loading profile..." />;

  if (!profile) return <h2>Not found</h2>;

  return (
    <Grid>
      <GridColumn width={16}>
        <ProfileHeader profile={profile} />
        <ProfileContent profile={profile} />
      </GridColumn>
    </Grid>
  );
}
export default ProfilePage;
