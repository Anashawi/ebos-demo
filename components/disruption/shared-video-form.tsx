import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { object, string } from "yup";
import { IVideos } from "../../models/videos";
import * as clientApi from "../../http-client/videos.client";
import { useEffect, useState } from "react";
import { videoPropNamesEnum } from "../../models/enums";
import objectPath from "object-path";
import Spinner from "../common/spinner";

interface Props {
	toggleEditVideoModal: () => void;
	videoPropName: videoPropNamesEnum;
	videoLabel: string;
}

const SharedVideoForm = ({
	toggleEditVideoModal,
	videoPropName: currVideoPropName,
	videoLabel: currVideoLabel,
}: Props) => {
	const emptyVideo: any = {
		id: "",
		[currVideoPropName]: "",
	};

	const [videos, setVideos] = useState<IVideos>(emptyVideo);

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<IVideos>({
		queryKey: [clientApi.Keys.all],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (data) {
			setVideos({
				id: data.id,
				[currVideoPropName]: objectPath.get(data, currVideoPropName),
			} as any);
		}
	}, [data]);

	const { mutate: updateVideoUrl, isLoading: isUpdatingVideos } = useMutation(
		(videos: IVideos) => {
			return clientApi.updateOne(videos);
		},
		{
			onMutate: (updated) => {
				queryClient.setQueryData([clientApi.Keys.all], updated);
			},
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.all]);
				toggleEditVideoModal();
			},
		}
	);

	const formik = useFormik({
		initialValues: { ...videos } as IVideos,
		validationSchema: object({
			id: string().required("required"),
			[currVideoPropName]: string().required("required"),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			await updateVideoUrl(values);
			setSubmitting(false);
		},
		enableReinitialize: true,
	});

	return (
		<>
			<div className='flex gap-5 items-center'>
				<h1 className='text-4xl text-gray-800 mb-5'>Edit Video Url</h1>
				{isLoading && (
					<Spinner message='Loading...' className='items-center' />
				)}
			</div>
			<form className='pt-10 flex gap-5 flex-col'>
				<div className='flex flex-col'>
					<label>{currVideoLabel}</label>
					<input
						type='text'
						className='w-full p-3 bg-gray-100 caret-dark-blue border-none'
						{...formik.getFieldProps(currVideoPropName)}
					/>
					{objectPath.get(formik, `touched?.${currVideoPropName}`) &&
						objectPath.get(formik, `errors?.${currVideoPropName}`) && (
							<div className='text-rose-400 text-lg'>
								<>
									{objectPath.get(
										formik,
										`errors.${currVideoPropName}`
									)}
								</>
							</div>
						)}
				</div>
			</form>
			<div className='flex justify-end gap-3 pt-5'>
				<button
					className='btn-diff bg-gray-100 hover:bg-gray-300'
					onClick={() => toggleEditVideoModal()}>
					close
				</button>
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
					disabled={formik.isSubmitting || !formik.isValid}>
					Save
				</button>
			</div>
		</>
	);
};

export default SharedVideoForm;
