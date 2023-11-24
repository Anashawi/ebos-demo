interface Props {
    title: string;
    icon?: JSX.Element;
    clickCallback: Function;
}

const ChartsButton = ({ title, icon, clickCallback }: Props) => {
    return (
        <button
            className="btn-primary-light"
            type="button"
            onClick={() => {
                clickCallback();
            }}
        >
            {title}
            {icon}
        </button>
    );
};

export default ChartsButton;
