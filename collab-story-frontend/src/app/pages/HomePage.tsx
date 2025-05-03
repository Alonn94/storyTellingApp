// pages/HomePage.tsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStories } from "../../features/storySlice";
import { RootState } from "../../store/store";
import LogoutButton from "../components/LogoutButton";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { stories, loading, error } = useSelector((state: RootState) => state.story);

  useEffect(() => {
    dispatch(fetchStories() as any);
  }, [dispatch]);

  return (
    <div>
    <LogoutButton />
      <h1>All Stories</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <h3><Link to={`/stories/${story.id}`}>{story.title}</Link></h3>
            <p>{story.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;