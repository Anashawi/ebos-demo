interface Props {
	pageTitle: string;
	className?: string;
}

const ConsultantReview = ({ pageTitle, className }: Props) => {
	return (
		<button
			type='button'
			onClick={() => {
				console.log("pageTitle", pageTitle);
			}}
			className={`btn text-black-eerie ${className ?? ""}`}>
			<strong>Request </strong> for consultant review
		</button>
	);
};

export default ConsultantReview;
