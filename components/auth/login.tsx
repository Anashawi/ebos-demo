import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { object, string } from "yup";
import Spinner from "../common/spinner";
import { insertOne } from "../../http-client/activity-logs";

interface Props {
  closeCallback: () => void;
  openReset: () => void; // ← add this
}

const Login = ({ closeCallback, openReset }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [authState, setAuthState] = useState({
    isLoading: false,
    error: "",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: object({
      email: string().email("wrong email validation").required("required"),
      password: string().required("required"),
    }),
    onSubmit: async (values) => {
      await login();
    },
  });

  async function login() {
    if (!formik.values.email || !formik.values.password) {
      setAuthState((old) => ({
        ...old,
        isLoading: false,
        error: "Invalid Login",
      }));
      return;
    }
    setAuthState((old) => ({ ...old, isLoading: true, error: "" }));
    await trySignIn(formik.values.email, formik.values.password);
  }

  async function trySignIn(email: string, password: string) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (!result?.error) {
        //login is successful.. close login model
        closeCallback();
        //@ts-ignore
        const result = await insertOne({
          action: "Login",
          createdBy: email || "unknown",
          typeOfAction: "Auth",
        });

        router.push("org/goals");
      } else {
        setAuthState((old) => ({
          ...old,
          isLoading: false,
          error: "Invalid Login",
        }));
      }
    } catch (err) {
      setAuthState((old) => ({
        ...old,
        isLoading: false,
        error: "Invalid Login",
      }));
    }
  }

  return (
    <div className="flex flex-col gap-7 p-5">
      <div className="flex items-center justify-between min-h-[58px]">
        <div className="flex flex-col gap-3">
          <p className="text-4xl font-hero-semibold">Login</p>
          <p className="text-2xl text-gray-gunmetal">
            login to your existing account
          </p>
        </div>
      </div>

      {authState.error && (
        <div className="bg-red-100 p-2 mt-2 rounded-md text-red-900">
          {authState.error}
        </div>
      )}

      {authState.isLoading && (
        <div className="flex flex-col items-center justify-center mt-5">
          <Spinner
            className=""
            message="trying to login, please wait ..."
          ></Spinner>
        </div>
      )}

      <div className="relative flex-auto overflow-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5 text-gray-700"
        >
          <div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="light-input w-full text-[1rem]"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && (
              <div className="pl-4 text-rose-400 text-[1rem]">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="light-input w-full text-[1rem]"
              {...formik.getFieldProps("password")}
            />
            {formik.errors?.password && (
              <div className="pl-4 text-rose-400 text-[1rem]">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div
            className="text-lg text-primary hover:underline cursor-pointer"
            onClick={() => {
              openReset();
            }}
          >
            Forgot your password?
          </div>{" "}
          <div className="flex justify-end">
            <button type="submit" className="btn-rev">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
