import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addData, editData, IData, RootState } from "../store";

const Edit = () => {
  const { data, loading } = useSelector((state: RootState) => state.dataState);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IData>();

  useEffect(() => {
    if (params.id && data) {
      const findUser = data.filter((item) => item.id.toString() === params.id);

      //if no user found redirect to main
      if (findUser.length === 0) navigate("/");

      reset(findUser[0]);
    }
  }, [data, params]);

  //handling validation and submittion
  function onSubmit(data: IData) {
    dispatch(editData(data));
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <div className="flex flex-col space-y-2">
          <label>Name</label>
          <input
            {...register("name", {
              required: {
                message: "Field required",
                value: true,
              },
            })}
            className="p-2 outline-none border-2 rounded-md focus:ring-4"
            placeholder="Name"
          />
          <label className="text-red-500">{errors.name?.message}</label>
        </div>
        <div className="flex flex-col space-y-2">
          <label>Email</label>
          <input
            {...register("email", {
              required: {
                message: "Field required",
                value: true,
              },
              pattern: {
                message: "Invalide Email Address",
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/,
              },
            })}
            className="p-2 outline-none border-2 rounded-md focus:ring-4"
            placeholder="Email"
          />
          <label className="text-red-500">{errors.email?.message}</label>
        </div>
        <div className="flex flex-col space-y-2">
          <label>Username</label>
          <input
            {...register("username", {
              required: {
                message: "Field required",
                value: true,
              },
            })}
            className="p-2 outline-none border-2 rounded-md focus:ring-4"
            placeholder="Email"
          />
          <label className="text-red-500">{errors.username?.message}</label>
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

export default Edit;
