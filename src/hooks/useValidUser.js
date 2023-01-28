import { useSelector } from 'react-redux';

/**
 * This hook is getting user data from Redux Store,
 * and check if their data is exists in there
 * @returns {Boolean}
 */
const useValidUser = () => {
  const { userToken, userInfo } = useSelector((state) => state.auth);

  const isValidUser = Boolean(userInfo) && Boolean(userToken);

  return isValidUser;
};

export default useValidUser;
