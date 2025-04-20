import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { XCircle, CheckCircle } from "lucide-react";
import { IPayment } from "../../models/payments";
const Subscriptions = ({ subscribers }: { subscribers: IPayment[] }) => {
  console.log(subscribers);
  const subscriptions = [
    {
      id: "1",
      username: "AnasAlhawi",
      createdAt: "2025-04-05",
      status: "active",
    },
    {
      id: "2",
      username: "OmarMango",
      createdAt: "2025-04-04",
      status: "active",
    },
  ];
  return (
    <div>
      <article className="md:w-[60vw]: lg:w-[80vw] h-[100vh] overflow-auto mt-10">
        <Table>
          <TableCaption className="text-xl font-bold">
            Subscriptions
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] text-lg font-bold">
                username
              </TableHead>
              <TableHead className="w-[150px] text-lg font-bold">
                subscription date
              </TableHead>
              <TableHead className="w-[150px] text-lg font-bold">
                subscription expire date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((subs) => (
              <TableRow key={subs.id}>
                {/* Assuming each log has a unique id */}
                <TableCell className="font-medium font-hero-semibold ">
                  {subs.userName} {/* Replace with actual log properties */}
                </TableCell>
                <TableCell className="font-medium font-hero-semibold ">
                  {new Date(subs.subscriptionDate).toLocaleDateString()}
                  {/* Replace with actual log properties */}
                </TableCell>
                <TableCell className="font-medium font-hero-semibold ">
                  {new Date(
                    subs.subscriptionExpirationDate
                  ).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter></TableFooter>
        </Table>
      </article>
    </div>
  );
};

export default Subscriptions;
