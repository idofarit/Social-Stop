import { Button, Grid, GridColumn, Header, TabPane } from "semantic-ui-react";
import { Profile } from "../../app/types/profile";
import { useState } from "react";
import ProfileForm from "./ProfileForm";
import { auth } from "../../app/config/firebase";

type Props = {
  profile: Profile;
};

function ProfileAbout({ profile }: Props) {
  const [editMode, setEditMode] = useState(false);
  const isCurrenUser = auth.currentUser?.uid === profile.id;

  return (
    <TabPane>
      <Grid>
        <GridColumn width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile.displayName}`}
          />
          {isCurrenUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit profle"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </GridColumn>

        <GridColumn width={16}>
          {editMode ? (
            <ProfileForm profile={profile} setEditMode={setEditMode} />
          ) : (
            <>
              <div style={{ marginBottom: 10 }}>
                <strong>Member since: {profile.createdAt}</strong>
                <div style={{ marginTop: 10 }}>{profile.description}</div>
              </div>
            </>
          )}
        </GridColumn>
      </Grid>
    </TabPane>
  );
}
export default ProfileAbout;
