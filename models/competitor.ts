import mongoose from "mongoose";

interface CompetitorAttrs {
   productId: string
   name: string;
   marketShare: number;
}

interface CompetitorDocument extends mongoose.Document, CompetitorAttrs { }

interface CompetitorModel extends mongoose.Model<CompetitorDocument> {
   build(attrs: CompetitorAttrs): CompetitorDocument;
}

export interface ICompetitor extends CompetitorAttrs {
   id: string;
}

const competitorSchema = new mongoose.Schema(
   {
      productId: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      marketShare: {
         type: Number,
         required: true,
      },
   },
   {
      toJSON: {
         transform(doc, ret) {
            ret.id = ret._id.toString();
         },
      },
   }
);

competitorSchema.statics.build = (attrs: CompetitorAttrs) => {
   return new Competitor(attrs);
};

export const Competitor =
   mongoose.models.Competitor ||
   mongoose.model<CompetitorDocument, CompetitorModel>("Competitor", competitorSchema);
