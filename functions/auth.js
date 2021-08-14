import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${NEXT_PUBLIC_URL}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${NEXT_PUBLIC_URL}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
