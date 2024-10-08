import { updateProfile } from "firebase/auth";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
import { batchSetPhoto } from "../../app/actions/fireStoreActions";
import { auth, storage } from "../../app/config/firebase";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { useAppSelector } from "../../app/store/store";
import { Photo, Profile } from "../../app/types/profile";
import { actions } from "./photoSlice";
import PhotoUpload from "./PhotoUpload";

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

  useEffect(() => {
    loadCollection(actions);
  }, [loadCollection]);

  async function handleSetMain(photo: Photo) {
    await batchSetPhoto(photo.url);
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
                          onClick={() => handleSetMain(photo)}
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
