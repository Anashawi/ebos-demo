import { Dispatch, SetStateAction, useEffect } from "react";
import { IUserProduct } from "../../models/user-product";
import { useFormikContext } from "formik";
import { IProduct } from "../../models/types";

interface Props {
	userProduct: IUserProduct;
	dispatch: () => void;
}

const FormikContextChild = ({ userProduct, dispatch }: Props) => {
	const { values }: any = useFormikContext();
	useEffect(() => {
		if (values.products) {
			userProduct.products = [...values.products];
			dispatch();
		}
	}, [values.products]);
	return <></>;
};

export default FormikContextChild;
