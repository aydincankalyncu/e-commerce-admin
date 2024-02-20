import  { useState } from "react";
import { useMutation } from "react-query";
import { TEInput, TERipple } from "tw-elements-react";
import axiosClient from "../../api/axios";
import { BaseResult } from "../../utils/results";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

interface LoginCredentials {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation((data : LoginCredentials) => axiosClient.post<BaseResult>("auth/signin", data).then((res) => res.data),
  {
    onSuccess: (data) => {
      if(!data.hasError)
      {
        navigate("/categories");
      }
      else
      {
        toast.error("Check your credentials", {
        });
      }
    }
  });
  const handleLogin = (e: any) => {
    e.preventDefault();
    mutation.mutate({email: email, password: password});

  }
  return (
    <section className="h-screen">
      <div className="h-full">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleLogin}>
             <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                  Sign In
                </p>
              </div>

              {/* <!-- Email input --> */}
              <TEInput
                type="email"
                label="Email address"
                size="lg"
                className="mb-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
                type="password"
                label="Password"
                className="mb-6"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></TEInput>

              {/* <!-- Login button --> */}
              <div className="text-center lg:text-center">
                <TERipple rippleColor="light">
                  <button
                    type="submit"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Login
                  </button>
                </TERipple>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
}
