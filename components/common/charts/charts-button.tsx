interface Props {
  title: string;
  icon?: JSX.Element;
  clickCallback: Function;
  className?: string;
}

const ChartsButton = ({
  title,
  icon,
  clickCallback,
  className = "btn-primary-light",
}: Props) => {
  return (
    <button
      className={className}
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
