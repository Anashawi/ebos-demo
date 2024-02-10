import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    callback: Function;
}

const DeleteButton = ({ callback }: Props) => {
    return (
        <div className="self-end mb-1">
            <button
                onClick={() => callback()}
                className="w-[3.75rem] h-[3.75rem] inline-flex justify-center items-center rounded-full bg-gray-200 cursor-pointer text-dark-300 hover:text-dark-400"
            >
                <FontAwesomeIcon icon={faTimes} className="w-4" />
            </button>
        </div>
    );
};

export default DeleteButton;
