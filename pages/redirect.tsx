import { IUser } from "../models/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Redirect() {
	const { data: session } = useSession();
	const router = useRouter();

	router.replace("/");
	// if (session && (session as any).role == "admin") {
	// 	router.replace("/admin");
	// } else if (session && (session as any).role == "student") {
	// 	router.replace("/dashboard");
	// }
	return <p>Access Denied</p>;
}
