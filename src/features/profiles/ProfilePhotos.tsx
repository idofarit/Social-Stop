import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardGroup,
  Grid,
  GridColumn,
  Header,
  Image,
  TabPane,
} from "semantic-ui-react";
import { auth, storage } from "../../app/config/firebase";
import { Photo, Profile } from "../../app/types/profile";
import PhotoUpload from "./PhotoUpload";
import { useAppSelector } from "../../app/store/store";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { actions } from "./photoSlice";
import { updateProfile } from "firebase/auth";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

type Props = {
  profile: Profile;
};

function ProfilePhotos({ profile }: Props) {
  const [editMode, setEditMode] = useState(false);
  const { data: photos, status } = useAppSelector((state) => state.photos);
  const isCurrenUser = auth.currentUser?.uid === profile.id;
  const { loadCollection, remove } = useFireStore(
    `profiles/${profile.id}/photos`
  );
  const { update } = useFireStore("profiles");

  useEffect(() => {
    loadCollection(actions);
  }, [loadCollection]);

  async function handleSubmit(photo: Photo) {
    await update(profile.id, {
      photoURL: photo.url,
    });
    await updateProfile(auth.currentUser!, {
      photoURL: photo.url,
    });
  }

  async function handleDeletePhoto(photo: Photo) {
    try {
      const storageRef = ref(storage, `${profile.id}/user_images/${photo.id}`);
      await deleteObject(storageRef);
      await remove(photo.id);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <TabPane loading={status === "loading"}>
      <Grid>
        <GridColumn width={16}>
          <Header floated="left" icon="photo" content="Photos" />
          {isCurrenUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Add photo"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </GridColumn>

        <GridColumn width={16}>
          {editMode ? (
            <PhotoUpload profile={profile} setEditMode={setEditMode} />
          ) : (
            <>
              <CardGroup itemsPerRow={5}>
                {photos.map((photo) => (
                  <Card key={photo.id}>
                    <Image
                      referrerPolicy="origin-when-cross-origin"
                      src={photo.url}
                    />
                    {isCurrenUser && (
                      <ButtonGroup>
                        <Button
                          onClick={() => handleSubmit(photo)}
                          disabled={photo.url === profile.photoURL}
                          basic
                          color="green"
                        >
                          Main
                        </Button>
                        <Button
                          disabled={photo.url === profile.photoURL}
                          onClick={() => handleDeletePhoto(photo)}
                          basic
                          color="red"
                          icon="trash"
                        ></Button>
                      </ButtonGroup>
                    )}
                  </Card>
                ))}
              </CardGroup>
            </>
          )}
        </GridColumn>
      </Grid>
    </TabPane>
  );
}
export default ProfilePhotos;
