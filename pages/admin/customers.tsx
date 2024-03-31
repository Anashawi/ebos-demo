import { useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import * as usersAPI from "../../http-client/users.client";
import { useQuery } from "@tanstack/react-query";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { appContextData } from "../../context";
import { IUser } from "../../models/user";
import { GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";
import { getAll } from "../../services/users.service";

const Customers = ({ users }: { users: IUser[] }) => {
  const { data: session }: any = useSession();

  const { setAppContext } = useContext(appContextData);
  useEffect(() => {
    setAppContext((prev) => ({ ...prev, activeStep: stepNamesEnum.admin }));
  }, []);

  return (
    <article className="main-content">
      <article className="forms-container">
        <h1>Customers</h1>
        <table className="border w-3/5">
          <thead>
            <th className="border font-extrabold text-xl w-52 text-start ps-2">
              <span>Full Name</span>
            </th>
            <th className="border font-extrabold text-xl ps-2 text-start">
              <span>Email</span>
            </th>
            <th className="border font-extrabold text-xl ps-2 text-start w-48">
              <span>Phone Number</span>
            </th>
            <th className="border font-extrabold text-xl ps-2 text-start w-36">
              <span>Role</span>
            </th>
            {/* <th className="border font-extrabold text-xl ps-2 text-start w-52">

                        </th> */}
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index}>
                <td className="border p-1 ps-2 text-lg">
                  <span>{user.fullName}</span>
                </td>
                <td className="border p-1 ps-2 text-lg">
                  <span>{user.email}</span>
                </td>
                <td className="border p-1 ps-2 text-lg">
                  <span>{user.phoneNumber}</span>
                </td>
                <td className="border p-1 ps-2 text-lg">
                  <span>{user.role}</span>
                </td>
                {/* <td className="border p-1 ps-2 text-lg">
                                    <a>Delete User ?</a>
                                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </article>
  );
};

export default Customers;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session: any = await getToken({ req: context.req });
  const users = await getAll();
  console.log(session);

  if (session?.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
};
