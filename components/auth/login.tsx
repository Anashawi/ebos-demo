import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { object, string } from "yup";
import Spinner from "../common/spinner";

const Login = ({ closeCallback }: { closeCallback: () => void }) => {
	const [authState, setAuthState] = useState({
		isLoading: false,
		error: "",
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: object({
			email: string().email("wrong email validation").required("required"),
			password: string().required("required"),
		}),
		onSubmit: async (values) => {
			await login();
		},
	});

	const router = useRouter();

	async function login() {
		if (!formik.values.email || !formik.values.password) {
			setAuthState((old) => ({
				...old,
				isLoading: false,
				error: "Invalid Login",
			}));
			return;
		}
		setAuthState((old) => ({ ...old, isLoading: true, error: "" }));
		await trySignIn(formik.values.email, formik.values.password);
	}

	async function trySignIn(email: string, password: string) {
		const result = await signIn("credentials", {
			redirect: false,
			email: email,
			password: password,
		});

		if (!result?.error) {
			//login is successful.. close login model
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
			<div className='flex items-center justify-between min-h-[58px] p-3'>
				<div className='flex flex-col gap-3'>
					<h2 className='text-5xl'>Login</h2>
					<h3 className='text-2xl text-gray-gunmetal'>
						login to your existing account
					</h3>
				</div>
			</div>

			{authState.error && (
				<div className='bg-red-100 p-2 mt-2 rounded-md text-red-900'>
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

			<div className='relative flex-auto p-3 overflow-auto'>
				<form
					onSubmit={formik.handleSubmit}
					className='flex flex-col gap-10 text-gray-700'>
					<input
						type='hidden'
						name='_token'
						value='flLpueuWiW4yYQhFv42duLSPTHXIub8XYUjHG5lR'
					/>
					<div>
						<input
							id='email'
							type='email'
							placeholder='Email'
							className='w-full p-3 bg-gray-100 outline-none border-none caret-dark-blue rounded-md'
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
							id='password'
							type='password'
							placeholder='Password'
							className='w-full p-3 bg-gray-100 outline-none border-none caret-dark-blue rounded-md'
							{...formik.getFieldProps("password")}
						/>
						{formik.errors?.password && (
							<div className='text-rose-400 text-sm'>
								{formik.errors.password}
							</div>
						)}
					</div>
					<div>
						<button
							type='submit'
							className='w-full p-2 text-gray-900 bg-yellow-green bg-repeat-x bg-gradient-to-br from-yellow-green to-[#A5C036] rounded-md'>
							Login
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Login;
