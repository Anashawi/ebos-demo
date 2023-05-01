import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { object, string } from "yup";
import { IVideos } from "../../models/videos";
import * as clientApi from "../../http-client/videos.client";
import { useEffect, useMemo, useState } from "react";

interface Props {
	toggleEditVideoModal: () => void;
}

const GoalsVideoForm = ({ toggleEditVideoModal }: Props) => {
	const emptyVideo = useMemo(() => {
		return {
			id: "",
			goalsVideo: "",
		} as IVideos;
	}, []);

	const [videos, setVideos] = useState<IVideos>(emptyVideo);

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<IVideos>({
		queryKey: [clientApi.Keys.all],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (data) {
			const { id, goalsVideo } = data;
			setVideos({ id, goalsVideo } as IVideos);
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
			goalsVideo: string().required("required"),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			await updateVideoUrl(values);
			setSubmitting(false);
		},
		enableReinitialize: true,
	});

	return (
		<>
			<h1 className='text-4xl text-gray-800 mb-5'>Edit Video Url</h1>
			<form className='grow overflow-auto pt-10 flex gap-5 flex-wrap'>
				<div>
					<label>Goals Video</label>
					<input
						type='text'
						className='w-full p-3 bg-gray-100 caret-dark-blue border-none'
						{...formik.getFieldProps("goalsVideo")}
					/>
					{formik.touched.goalsVideo && formik.errors?.goalsVideo ? (
						<div className='text-rose-400 text-lg'>
							<>{formik.errors.goalsVideo}</>
						</div>
					) : null}
				</div>
			</form>
			<div className='flex justify-end gap-3 pt-5'>
				<button
					className='btn-diff bg-gray-100 hover:bg-gray-300'
					onClick={toggleEditVideoModal}>
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

export default GoalsVideoForm;
