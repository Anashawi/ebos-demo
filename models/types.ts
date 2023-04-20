import { Competitor } from './competitor';
export interface ConfirmDialog {
   isShown: boolean;
   title: string;
   confirmMessage: string;
   okBtnText: string;
   cancelBtnText: string;
   okCallback: () => void;
}

export interface IModal {
   className: string;
   isShown: boolean;
   closeCallback: () => void
}

export interface IProduct {
   uuid: string;
   name: string;
   futures?: IFuture[];
   competitors?: ICompetitor[];
}

export interface IFuture {
   year: number;
   level: number;
   sales: number;
}

export interface ICompetitor {
   name: string;
   marketShare: number;
}