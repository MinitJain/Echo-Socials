import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import API from "../api/axios";
import { getAllTweets } from "../redux/tweetSlice";
import Tweet from "./Tweet";

const PublicFeed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { tweets } = useSelector((store) => store.tweet);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await API.get("/tweet/allTweets");
        dispatch(getAllTweets(res.data.tweets));
      } catch (err) {
        console.error("Failed to fetch tweets:", err);
        setError("Failed to load tweets");
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="mx-auto max-w-2xl">
        <div className="border-b border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">👋</span>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                You're viewing Echo's public feed. Sign up to interact!
              </p>
            </div>
            {user ? (
              <button
                onClick={() => navigate("/home")}
                className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Go to Home
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>

        <div className="px-4 py-6 sm:px-5">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <span className="ml-3 text-sm text-zinc-500 dark:text-zinc-400">
                Loading public feed...
              </span>
            </div>
          )}

          {error && (
            <div className="py-12 text-center">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {!loading && !error && tweets.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No public tweets yet. Be the first to share!
              </p>
            </div>
          )}

          {!loading && !error && tweets.length > 0 && (
            <div className="space-y-0">
              {tweets.map((tweet) => (
                <Tweet key={tweet._id} tweet={tweet} readOnly={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicFeed;
