import mongoose from "mongoose";

interface IdeaAttrs {
   name: string;
}

interface IdeaDocument extends mongoose.Document, IdeaAttrs { }

interface IdeaModel extends mongoose.Model<IdeaDocument> {
   build(attrs: IdeaAttrs): IdeaDocument;
}

export interface IIdea extends IdeaAttrs {
   id: string;
}

const ideaSchema = new mongoose.Schema(
   {
      name: {
         type: String,
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

ideaSchema.statics.build = (attrs: IdeaAttrs) => {
   return new Idea(attrs);
};

export const Idea =
   mongoose.models.Idea ||
   mongoose.model<IdeaDocument, IdeaModel>("Idea", ideaSchema);
