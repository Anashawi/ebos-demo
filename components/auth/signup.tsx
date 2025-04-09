import { useMutation } from "@tanstack/react-query";
import { authProviderEnum } from "../../models/enums";
import { IUser } from "../../models/user";
import { signIn } from "next-auth/react";
import * as api from "../../http-client/auth.client";
import { updateOne } from "../../http-client/users.client";
import { useState } from "react";
import Spinner from "../common/spinner";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useRouter } from "next/router";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";

interface Props {
  closeCallback: () => void;
  permissionAdmin: boolean;
  setUsers: (user: any) => void;
  updateUser?: IUser | any;
}

const Signup = ({
  closeCallback,
  permissionAdmin = false,
  setUsers,
  //@ts-ignore
  updateUser = {},
}: Props) => {
  const router = useRouter();
  const CheckEditUser = Object.keys(updateUser).length > 0;
  const [activeUser, setActiveUser] = useState(false);
  const [authState, setAuthState] = useState({
    isLoading: false,
    error: "",
  });

  const formik = useFormik({
    initialValues: {
      fullName: updateUser?.fullName || "",
      email: updateUser?.email || "",
      phoneNumber: updateUser?.phoneNumber || "",
      password: "",
      confirmPassword: "",
      role: updateUser?.role || "",
      activeStatus: updateUser.hasOwnProperty("activeStatus")
        ? updateUser.activeStatus
        : activeUser,
    },
    validationSchema: object({
      fullName: string().required("required"),
      email: string().email("wrong email validation").required("required"),
      phoneNumber: string().required("required"),
      password: CheckEditUser ? string() : string().required("required"),
      confirmPassword: CheckEditUser
        ? string()
        : string()
            .required("required")
            .test(
              "password-should-match",
              "Passwords must match",
              function (value) {
                return this.parent.password === value;
              }
            ),
    }),
    onSubmit: (values) => {
      const { confirmPassword, ...payload } = values;
      if (!values.password) {
        //@ts-ignore
        payload.id = updateUser.id;
        //@ts-ignore
        delete payload?.password;
      }
      mutate({
        ...payload,
        provider: authProviderEnum.credentials,
      } as IUser);
    },
  });

  const { mutate, isLoading: signUpLoading } = useMutation<
    { id: string },
    Error,
    IUser
  >(CheckEditUser ? updateOne : api.singUp, {
    onSuccess: async (res) => {
      if (permissionAdmin || CheckEditUser) setUsers(res);
      if (res.id && !permissionAdmin) {
        await trySignIn(
          formik.values.email ?? "",
          formik.values.password ?? ""
        );
      }
    },
    onError: async (err) => {
      const { data: error } = (err as any)?.response;
      if (error) {
        setAuthState({
          isLoading: false,
          error: error.message,
        });
      }
    },
  });

  async function trySignIn(email: string, password: string) {
    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (!result?.error) {
      //handle successful login.. close sign up modal, and stay in place.
      closeCallback();
      router.push("org/goals");
    } else {
      setAuthState((old) => ({
        ...old,
        isLoading: false,
        error: "Invalid Login",
      }));
    }
  }

  return (
    <>
      <div className="flex flex-col p-3 ">
        <div className="flex items-center justify-between min-h-[58px] p-3">
          <div className="flex flex-col gap-5">
            <p className="text-gray-gunmetal text-4xl font-hero-semibold">
              {CheckEditUser ? "Edit user" : "Create new account"}
            </p>
          </div>
        </div>

        {authState.error && (
          <div className="bg-red-100 p-2 mt-2  text-red-900">
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

        {signUpLoading && (
          <div className="flex flex-col items-center justify-center mt-5">
            <Spinner
              className=""
              message="Signing you up, please wait ..."
            ></Spinner>
          </div>
        )}

        <div className="relative flex-auto p-3 overflow-auto">
          <div id="validation-errors"></div>
          {/* submit form then redirect to app/goals */}
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 ">
            <div>
              <input
                id="fullName"
                type="text"
                placeholder="Full Name"
                className="light-input w-full text-[1rem]"
                {...formik.getFieldProps("fullName")}
              />
              {formik.errors?.fullName && (
                <div className="pl-4 text-rose-400 text-[1rem]">
                  {formik.errors.fullName as string}
                </div>
              )}
            </div>
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
                  {formik.errors.email as string}
                </div>
              )}
            </div>
            <div>
              <input
                id="phoneNumber"
                type="text"
                placeholder="Phone Number"
                className="light-input w-full text-[1rem]"
                {...formik.getFieldProps("phoneNumber")}
              />
              {formik.errors?.phoneNumber && (
                <div className="pl-4 text-rose-400 text-[1rem]">
                  {formik.errors.phoneNumber as string}
                </div>
              )}
            </div>
            {!CheckEditUser && (
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
            )}
            {!CheckEditUser && (
              <div>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="light-input w-full text-[1rem]"
                  {...formik.getFieldProps("confirmPassword")}
                />
                {formik.errors?.confirmPassword && (
                  <div className="pl-4 text-rose-400 text-[1rem]">
                    {formik.errors.confirmPassword}
                  </div>
                )}
              </div>
            )}
            {permissionAdmin && (
              <div className="flex items-center space-x-4 my-5 mx-3 p-3 bg-gray-50 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
                <Switch
                  checked={formik.values.activeStatus}
                  onCheckedChange={() => {
                    setActiveUser(!formik.values.activeStatus);
                    formik.setFieldValue(
                      "activeStatus",
                      !formik.values.activeStatus
                    );
                  }}
                  id="status-mode"
                  className="transition-colors duration-200"
                />
                <Label
                  htmlFor="status-mode"
                  className="text-lg font-semibold text-gray-800 dark:text-gray-200"
                >
                  Active Status
                </Label>
              </div>
            )}
            {permissionAdmin && (
              <>
                <div className="flex flex-col justify-center gap-5">
                  <label
                    htmlFor="role"
                    className="block text-lg font-medium text-gray-700 "
                  >
                    Choose a role:
                  </label>
                  <select
                    id="role"
                    {...formik.getFieldProps("role")}
                    className="w-full p-3  bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  >
                    <option value="admin">Admin</option>
                    <option value="client">Client</option>
                  </select>
                </div>
                {formik.errors?.role && (
                  <div className="pl-4 text-rose-400 text-[1rem]">
                    {formik.errors.role as string}
                  </div>
                )}
              </>
            )}
            <div className="flex justify-end">
              <button type="submit" className="btn-rev">
                {CheckEditUser ? "Update" : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
