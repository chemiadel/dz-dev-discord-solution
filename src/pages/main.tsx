import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteData, initDataThunk, resetUserThunk } from "../store/reducers";
import { RootState } from "../store";

interface IUser {
  id: 1;
  name: "Vi Eslie";
  username: "veslie0";
  email: "veslie0@digg.com";
}

const Main = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const [sort, setSort] = useState<boolean>();
  const data = useSelector((state: RootState) => state.dataState.data);
  const dispatch = useDispatch();

  //open delete modal and change selected id
  function handleDelete(id: number) {
    setSelected(id);
    setOpen(true);
  }

  return (
    <div className="flex flex-col space-y-6 p-4 border-2 rounded-md">
      {/**Header */}
      <div className="flex flex-row items-center space-x-2">
        <h1 className="text-3xl font-bold flex-grow">Dashboard</h1>
        <Link to={`/add`}>
          <button
            onClick={() => {}}
            className="rounded-md bg-blue-500 text-white font-bold p-2"
          >
            Add User
          </button>
        </Link>
        <button
          onClick={() => {
            dispatch(resetUserThunk());
          }}
          className="rounded-md border-2 border-red-500 text-red-500 font-bold p-2"
        >
          Logout
        </button>
      </div>
      <hr />
      {/**Table */}
      <table className="space-y-8 rounded-md border-collapse">
        <thead>
          <tr className="text-center bg-gray-50 text-xs h-12 border-y-2">
            <th>id</th>
            <th>Name</th>
            <th
              className=" cursor-pointer"
              onClick={() => setSort((prev) => !prev)}
            >
              Username
              <span className="font-thin">
                {typeof sort === "boolean" ? (sort ? " A-Z" : " Z-A") : ""}
              </span>
            </th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id} className="text-xs text-center h-10">
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/edit/${user.id}`}>
                  <button className="rounded-md w-full bg-yellow-500 text-white font-bold p-2">
                    Edit
                  </button>
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="rounded-md w-full bg-red-500 text-white font-bold p-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteModal selected={selected} state={open} toggle={setOpen} />
    </div>
  );
};

//Delete modal
const DeleteModal = ({
  state,
  toggle,
  selected,
}: {
  state?: boolean;
  toggle: (prevState: boolean) => void;
  selected: number;
}) => {
  const dispatch = useDispatch();

  //close modal
  function handleClose() {
    toggle(false);
  }

  //delete modal
  function handleDelete() {
    const payload = {
      id: selected,
    };

    //dispatch remove with user id
    dispatch(deleteData(payload));
    toggle(false);
  }

  return (
    <>
      {state && (
        <div className=" z-50 flex items-center justify-center fixed left-0 bg-black bg-opacity-50 bottom-0 w-full h-full ">
          <div className="bg-white rounded-lg sm:w-2/3 lg:w-1/2 border-2 ">
            <div className="flex flex-col items-start p-6 space-y-8 ">
              <div className="flex items-center w-full space-s-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <div className="text-gray-900 font-bold text-xl md:text-2xl lg:text-4xl">
                  Delete Confirmation
                </div>
              </div>
              <div className="ml-auto space-x-2">
                <button
                  onClick={handleClose}
                  className="bg-transparent hover:bg-gray-100 font-semibold py-2 px-4 border border-black rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded border border-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
