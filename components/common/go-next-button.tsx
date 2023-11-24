import { useRouter } from "next/router";

interface Props {
    stepUri: string;
    nextStepTitle: string;
    clickable: boolean;
}

const GoNextButton = ({
    stepUri,
    nextStepTitle,
    clickable: youShallNotPass,
}: Props) => {
    const router = useRouter();

    return (
        <div className="self-end">
            <button
                className={`px-8 py-4 rounded-full text-xl text-md text-white bg-dark-300 hover:shadow-lg ${
                    !youShallNotPass ? `btn-disabled` : ``
                }`}
                disabled={!youShallNotPass}
                onClick={() => {
                    router.push(stepUri);
                }}
            >
                Go to next - {nextStepTitle}
            </button>
        </div>
    );
};

export default GoNextButton;
