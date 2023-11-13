interface Props {
    title: string;
    icon?: JSX.Element;
    clickCallback: Function;
}

const ChartsButton = ({ title, icon, clickCallback }: Props) => {
    return (
        <div className="p-1 bg-white rounded-xl">
            <button
                type="button"
                onClick={() => {
                    clickCallback();
                }}
                className="w-full btn-primary-light rounded-xl"
            >
                {title}
                {icon}
            </button>
        </div>
    );
};

export default ChartsButton;
