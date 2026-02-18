import { useEffect, useCallback } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/userSlice";

const useOtherUsers = (id) => {
  const dispatch = useDispatch();

  const fetchOtherUsers = useCallback(async () => {
    if (!id) return;

    try {
      const res = await axios.get(`${USER_API_END_POINT}/otherusers`, {
        withCredentials: true,
      });

      dispatch(getOtherUsers(res.data.otherUsers));
    } catch (error) {
      console.log("Failed to fetch other users:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchOtherUsers();
  }, [fetchOtherUsers]);
};

export default useOtherUsers;
