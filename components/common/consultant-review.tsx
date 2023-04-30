interface Props {
	pageTitle: string;
}

const ConsultantReview = ({ pageTitle }: Props) => {
	return (
		<button
			type='button'
			onClick={() => {
				console.log("pageTitle", pageTitle);
			}}
			className='btn text-black-eerie mt-10'>
			<strong>Request </strong> for consultant review
		</button>
	);
};

export default ConsultantReview;
