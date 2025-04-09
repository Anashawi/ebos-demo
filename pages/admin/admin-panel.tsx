import React, { useEffect, useContext } from "react";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { appContextData } from "../../context";
import { GetServerSidePropsContext } from "next";
import { IUser } from "../../models/user";
import { getToken } from "next-auth/jwt";
import { getAll } from "../../services/users.service";
import { getAll as getLogs } from "../../services/activity-logs.service";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import Customers from "./customers";
import ActivityLogs from "./activityLogs";
<<<<<<< HEAD
import { IActivityLogs } from "../../models/activity-logs";
import { Logs } from "lucide-react";
=======
import Subscriptions from "./subscriptions";
import { IActivityLogs } from "../../models/activity-logs";
>>>>>>> main

function AdminPanel({
  users,
  logs,
}: {
  users: IUser[];
  logs: IActivityLogs[];
}) {
  const { setAppContext } = useContext(appContextData);

  useEffect(() => {
    setAppContext((prev) => ({ ...prev, activeStep: stepNamesEnum.admin }));
  }, []);
  return (
    <>
      <Tabs defaultValue="Customers" className="w-[400px]">
        <TabsList className="grid  grid-cols-3  w-[500px]">
          <TabsTrigger className="h-10 text-xl" value="Customers">
            Customers
          </TabsTrigger>
<<<<<<< HEAD
          <TabsTrigger value="activity-logs" className="h-10 text-xl">
            Activity Logs
          </TabsTrigger>
          <TabsTrigger value="Video" className="h-10 text-xl">
            Videos Content
=======
          <TabsTrigger value="Activity-logs" className="h-10 text-xl">
            Activity Logs
          </TabsTrigger>
          <TabsTrigger value="Subscriptions" className="h-10 text-xl">
            Subscriptions
>>>>>>> main
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Customers">
          <Customers users={users} />
        </TabsContent>
<<<<<<< HEAD
        <TabsContent value="activity-logs">
          <ActivityLogs logs={logs} />
        </TabsContent>
=======
        <TabsContent value="Activity-logs">
          <ActivityLogs logs={logs} />
        </TabsContent>
        <TabsContent value="Subscriptions">
          <Subscriptions />
        </TabsContent>
>>>>>>> main
      </Tabs>
    </>
  );
}

export default AdminPanel;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session: any = await getToken({ req: context.req });
  const users = await getAll();
  const logs = await getLogs();
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
      logs: JSON.parse(JSON.stringify(logs)),
      users: JSON.parse(JSON.stringify(users)),
    },
  };
};
