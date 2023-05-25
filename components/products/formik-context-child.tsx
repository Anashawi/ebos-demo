import { useEffect } from "react";
import { useFormikContext } from "formik";

interface Props {
	dispatch: () => void;
}

const FormikContextChild = ({ dispatch }: Props) => {
	const { values }: any = useFormikContext();
	useEffect(() => {
		dispatch();
	}, [values.products]);
	return <></>;
};

export default FormikContextChild;
