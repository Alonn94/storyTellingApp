import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchStories } from "../../features/storySlice";

const StoryViewer = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const storyId = Number(id);

  const { stories, loading } = useSelector((state: RootState) => state.story);
  const story = stories.find((s) => s.id === storyId);

  useEffect(() => {
    if (stories.length === 0) {
      dispatch(fetchStories() as any); 
    }
  }, [dispatch, stories.length]);

  if (loading) return <p>Loading...</p>;
  if (!story) return <p>Story not found.</p>;

  return (
    <div>
      <h1>{story.title}</h1>
      <p><strong>Author ID:</strong> {story.author_id}</p>
      <p>{story.content}</p>
      <p><em>Created: {new Date(story.created_at).toLocaleString()}</em></p>
    </div>
  );
};

export default StoryViewer;