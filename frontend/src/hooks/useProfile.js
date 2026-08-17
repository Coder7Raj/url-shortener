import useProfileStore from "../store/profile.store.js";

const useProfile = () => {
  const profile = useProfileStore((state) => state.profile);

  const isLoading = useProfileStore((state) => state.isLoading);

  const isUpdating = useProfileStore((state) => state.isUpdating);

  const isChangingPassword = useProfileStore(
    (state) => state.isChangingPassword,
  );

  const error = useProfileStore((state) => state.error);

  const fetchProfile = useProfileStore((state) => state.fetchProfile);

  const updateProfile = useProfileStore((state) => state.updateProfile);

  const changePassword = useProfileStore((state) => state.changePassword);

  const clearError = useProfileStore((state) => state.clearError);

  const clearProfile = useProfileStore((state) => state.clearProfile);

  return {
    profile,

    isLoading,
    isUpdating,
    isChangingPassword,

    error,

    fetchProfile,
    updateProfile,
    changePassword,

    clearError,
    clearProfile,
  };
};

export default useProfile;
