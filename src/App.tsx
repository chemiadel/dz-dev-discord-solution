import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { initUserThunk } from "./store/reducers/user.reducer";
import { initDataThunk, RootState } from "./store";

const Main = lazy(() => import("./pages/main"));
const Add = lazy(() => import("./pages/add"));
const Edit = lazy(() => import("./pages/edit"));
const Login = lazy(() => import("./pages/login"));

export default function App() {
  const { user, loading } = useSelector((state: RootState) => state.userState);

  const dispatch = useDispatch();

  //dispatch thunk, and get initial data
  useEffect(() => {
    dispatch(initUserThunk());
  }, []);

  //init data
  useEffect(() => {
    if (user && !loading) dispatch(initDataThunk());
  }, [user, loading]);

  if (loading) return <div>loading...</div>;

  if (!loading && !user)
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to={`/login`} />} />
        </Routes>
      </Suspense>
    );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<Navigate to={`/`} />} />
      </Routes>
    </Suspense>
  );
}
