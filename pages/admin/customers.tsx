import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import * as usersAPI from "../../http-client/users.client";
import { stepNamesEnum } from "../../models/enums";
import { appContextData } from "../../context";
import { IUser } from "../../models/user";
import { GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";
import { getAll } from "../../services/users.service";
import { Plus, Pencil, Trash2 } from "lucide-react";
import useModalToggler from "../../hooks/use-modal-toggler";
import Modal from "../../components/common/modal";
import Signup from "../../components/auth/signup";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

const Customers = ({ users }: { users: IUser[] }) => {
  const [isSignupOn, toggleSignupModal] = useModalToggler();
  const { setAppContext } = useContext(appContextData);
  const [wholeUsers, setWholeUsers] = useState(users);
  const [updateUser, setUpdateUser] = useState<IUser>();

  const handleUserAdded = (newUser: any) => {
<<<<<<< HEAD
    console.log(wholeUsers);
=======
>>>>>>> main
    setWholeUsers((prev) => {
      if (updateUser && Object.keys(updateUser).length) {
        return prev.map((elem) => (elem.id === updateUser.id ? newUser : elem));
      }
      return [newUser, ...prev];
    });
    toggleSignupModal(false);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await usersAPI.deleteOne(id);
      setWholeUsers((prev) => {
        return prev.filter((elem) => elem.id !== id);
      });
    } catch (err) {
      console.error(err);
    }
    return true;
  };

  useEffect(() => {
    setAppContext((prev) => ({ ...prev, activeStep: stepNamesEnum.admin }));
  }, []);
  return (
    <>
      <div className="my-10 ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setUpdateUser({} as IUser);
                  toggleSignupModal();
                }}
              >
                <Plus size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add a New User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <article className="md:w-[60vw]: lg:w-[80vw] h-[100vh] overflow-auto mt-10">
        <Table>
          <TableCaption className="text-xl font-bold">Users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] text-lg font-bold">
                Full Name
              </TableHead>
              <TableHead className="w-[150px] text-lg font-bold">
                Email
              </TableHead>
              <TableHead className="w-[200px] text-lg font-bold">
                Phone Number
              </TableHead>
              <TableHead className="w-[100px] text-lg font-bold">
                Role
              </TableHead>
              <TableHead className="w-[100px] text-lg font-bold">
                Status
              </TableHead>
              <TableHead className="text-right text-lg font-bold px-10">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wholeUsers?.reverse().map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium font-hero-semibold ">
                  {user.fullName}
                </TableCell>
                <TableCell className="font-medium font-hero-semibold">
                  {user.email}
                </TableCell>
                <TableCell className="font-hero-semibold font-medium">
                  {user.phoneNumber}
                </TableCell>
                <TableCell className="font-medium font-hero-semibold">
                  {user.role}
                </TableCell>
                <TableCell className="font-medium font-hero-semibold">
                  {user?.activeStatus ? "Active" : "An-Active"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex  flex-row justify-end gap-7 mx-auto ">
                    <button
                      onClick={() => {
                        setUpdateUser(user);
                        toggleSignupModal();
                      }}
                      className="hover:bg-blue-100 p-2 rounded-lg transition"
                    >
                      <Pencil size={20} color="blue" />
                    </button>
                    <button>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <button className="p-2 rounded-lg transition hover:bg-red-100">
                            <Trash2
                              size={24}
                              className="text-red-600 hover:text-red-800"
                            />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[450px] p-6 rounded-xl shadow-lg bg-white">
                          <AlertDialogHeader className="text-center">
                            <AlertDialogTitle className="text-xl font-semibold text-gray-800">
                              Confirm User Deletion
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-sm text-gray-600 mt-2">
                              This action{" "}
                              <span className="font-semibold text-red-600">
                                cannot be undone
                              </span>
                              . The user and all associated data will be
                              permanently removed.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex justify-center space-x-4 mt-4">
                            <AlertDialogCancel className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </article>

      <Modal
        config={{
          isShown: isSignupOn,
          closeCallback: () => toggleSignupModal(false),
          className: "w-full min-w-[320px] max-w-[700px]",
        }}
      >
        <Signup
          closeCallback={() => toggleSignupModal(false)}
          permissionAdmin={true}
          setUsers={handleUserAdded}
          //@ts-ignore
          updateUser={updateUser}
        />
      </Modal>
    </>
  );
};

export default Customers;
