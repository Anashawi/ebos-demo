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
const Subscriptions = () => {
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
                status
              </TableHead>
              <TableHead className="text-right text-lg font-bold px-10">
                actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((subs) => (
              <TableRow key={subs.id}>
                {/* Assuming each log has a unique id */}
                <TableCell className="font-medium font-hero-semibold ">
                  {subs.username} {/* Replace with actual log properties */}
                </TableCell>
                <TableCell className="font-medium font-hero-semibold ">
                  {subs.createdAt} {/* Replace with actual log properties */}
                </TableCell>
                <TableCell className="font-medium font-hero-semibold ">
                  {subs.status}
                </TableCell>

                <TableCell className="font-medium font-hero-semibold ">
                  <div className="flex  flex-row justify-end gap-7 mx-auto ">
                    <button
                      onClick={() => {}}
                      className="hover:bg-blue-100 p-2 rounded-lg transition"
                    >
                      <CheckCircle size={20} color="blue" />
                    </button>
                    <button
                      onClick={() => {}}
                      className="hover:bg-blue-100 p-2 rounded-lg transition"
                    >
                      <XCircle size={20} color="blue" />
                    </button>
                  </div>
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
