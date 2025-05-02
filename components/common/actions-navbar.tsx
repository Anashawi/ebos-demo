import { useContext, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import {
  stepNamesEnum,
  tooltipDirectionsEnum,
  AIAssistant,
} from "../../models/enums";
import { appContextData } from "../../context";

import ConsultantReview from "./consultant-review";
import Tooltip from "./tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faComment,
  faCommentSlash,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "../ui/button";

import { KeyRound } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
interface Props {
  selectedStepTitle: stepNamesEnum;
}

const ActionsNavbar = ({ selectedStepTitle: displayedPageTitle }: Props) => {
  const { data: session }: any = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { appContext, setAppContext } = useContext(appContextData);

  return (
    <nav className="main-navigation">
      {/* the parent of Tooltip must have the following css classes: "group relative" to work properly */}
      <main className="nav-section-ul">
        <li>
          <Image width="55" height="55" src="/cp.svg" alt="CaseInPoint" />
        </li>
        <li className="group relative hover:animate-shake">
          <Link href="/">
            <Image
              width="42"
              height="42"
              src="/dashboard.svg"
              alt="Dashboard"
            />
          </Link>
          <Tooltip dir={tooltipDirectionsEnum.bottom}>Dashboard</Tooltip>
        </li>
        <li className="group relative hover:animate-shake">
          <ConsultantReview pageTitle={displayedPageTitle}>
            <Image
              width="45"
              height="45"
              src="/consultations.svg"
              alt="Consultations"
            />
          </ConsultantReview>
          <Tooltip dir={tooltipDirectionsEnum.bottom}>
            <p className="w-max">
              <strong>Request </strong> for consultant review
            </p>
          </Tooltip>
        </li>
        {session?.user?.role === "admin" && (
          <li className="group relative hover:animate-shake">
            <Link href="/admin/admin-panel">
              <Image
                width="45"
                height="45"
                src="/users-svgrepo-com.svg"
                alt="Customers"
              />
            </Link>
            <Tooltip dir={tooltipDirectionsEnum.bottom}>
              <p className="w-max">
                <strong>Go to </strong> Admin Panel
              </p>
            </Tooltip>
          </li>
        )}
      </main>
      <ul className="nav-section-ul">
        <li>
          <div className="relative flex flex-col items-center gap-4 font-hero-semibold text-[#4e79b2]">
            <h1>{session?.user?.fullName}</h1>

            <div className="relative group">
              <KeyRound
                size={20}
                className="text-[#4e79b2] hover:text-[#074ca7] cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              />

              {/* Tooltip */}
              <p className="group-hover:visible group-hover:opacity-100 invisible opacity-0 w-max d-block absolute z-[99999] px-3 py-1 font-medium text-lg text-white bg-dark-400 rounded-lg transition duration-500 eft-0 bottom-0 translate-y-[105%]">
                change password
              </p>
            </div>

            <ResetPassword
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
            />
          </div>
        </li>

        <li
          className={`group relative w-16 h-16 p-4 flex leading-7 bg-icons-gray rounded-full cursor-pointer ${
            appContext.AIAssistant === AIAssistant.ManualLearning
              ? `hover:bg-blue-900`
              : `hover:bg-red-600`
          } transition duration-200`}
          onClick={() => {
            setAppContext((prev) => ({
              ...prev,
              AIAssistant:
                appContext.AIAssistant === AIAssistant.ManualLearning
                  ? AIAssistant.AutoLearning
                  : AIAssistant.ManualLearning,
            }));
          }}
        >
          {appContext.AIAssistant === AIAssistant.ManualLearning ? (
            <>
              <FontAwesomeIcon
                icon={faComment}
                className="w-8 h-8 text-white"
              />
              <Tooltip dir={tooltipDirectionsEnum.bottom}>
                Enable Automatic Learning
              </Tooltip>
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faCommentSlash}
                className="w-8 h-8 text-white"
              />
              <Tooltip dir={tooltipDirectionsEnum.bottom}>
                Disable Automatic Learning
              </Tooltip>
            </>
          )}
        </li>
        <li
          className="group relative w-16 h-16 p-4 bg-icons-gray rounded-full cursor-pointer hover:bg-red-600 transition duration-200"
          onClick={() => {
            signOut({
              callbackUrl: "/",
            });
          }}
        >
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="text-white"
          />
          <Tooltip dir={tooltipDirectionsEnum.bottom}>Logout</Tooltip>
        </li>
      </ul>
    </nav>
  );
};

export default ActionsNavbar;

interface ResetPasswordProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ResetPassword({ isDialogOpen, setIsDialogOpen }: ResetPasswordProps) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showingErrorPassword, setShowingErrorPassword] = useState(false);
  const [errorMatchPassword, setErrorMatchPassword] = useState("");

  const handleResetPassword = async () => {
    setShowingErrorPassword(false);
    if (newPassword !== confirmPassword) {
      setShowingErrorPassword(true);
      setErrorMatchPassword("The password does not match");
      return;
    }

    if (!currentPassword) return;

    try {
      const res = await fetch("/api/auth/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: currentPassword }),
      });

      if (!res.ok) {
        setShowingErrorPassword(true);
        setErrorMatchPassword("Your current password is incorrect");
        return;
      }
      // ✅ Step 2: Call API to update password
      const updateRes = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const updateData = await updateRes.json();

      if (updateRes.ok) {
        alert("Password updated successfully!");
        setConfirmPassword("");
        setNewPassword("");
        setIsDialogOpen(false);
      } else {
        setShowingErrorPassword(true);
        setErrorMatchPassword(
          updateData.message || "Failed to update password"
        );
      }
    } catch (err) {
      alert("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="current" className="text-sm">
              Current Password
            </Label>
            <Input
              id="current"
              type="password"
              value={currentPassword}
              className="col-span-3"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="new" className="text-sm">
              New Password
            </Label>
            <Input
              type="password"
              id="new"
              value={newPassword}
              className="col-span-3"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="confirm" className="text-sm">
              Confirm New Password
            </Label>
            <Input
              type="password"
              id="confirm"
              value={confirmPassword}
              className="col-span-3"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          {showingErrorPassword && (
            <div className="text-red-600 bg-red-100 border border-red-300 px-3 py-2 rounded-md text-sm mb-2">
              {errorMatchPassword}
            </div>
          )}
          <Button type="submit" onClick={handleResetPassword}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
