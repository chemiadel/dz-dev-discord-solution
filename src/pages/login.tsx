// import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateUserThunk } from "../store";
import { useDispatch } from "react-redux";

interface ILogin {
  email: string;
  password: string;
}

const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILogin>();

  const onSubmit = (data: ILogin) => {
    axios.post(`${process.env.REACT_APP_API_URL}/login`, data).then((res) => {
      console.log({ res });
      if (res.status === 200) dispatch(updateUserThunk(res.data.token));
    });
  };

  return (
    <div>
      {/*Main */}
      <main className="relative flex min-h-screen px-10">
        {/*Background image */}
        <div className="absolute bottom-0 left-0 z-10">
          <img className="z-10" src="Mask_Group.png" />
        </div>
        {/*Form */}
        <div
          id="login-form"
          className="w-4/3 sm:w-2/3 md:w-2/3 xl:w-2/4 bg-white flex flex-col justify-center space-y-8 py-10 px-10  h-96 shadow-xl rounded-xl m-auto z-50"
        >
          <div className="w-full flex flex-col space-y-6">
            {/*Email */}
            <div className="input-form">
              <input
                defaultValue={`johndoe66@gmail.com`}
                placeholder="Email Address"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
              />
              {errors.email && (
                <label className="error-label">{errors.email.message}</label>
              )}
            </div>
            {/*Password */}
            <div className="input-form">
              <div className="relative">
                <input
                  defaultValue={`somePassword`}
                  placeholder="Password"
                  type={show ? "text" : "password"}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  {...register("password", {
                    required: {
                      message: "Field required",
                      value: true,
                    },
                  })}
                />
                <button
                  className="absolute right-2 top-2"
                  onClick={() => setShow((prev) => !prev)}
                >
                  {!show ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <label className="error-label">{errors.password.message}</label>
              )}
            </div>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="rounded bg-indigo-600 text-white p-2 font-bold"
          >
            Login
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
