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
   factors?: IFactor[];
   ideaFactors?: IIdeaFactor[];
}

export interface IFuture {
   year: number;
   level: number;
   sales: number;
}

export interface IIdea {
   uuid: string;
   name: string;
   startMonth: string;
   durationInMonths: string
}

export interface ICompetitor {
   uuid: string;
   name: string;
   marketShare: number;
}

export interface IFactorCompetitor {
   uuid: string;
   value: string;
}

export interface IFactor {
   name: string;
   competitors: IFactorCompetitor[];
}

export interface IIdeaFactor {
   name: string;
   competitors: IFactorCompetitor[];
}
