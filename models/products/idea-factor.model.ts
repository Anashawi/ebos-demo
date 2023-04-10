export interface ProductIdeaFactor {
   id: string;
   name: string;
   competitors: {
      id: string;
      value: number;
   }[];
}
