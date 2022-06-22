import { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { initUserThunk } from "./store/reducers/user.reducer";
import { initDataThunk, RootState } from "./store";

const Main = lazy(() => import("./pages/main"));
const Add = lazy(() => import("./pages/add"));
const Edit = lazy(() => import("./pages/edit"));

export default function App() {
  const user = useSelector((state: RootState) => state.userState);

  const dispatch = useDispatch();

  //dispatch thunk, and get initial data
  useEffect(() => {
    dispatch(initDataThunk());
    dispatch(initUserThunk());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/user/add" element={<Add />} />
      <Route path="/user/:id/edit" element={<Edit />} />
    </Routes>
  );
}
