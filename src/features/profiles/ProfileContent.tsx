import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/types/profile";
import ProfileAbout from "./ProfileAbout";
import ProfileEvents from "./ProfileEvents";
import ProfilePhotos from "./ProfilePhotos";
import FollowTab from "./follow/FollowTab";

type Props = {
  profile: Profile;
};

function ProfileContent({ profile }: Props) {
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout profile={profile} /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <ProfileEvents profile={profile} /> },
    {
      menuItem: "Followers",
      render: () => <FollowTab />,
    },
    {
      menuItem: "Following",
      render: () => <FollowTab />,
    },
  ];

  return <Tab menu={{ fluid: true }} panes={panes} />;
}
export default ProfileContent;
