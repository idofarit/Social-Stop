import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/types/profile";
import ProfileAbout from "./ProfileAbout";
import ProfileEvents from "./ProfileEvents";
import ProfilePhotos from "./ProfilePhotos";
import FollowTab from "./follow/FollowTab";
import { useState } from "react";

type Props = {
  profile: Profile;
};

function ProfileContent({ profile }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  const panes = [
    { menuItem: "About", render: () => <ProfileAbout profile={profile} /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <ProfileEvents profile={profile} /> },
    {
      menuItem: "Followers",
      render: () => <FollowTab profileId={profile.id} activeTab={activeTab} />,
    },
    {
      menuItem: "Following",
      render: () => <FollowTab profileId={profile.id} activeTab={activeTab} />,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true }}
      panes={panes}
      onTabChange={(_e, data) => setActiveTab(data.activeIndex as number)}
    />
  );
}
export default ProfileContent;
