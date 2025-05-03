// src/features/storySlice.ts
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const StoryList = () => {
    const stories = useSelector((state: RootState) => state.story.stories);
  
    return (
      <div>
        <h2>Stories</h2>
        <ul>
          {stories.map((story, index) => (
            <li key={index}>{story.title}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default StoryList;