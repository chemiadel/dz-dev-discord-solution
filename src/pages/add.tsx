import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addData } from "../store";

const Add = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  //reset error onChange
  useEffect(() => {
    setNameError("");
    setEmailError("");
  }, [name, email]);

  //handling validation and submittion
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    //validate email

    //validate name

    //validate
    const payload = {
      name,
      email,
    };

    dispatch(addData(payload));
    navigate("/main");
  }

  return (
    <div className="flex flex-col space-y-6 p-4 border-2 rounded-md">
      {/**Header */}
      <div className="flex flex-row items-center space-x-4">
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 rounded-full p-2 hover:bg-gray-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
        </Link>
        <h1 className="text-3xl font-bold flex-grow">Add User</h1>
      </div>
      <hr />
      {/**From */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-2">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 outline-none border-2 rounded-md focus:ring-4"
            placeholder="Name"
          />
          <label className="text-red-500">{nameError}</label>
        </div>
        <div className="flex flex-col space-y-2">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 outline-none border-2 rounded-md focus:ring-4"
            placeholder="Email"
          />
          <label className="text-red-500">{emailError}</label>
        </div>
        <div className="flex flex-row items-center justify-end space-x-2">
          <Link to="/">
            <button type="submit" className="rounded-md borde font-bold p-2">
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="rounded-md bg-blue-500 text-white font-bold p-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
