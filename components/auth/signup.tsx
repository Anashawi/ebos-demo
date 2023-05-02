import { useMutation } from "@tanstack/react-query";
import { authProviderEnum } from "../../models/enums";
import { IUser } from "../../models/user";
import { signIn } from "next-auth/react";
import * as api from "../../http-client/auth.client";
import { useState } from "react";
import Spinner from "../common/spinner";
import { useFormik } from "formik";
import { object, string } from "yup";

const Signup = ({ closeCallback }: { closeCallback: () => void }) => {
	const [authState, setAuthState] = useState({
		isLoading: false,
		error: "",
	});

	const formik = useFormik({
		initialValues: {
			fullName: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: object({
			fullName: string().required("required"),
			email: string().email("wrong email validation").required("required"),
			// phoneNumber: string().matches(type the RegExp, 'Phone number is not valid').required("required"),
			phoneNumber: string().required("required"),
			password: string().required("required"),
			confirmPassword: string()
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
			mutate({
				...payload,
				provider: authProviderEnum.credentials,
			} as IUser);
		},
	});

	const {
		mutate,
		isLoading: signUpLoading,
		isError,
		error,
		isSuccess,
	} = useMutation<{ id: string }, Error, IUser>(api.singUp, {
		onSuccess: async (res) => {
			if (res.id) {
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
					error: error.message
				})
			}
		}
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
			<div className='flex flex-col gap-3 p-3'>
				<div className='flex items-center justify-between min-h-[58px] p-3'>
					<div className='flex flex-col gap-3'>
						<h2 className='text-gray-gunmetal text-5xl'>Register now</h2>
						<h3 className='text-2xl text-gray-gunmetal'>
							to start your free sessions
						</h3>
					</div>
				</div>

				{authState.error && (
					<div className='bg-red-100 p-2 mt-2  text-red-900'>
						{authState.error}
					</div>
				)}

				{authState.isLoading && (
					<div className='flex flex-col items-center justify-center mt-5'>
						<Spinner
							className=''
							message='trying to login, please wait ...'></Spinner>
					</div>
				)}

				{signUpLoading && (
					<div className='flex flex-col items-center justify-center mt-5'>
						<Spinner
							className=''
							message='Signing you up, please wait ...'></Spinner>
					</div>
				)}

				<div className='relative flex-auto p-3 overflow-auto'>
					<div id='validation-errors'></div>
					{/* submit form then redirect to app/goals */}
					<form
						onSubmit={formik.handleSubmit}
						className='flex flex-col gap-10'>
						<div>
							<input
								id='fullName'
								type='text'
								placeholder='Full Name'
								className='w-full p-3 bg-gray-100 outline-none border-none caret-dark-blue '
								{...formik.getFieldProps("fullName")}
							/>
							{formik.errors?.fullName && (
								<div className='text-rose-400 text-sm'>
									{formik.errors.fullName}
								</div>
							)}
						</div>
						<div>
							<input
								id='email'
								type='email'
								placeholder='Email'
								className='w-full p-3 bg-gray-100 outline-none border-none caret-dark-blue '
								{...formik.getFieldProps("email")}
							/>
							{formik.errors.email && (
								<div className='text-rose-400 text-sm'>
									{formik.errors.email}
								</div>
							)}
						</div>
						<div>
							<input
								id='phoneNumber'
								type='text'
								placeholder='Phone Number'
								className='w-full p-3 bg-gray-100 outline-none border-none caret-dark-blue '
								{...formik.getFieldProps("phoneNumber")}
							/>
							{formik.errors?.phoneNumber && (
								<div className='text-rose-400 text-sm'>
									{formik.errors.phoneNumber}
								</div>
							)}
						</div>
						<div>
							<input
								id='password'
								type='password'
								placeholder='Password'
								className='w-full p-3 bg-gray-100 outline-none border-none caret-dark-blue '
								{...formik.getFieldProps("password")}
							/>
							{formik.errors?.password && (
								<div className='text-rose-400 text-sm'>
									{formik.errors.password}
								</div>
							)}
						</div>
						<div>
							<input
								id='confirmPassword'
								type='password'
								placeholder='Confirm Password'
								className='w-full p-3 bg-gray-100 outline-none border-none caret-dark-blue '
								{...formik.getFieldProps("confirmPassword")}
							/>
							{formik.errors?.confirmPassword && (
								<div className='text-rose-400 text-sm'>
									{formik.errors.confirmPassword}
								</div>
							)}
						</div>
						<div>
							<button
								type='submit'
								className='w-full p-2 text-gray-900 bg-yellow-green bg-repeat-x rounded-md bg-gradient-to-br from-yellow-green to-[#A5C036] '>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
export default Signup;
