import mongoose, { Document, Model, Schema } from "mongoose";

export interface ActivityLogsAttrs {
  action: string;
  createdBy: string;
  typeOfAction: string;
}

export interface IActivityLogs extends ActivityLogsAttrs {
  _id: string;
  // createdAt: string;
  // updatedAt: string;
}

interface ActivityLogsDocument extends Document, ActivityLogsAttrs {}

interface ActivityLogsModel extends Model<ActivityLogsDocument> {
  build(attrs: ActivityLogsAttrs): ActivityLogsDocument;
}

const ActivityLogsSchema = new Schema<ActivityLogsDocument, ActivityLogsModel>({
  action: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  typeOfAction: {
    type: String,
    required: true,
  },
});

ActivityLogsSchema.statics.build = function (
  attrs: ActivityLogsAttrs
): ActivityLogsDocument {
  return new ActivityLogs(attrs);
};

export const ActivityLogs =
  mongoose.models.ActivityLogs ||
  mongoose.model<ActivityLogsDocument, ActivityLogsModel>(
    "ActivityLogs",
    ActivityLogsSchema,
    "ActivityLogs"
  );
