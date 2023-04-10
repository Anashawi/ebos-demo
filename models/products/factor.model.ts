export interface ProductFactor {
   id: string;
   name: string;
   competitors: {
      id: string;
      value: number;
   }[];
}
