import API from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUsers } from "../redux/userSlice";
import { useCallback, useEffect } from "react";

const useOtherUsers = () => {
  const dispatch = useDispatch();

  const { otherUsers } = useSelector((store) => store.user);

  const fetchOtherUsers = useCallback(async () => {
    try {
      const res = await API.get("/user/otherusers");

      console.log("Full Other Users Response:", res.data);
      dispatch(getOtherUsers(res.data.otherUsers));
    } catch (error) {
      console.log("Failed to fetch other users Error: ", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!otherUsers || otherUsers?.length === 0) {
      fetchOtherUsers();
    }
  }, [fetchOtherUsers, otherUsers]);
};

export default useOtherUsers;
