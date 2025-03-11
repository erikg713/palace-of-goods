import userIcon from "../assets/icons/user-icon.svg";

const UserProfile = () => {
  return (
    <button className="user-profile-btn" type="button" aria-label="User Profile">
      <img className="user-icon" src={userIcon} alt="User Profile" />
    </button>
  );
};

export default UserProfile;
