import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Registerpage from "./pages/Registerpage";
import UserContextProvider from "./UserContextProvider";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import Editpost from "./pages/Editpost";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<Registerpage />} />
          <Route path={"/create"} element={<CreatePost />} />
          <Route path={"/post/:id"} element={<PostPage />} />
          <Route path={"/edit/:id"} element={<Editpost/>}/>

        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
