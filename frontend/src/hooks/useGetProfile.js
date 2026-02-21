import { useEffect } from "react";
import API from "../api/axios";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!id) return;

        let res;

        if (id === "me") {
          res = await API.get("/user/me");
        } else {
          res = await API.get(`/user/profile/${id}`);
        }

        dispatch(getMyProfile(res.data.user));
      } catch (error) {
        console.log("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [id, dispatch]);
};

export default useGetProfile;
