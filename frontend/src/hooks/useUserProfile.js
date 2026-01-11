import { useEffect, useState } from "react";
import { userService } from "../services/userService";

export const useUserProfile = (userId) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [repliesLoading, setRepliesLoading] = useState(true);
  const [error, setError] = useState("");
  const [postsError, setPostsError] = useState("");
  const [repliesError, setRepliesError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await userService.getUserById(userId);
        setUser(data.user);
        setIsOwnProfile(data.isOwnProfile || false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserPosts = async () => {
      try {
        setPostsLoading(true);
        setPostsError("");

        const data = await userService.getUserPosts(userId);
        setPosts(data.posts || []);
      } catch (err) {
        setPostsError(err.message);
      } finally {
        setPostsLoading(false);
      }
    };

    const fetchUserReplies = async () => {
      // Only fetch replies for alumni
      // if (user.role !== "alumni") {
      //   setRepliesLoading(false);
      //   return;
      // }

      try {
        setRepliesLoading(true);
        setRepliesError("");
        const data = await userService.getUserReplies(userId);
        setReplies(data.replies || []);
      } catch (err) {
        setRepliesError(err.message);
        setReplies([]);
      } finally {
        setRepliesLoading(false);
      }
    };

    fetchUserProfile();
    fetchUserPosts();
    fetchUserReplies();
  }, [userId]);

  return {
    user,
    posts,
    replies,
    isOwnProfile,
    loading,
    postsLoading,
    repliesLoading,
    error,
    postsError,
    repliesError,
  };
};
