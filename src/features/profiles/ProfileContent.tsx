import { useState } from "react";
import { Tab } from "semantic-ui-react";
import ProfileAbout from "./ProfileAbout";
import ProfilePhotos from "./ProfilePhotos";
import ProfileEvents from "./ProfileEvents";
import FollowTab from "./follow/FollowTab";
import { Profile } from "../../app/types/profile";

type Props = {
  profile: Profile;
};

function ProfileContent({ profile }: Props) {
  // const [activeTab, setActiveTab] = useState(0);
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout profile={profile} /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <ProfileEvents /> },
    {
      menuItem: "Followers",
      render: () => <FollowTab />,
    },
    {
      menuItem: "Following",
      render: () => <FollowTab />,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true }}
      panes={panes}
      // onTabChange={(_e, data) => setActiveTab(data.activeIndex as number)}
    />
  );
}
export default ProfileContent;
