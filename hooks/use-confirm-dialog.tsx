import { useState } from "react";
import { ConfirmDialog } from "../models/types";

const initialConfig: ConfirmDialog = {
	isShown: false,
	title: "Confirm Action Dialog",
	confirmMessage: "Are you sure to proceed with this action ?",
	okBtnText: "Yes",
	cancelBtnText: "Cancel",
	okCallback: () => {},
};

const useConfirmDialog = (config = { ...initialConfig }): any[] => {
	const [dialogConfig, setDialogConfig] = useState(config);

	const toggle = (newConfig: ConfirmDialog) => {
		if (newConfig) {
			setDialogConfig((prevConfig) => {
				return Object.assign({}, newConfig, {
					isShown: !prevConfig.isShown,
				});
			});
			return;
		}
		setDialogConfig((prevConfig) => {
			return Object.assign({}, prevConfig, { isShown: !prevConfig.isShown });
		});
	};

	return [dialogConfig, toggle];
};

export default useConfirmDialog;
