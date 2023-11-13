import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

interface Props {
    buttonText: string;
    onClickCallback: Function;
}

const PillPlayButton = ({ buttonText, onClickCallback }: Props) => {
    return (
        <button className="w-[100%] pill-primary-300 text-xl">
            {buttonText}
            <div
                className="cursor-pointer hover:scale-[115%] transition duration-100"
                onClick={() => {
                    onClickCallback();
                }}
            >
                <FontAwesomeIcon
                    className="w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]"
                    icon={faCirclePlay}
                />
            </div>
        </button>
    );
};

export default PillPlayButton;
