import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import objectPath from "object-path";
import { useEffect, useState } from "react";
import { IVideos } from "../../models/videos";
import * as clientApi from "../../http-client/videos.client";

interface Props {
	currVideoPropName: string;
}

const Video: NextPage<Props> = ({ currVideoPropName }) => {
	const [videos, setVideos] = useState<IVideos>();

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

	if (!videos?.id || !objectPath.get(videos ?? {}, currVideoPropName)) {
		return (
			<div className='h-full flex justify-center items-center'>
				<p className='italic text-3xl'>Add a video link !</p>
			</div>
		);
	}

	return (
		<>
			<iframe
				className='w-full grow'
				src={objectPath.get(videos ?? {}, currVideoPropName) ?? ""}
				title='YouTube video player'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				allowFullScreen></iframe>
		</>
	);
};

export default Video;
