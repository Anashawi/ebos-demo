export class ConfirmDialog {
   isShown: boolean = false;
   title: string = "Confirm Action Dialog";
   confirmMessage: string = "Are you sure to proceed with this action ?";
   okBtnText: string = "Yes";
   cancelBtnText: string = "Cancel";
   okCallback: () => void = () => {};
   closeCallback: () => void = () => {};
}
