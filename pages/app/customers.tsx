import Image from "next/image";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import { useFormik } from "formik";
import { array, object, string } from "yup";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo, useState, useEffect } from "react";
import { IUserCustomers } from "../../models/user-customers";
import * as clientApi from "../../http-client/customers.client";
import Spinner from "../../components/common/spinner";

const Customers = () => {
	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();

	const { data: session }: any = useSession();

	const emptyUserCustomers = useMemo(() => {
		return {
			id: "",
			userId: session?.user?.id,
			topCategories: ["", "", "", "", ""],
			wishlist: ["", "", "", "", ""],
			fulfill: ["", "", "", "", ""],
		} as IUserCustomers;
	}, []);

	const [userCustomers, setUserCustomers] =
		useState<IUserCustomers>(emptyUserCustomers);

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<IUserCustomers>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (data) {
			setUserCustomers(data);
		}
	}, [data]);

	const { mutate: updateUserCustomers, isLoading: isUpdatingUserCustomers } =
		useMutation(
			(userCustomers: IUserCustomers) => {
				return clientApi.updateOne(userCustomers);
			},
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[clientApi.Keys.All, userCustomers.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						clientApi.Keys.All,
						userCustomers.id,
					]);
					queryClient.invalidateQueries([clientApi.Keys.All]);
				},
			}
		);

	const { mutate: createUserCustomers, isLoading: isCreatingUserCustomers } =
		useMutation(
			(userCustomers: IUserCustomers) => clientApi.insertOne(userCustomers),
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[clientApi.Keys.All, userCustomers.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						clientApi.Keys.All,
						userCustomers.id,
					]);
					queryClient.invalidateQueries([clientApi.Keys.All]);
				},
			}
		);

	const formik = useFormik({
		initialValues: {
			...userCustomers,
		},
		validationSchema: object({
			topCategories: array(string()),
			wishlist: array(string()),
			fulfill: array(string()),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			values.userId = session?.user?.id;
			if (!values.id) {
				await createUserCustomers(values);
			} else {
				await updateUserCustomers(values);
			}
			setSubmitting(false);
		},
		enableReinitialize: true,
	});

	return (
		<>
			<IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

			<div className='homepage-bg-gradient w-screen bg-white'>
				<form
					method='post'
					action='http://bo.adpadelhouse.com/app/customers'
					encType='multipart/form-data'>
					<input
						type='hidden'
						name='_token'
						value='E6vydmJoblEw5asasVKo4Ehneri0ZmjnuHJ03vSY'
					/>
					<div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
						<div className='flex flex-wrap'>
							<div className='grow md:w-4/12 bg-white p-12 relative'>
								<div className='pb-5'>
									<strong className='mr-1'>Mustafa Khairy </strong> |
									<a href='http://bo.adpadelhouse.com/logout'>
										logout
									</a>
								</div>
								<h3 className='mt-10 text-[2.52rem] text-yellow-green'>
									Voice of customers
								</h3>
								<h4 className='text-[2.1rem] font-normal mb-6'>
									Top customer categories
								</h4>
								<ul className='flex flex-col gap-5 mb-5'>
									<li>
										<input
											type='text'
											{...formik.getFieldProps("topCategories.0")}
											className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
										/>
									</li>
									<li>
										<input
											type='text'
											{...formik.getFieldProps("topCategories.1")}
											className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
										/>
									</li>
									<li>
										<input
											type='text'
											{...formik.getFieldProps("topCategories.2")}
											className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
										/>
									</li>
									<li>
										<input
											type='text'
											{...formik.getFieldProps("topCategories.3")}
											className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
										/>
									</li>
									<li>
										<input
											type='text'
											{...formik.getFieldProps("topCategories.4")}
											className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
										/>
									</li>
								</ul>
								<div className='flex flex-wrap gap-5 py-3'>
									<div className='flex gap-5'>
										<button
											type='button'
											onClick={() => {
												formik.handleSubmit();
											}}
											className={
												formik.isSubmitting || !formik.isValid
													? "btn-rev btn-disabled"
													: "btn-rev"
											}
											disabled={
												formik.isSubmitting || !formik.isValid
											}>
											Submit
										</button>
										<Link
											href='/'
											className='btn text-black-eerie hover:text-blue-ncs'>
											<strong>Back To Dashboard</strong>
										</Link>
									</div>
									{(!!isLoading ||
										isUpdatingUserCustomers ||
										isCreatingUserCustomers) && (
										<Spinner
											className='flex items-center px-1 text-2xl'
											message='Loading ...'
										/>
									)}
								</div>
							</div>
							<div className='grow md:w-8/12 pane-right-gradient min-h-screen p-12'>
								<div className=''>
									<button
										type='button'
										className='btn text-black-eerie'>
										My ideas
									</button>
								</div>
								<Link href='/' className='logo-pane'>
									<h4 className='text-[3rem] text-white'>20X</h4>
									<span className='relative -translate-x-[1.2rem]'>
										revenue BY
									</span>
									<div className='w-[110px] h-[33px]'>
										<Image
											width='55'
											height='30'
											src='/ilogo.webp'
											alt='CaseInPoint'
										/>
									</div>
								</Link>
								<div className='flex flex-wrap gap-5'>
									<div className='col-1/2 grow'>
										<h4 className='text-[2.1rem] font-normal mb-6'>
											What do they want
										</h4>
										<ul className='flex flex-col gap-5 mb-5'>
											<li>
												<input
													type='text'
													{...formik.getFieldProps("wishlist.0")}
													className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
												/>
											</li>
											<li>
												<input
													type='text'
													{...formik.getFieldProps("wishlist.1")}
													className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
												/>
											</li>
											<li>
												<input
													type='text'
													{...formik.getFieldProps("wishlist.2")}
													className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
												/>
											</li>
											<li>
												<input
													type='text'
													{...formik.getFieldProps("wishlist.3")}
													className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
												/>
											</li>
											<li>
												<input
													type='text'
													{...formik.getFieldProps("wishlist.4")}
													className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
												/>
											</li>
										</ul>
									</div>
									<div className='col-1/2 grow'>
										<h4 className='text-[2.1rem] font-normal mb-6'>
											How to fulfill it
										</h4>
										<ul className='flex flex-col gap-5 mb-5'>
											<li>
												<input
													type='text'
													{...formik.getFieldProps("fulfill.0")}
													className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
												/>
											</li>
											<li>
												<input
													type='text'
													{...formik.getFieldProps("fulfill.1")}
													className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
												/>
											</li>
											<li>
												<input
													type='text'
													{...formik.getFieldProps("fulfill.2")}
													className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
												/>
											</li>
											<li>
												<input
													type='text'
													{...formik.getFieldProps("fulfill.3")}
													className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
												/>
											</li>
											<li>
												<input
													type='text'
													{...formik.getFieldProps("fulfill.4")}
													className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
												/>
											</li>
										</ul>
									</div>
								</div>
								<div className='py-3'>
									<button className='btn text-black-eerie'>
										<strong>Request </strong> for consultant review
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default Customers;
