import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IUserOrganizations } from "../../models/organization";
import * as client from "../../http-client/organizations.client";
import Spinner from "../common/spinner";
import { useSession } from "next-auth/react";
import { OrganizationModel } from "../../models/types";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Organizations = () => {
	const { data: session }: any = useSession();

	const generateEmptyOrganization = (): OrganizationModel => {
		const newUUID = crypto.randomUUID();
		return {
			uuid: newUUID,
			name: "New Organization",
			website: "",
		};
	};

	const [defaultUserOrganizations, setDefaultUserOrganization] =
		useState<IUserOrganizations>({
			id: "",
			userId: "",
			organizations: [],
		});

	useEffect(() => {
		if (window) {
			setDefaultUserOrganization({
				...defaultUserOrganizations,
				organizations: [
					...defaultUserOrganizations.organizations,
					generateEmptyOrganization(),
				],
			});
		}
	}, [window]);

	const [userOrganizations, setUserOrganizations] =
		useState<IUserOrganizations>(defaultUserOrganizations);

	const { data, isLoading } = useQuery(
		[client.keys.all, session?.user?.id],
		client.getAll,
		{
			refetchOnWindowFocus: false,
			retry: 2,
		}
	);

	useEffect(() => {
		if (data) {
			setUserOrganizations({ ...data });
		}
	}, [data]);

	const { mutate, isLoading: isSaving } = useMutation({
		mutationFn: !userOrganizations.id ? client.insertOne : client.updateOne,
		mutationKey: [
			client.keys.updateUserOrganizations,
			userOrganizations.id ?? "",
		],
		onSuccess: (updatedUserOrgs) => {
			setUserOrganizations(updatedUserOrgs);
		},
	});

	return (
		<>
			<h1 className='title-header'>Organizations</h1>
			<div className='text-lg bg-dark-50 rounded-2xl p-5'>
				<div className='flex flex-col gap-5'>
					{isLoading && (
						<Spinner
							message='loading organizations...'
							className='items-center text-2xl'
						/>
					)}
					{!isLoading && !userOrganizations.organizations?.length && (
						<p className='text-yellow-700 text-xl'>
							Click to add an organization
						</p>
					)}
					{!isLoading &&
						!!userOrganizations.organizations?.length &&
						userOrganizations.organizations.map((org, index) => (
							<div key={org.uuid} className='flex gap-5 justify-between'>
								<div className='grow flex flex-col gap-1'>
									<label>
										{index === 0 ? "Name" : `Competitor ${index}`}
									</label>
									<input
										type='text'
										onChange={(e) => {
											org.name = e.target.value;
											setUserOrganizations(userOrganizations);
										}}
										value={org.name}
										className='light-input'
									/>
								</div>
								<div className='grow flex flex-col gap-1'>
									<label>Website</label>
									<div className='relative'>
										<input
											type='text'
											onChange={(e) => {
												org.website = e.target.value;
												setUserOrganizations(userOrganizations);
											}}
											value={org.website}
											className='light-input w-full'
										/>
										{index !== 0 && (
											<FontAwesomeIcon
												icon={faTimes}
												onClick={() => {
													userOrganizations.organizations =
														userOrganizations.organizations.filter(
															(organization) =>
																organization.uuid !== org.uuid
														);
													setUserOrganizations({
														...userOrganizations,
													});
												}}
												className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer w-4 text-dark-300 hover:text-dark-400'
											/>
										)}
									</div>
								</div>
							</div>
						))}
				</div>
				{!isLoading && (
					<div className='pt-7'>
						<button
							type='button'
							onClick={() => {
								setUserOrganizations((prevValue) => {
									return {
										...prevValue,
										organizations: [
											...prevValue.organizations,
											generateEmptyOrganization(),
										],
									};
								});
							}}
							className='btn-primary pl-9 pr-8'>
							<FontAwesomeIcon
								className='w-[0.8rem] h-auto cursor-pointer'
								icon={faPlus}
							/>
							<span className='text-xl'>Add New Organization</span>
						</button>
					</div>
				)}
			</div>
			<div className='h-10'>
				{isSaving && (
					<Spinner
						message='Saving organizations...'
						className='items-center text-xl'
					/>
				)}
			</div>
			<div className='flex gap-3 mb-5'>
				<button
					type='button'
					disabled={isSaving}
					onClick={() => {
						mutate(userOrganizations);
					}}
					className={
						!isSaving
							? "btn-rev"
							: "btn-rev opacity-50 cursor-not-allowed"
					}>
					Save
				</button>
			</div>
		</>
	);
};

export default Organizations;
