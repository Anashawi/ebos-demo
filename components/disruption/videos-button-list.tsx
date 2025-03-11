import { Dispatch, SetStateAction } from "react";

import { videoPropNamesEnum } from "../../models/enums";

import PillPlayButton from "../common/pill-play-button";

interface Props {
    title: string;
    videosProps: { title: string; name: videoPropNamesEnum }[];
    setSelectedVideoPropName: Dispatch<SetStateAction<videoPropNamesEnum>>;
    toggleVideoModal: Function;
}

const VideosButtonList = ({
    title,
    videosProps,
    setSelectedVideoPropName,
    toggleVideoModal,
}: Props) => {
    return (
        <div className="px-8 py-4">
            <h4 className="mb-3 text-[1.75rem] text-dark-400 font-hero-bold">
                {title}
            </h4>
            <ul className="flex flex-col gap-2">
                {videosProps.map((videoprop, index) => (
                    <li key={index}>
                        <PillPlayButton
                            buttonText={videoprop.title}
                            onClickCallback={() => {
                                setSelectedVideoPropName(videoprop.name);
                                toggleVideoModal();
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideosButtonList;
