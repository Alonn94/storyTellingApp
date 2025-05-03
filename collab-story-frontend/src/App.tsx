import { Provider } from "react-redux";
import { store } from "./store/store";
import { Routes, Route } from "react-router-dom";
import HomePage from "./app/pages/HomePage";
import LoginPage from "./app/pages/LoginPage";
import SignupPage from "./app/pages/SignupPage";
import StoryViewer from "./app/pages/StoryViewer";


const App = () => {
  return (
    <Provider store={store}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/stories/:id" element={<StoryViewer />} />
    </Routes>
    </Provider>
  );
};

export default App;