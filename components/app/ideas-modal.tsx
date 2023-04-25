import { useEffect, useMemo, useState } from "react";
import Spinner from "../common/spinner";
import { object, string } from "yup";
import { NextPage } from "next";
import Modal from "../common/modal";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IIdea } from "../../models/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as clientApi from "../../http-client/ideas.client";
import { IUserIdea } from "../../models/user-idea";

interface Props {
	isOpen: boolean;
	toggle: () => void;
}

const IdeasModal: NextPage<Props> = ({ isOpen, toggle }) => {
	const [ideaFactors, setIdeaFactors] = useState<IIdea[]>([]);

	const { data, isLoading } = useQuery<IUserIdea>({
		queryKey: [clientApi.Keys.AllLookup],
		queryFn: clientApi.getAllLookup,
		refetchOnWindowFocus: false,
		enabled: isOpen,
	});

	useEffect(() => {
		if (data) {
			setIdeaFactors(data.ideas);
		}
	}, [data]);

	const queryClient = useQueryClient();

	const { mutate: createIdea, isLoading: isCreatingIdea } = useMutation(
		(idea: IIdea) => {
			return clientApi.insertOne(idea);
		},
		{
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.AllLookup]);
			},
		}
	);

	const { mutate: deleteIdea, isLoading: isDeletingIdea } = useMutation(
		(id: string) => {
			return clientApi.deleteOne(id);
		},
		{
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.AllLookup]);
			},
		}
	);

	if (!isOpen) return <></>;

	return (
		<>
			<Modal
				config={{
					className:
						"p-5 lg:p-10 w-2/3 min-w-[320px] max-w-[650px] max-h-[650px]",
					isShown: isOpen,
					closeCallback: toggle,
				}}>
				<div className='flex flex-col gap-7'>
					<h2 className='text-4xl text-gray-700'>Ideas</h2>
					<h3 className='text-gray-400 text-2xl'>Add ideas</h3>
				</div>
				<div className='h-[90%] overflow-auto'>
					<div className='relative flex-auto py-3'>
						{!ideaFactors?.length && (
							<div className='flex py-5 w-full h-full justify-center'>
								<p className='text-xl p-10 text-center text-rose-300'>
									Add your ideas !
								</p>
							</div>
						)}
						{!!ideaFactors?.length && (
							<ul className='flex flex-col gap-2 mb-10'>
								{ideaFactors.map((idea: IIdea, index: number) => (
									<li
										key={index}
										className='flex gap-5 justify-between text-gray-800 '>
										<span> {idea.name} </span>
										<button
											onClick={() => {
												deleteIdea(idea.uuid);
											}}
											className='flex items-center gap-3 text-lg p-3 text-rose-200 hover:text-rose-500'
											type='button'>
											<FontAwesomeIcon
												className='w-4 h-auto cursor-pointer hover:text-rose-500'
												icon={faTimes}
											/>
										</button>
									</li>
								))}
							</ul>
						)}
						<Formik
							initialValues={{
								name: "",
							}}
							validationSchema={object({
								name: string().required("required"),
							})}
							onSubmit={async (values, actions) => {
								await createIdea({
									uuid: crypto.randomUUID(),
									name: values.name,
								} as IIdea);
								actions.setSubmitting(false);
								actions.resetForm();
							}}
							validateOnMount>
							{({ values, isSubmitting, isValid }) => (
								<Form>
									<div className='flex flex-wrap gap-5 items-start'>
										<div className='grow'>
											<Field
												type='text'
												className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
												placeholder='New idea'
												name='name'
											/>
											<ErrorMessage name={`name`}>
												{(msg) => (
													<div className='text-lg text-rose-500'>
														{msg}
													</div>
												)}
											</ErrorMessage>
										</div>
										<div className='flex justify-end'>
											<button
												type='submit'
												className={
													isSubmitting || !isValid
														? "btn-rev btn-disabled"
														: "btn-rev"
												}
												disabled={isSubmitting || !isValid}>
												Add New Idea
											</button>
										</div>
										{isLoading ||
											isCreatingIdea ||
											(isDeletingIdea && (
												<div className='flex grow'>
													<Spinner
														className=''
														message='Loading Ideas ...'
													/>
												</div>
											))}
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default IdeasModal;
