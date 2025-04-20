import React, { useEffect, useContext } from "react";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { appContextData } from "../../context";
import { GetServerSidePropsContext } from "next";
import { IUser } from "../../models/user";
import { getToken } from "next-auth/jwt";
import { getAll } from "../../services/users.service";
import { getAll as getLogs } from "../../services/activity-logs.service";
import { getAll as getSubscribers } from "../../services/payments.service";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import Customers from "./customers";
import ActivityLogs from "./activityLogs";
import Subscriptions from "./subscriptions";
import { IActivityLogs } from "../../models/activity-logs";
import { IPayment } from "../../models/payments";

function AdminPanel({
  users,
  logs,
  subscribers,
}: {
  users: IUser[];
  logs: IActivityLogs[];
  subscribers: IPayment[];
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
          <TabsTrigger value="Activity-logs" className="h-10 text-xl">
            Activity Logs
          </TabsTrigger>
          <TabsTrigger value="Subscriptions" className="h-10 text-xl">
            Subscriptions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Customers">
          <Customers users={users} />
        </TabsContent>
        <TabsContent value="Activity-logs">
          <ActivityLogs logs={logs} />
        </TabsContent>
        <TabsContent value="Subscriptions">
          <Subscriptions subscribers={subscribers} />
        </TabsContent>
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
  const subscribers = await getSubscribers();

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
      subscribers: JSON.parse(JSON.stringify(subscribers)),
    },
  };
};
