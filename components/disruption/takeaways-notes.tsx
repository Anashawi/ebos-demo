import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { takeawayTypeEnums } from "../../models/enums";
import { IUserTakeaways } from "../../models/user-takeaways";
import { useState } from "react";
import { ITakeaway } from "../../models/types";

interface Props {
    title: string;
    userTakeaways: IUserTakeaways;
    type: takeawayTypeEnums;
    dispatchUserTakeaways: (takeawaysCallback: any) => void;
}

const TakeawaysNotes = ({ title, userTakeaways, dispatchUserTakeaways, type }: Props) => {
    const [noteToBeAdded, setNoteToBeAdded] = useState<string>("");

    return (
        <>
            <div className="grow flex flex-col gap-3">
                <label className="text-dark-400 text-[1.75rem]">{title}</label>
                <ul className="flex flex-col gap-3">
                    {!userTakeaways?.takeaways?.find(t => t.type == type)?.notes.length && (
                        <div className="w-full flex justify-start items-center">
                            <p className="p-5 text-dark-400 text-xl text-center italic">
                                Start adding notes...
                            </p>
                        </div>
                    )}
                    <div className="w-full flex gap-5 xl:gap-2 items-center">
                        <input
                            type="text"
                            className="w-full light-input"
                            placeholder="Write your notes here..."
                            value={noteToBeAdded}
                            onChange={e => {
                                setNoteToBeAdded(e.target.value ?? "");
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                const takeaways: ITakeaway | undefined = userTakeaways.takeaways.find(t => t.type == type);
                                const updatedNotes = [...takeaways!.notes, noteToBeAdded];
                                takeaways!.notes = updatedNotes;
                                dispatchUserTakeaways({ ...userTakeaways });
                                setNoteToBeAdded("");
                            }}
                            disabled={!noteToBeAdded}
                            className={
                                !!noteToBeAdded
                                    ? "btn-primary gap-2 min-w-[120px] text-lg"
                                    : "btn-primary gap-2 min-w-[120px] hover:bg-primary-300 cursor-not-allowed text-lg"
                            }
                        >
                            <FontAwesomeIcon
                                className="w-3 h-auto cursor-pointer hover:text-gray-600"
                                icon={faPlus}
                            />
                            Add more
                        </button>
                    </div>
                    {userTakeaways?.takeaways?.find(t => t.type == type)?.notes.map((note, index) => (
                        <li key={index} className="relative flex items-center">
                            <input
                                type="text"
                                className="dark-input"
                                value={note}
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const takeaways = userTakeaways?.takeaways.find(t => t.type == type) || { type, notes: [] };
                                    takeaways.notes =
                                        takeaways.notes.filter(
                                            (note, i) => i !== index
                                        );

                                    dispatchUserTakeaways(
                                        { ...userTakeaways }
                                    );
                                }}
                                className="btn-delete"
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="w-4 text-dark-300 hover:text-dark-400"
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default TakeawaysNotes;
