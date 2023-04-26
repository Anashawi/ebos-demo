import mongoose from "mongoose";
import { authProviderEnum } from "./enums";

interface VideosAttrs {
  goalsVideo: string;
  staffOnDemand: string;
  communityAndCrowd: string;
  algorithms: string;
  leveragedAssets: string;
  Engagement: string;
  interface: string;
  dashboard: string;
  experimentation: string;
  socialPlatforms: string;
  ecoSystems: string;
  autonomy: string;
  infoIsPower: string;
  OTCR: string;
  valueDestruction: string;
  customerJourney: string;
  digitalPlatforms: string;
  buildingCapacity: string;
}
interface VideosDocument extends mongoose.Document, VideosAttrs { }

interface VideosModel extends mongoose.Model<VideosDocument> {
  build(attrs: VideosAttrs): VideosDocument;
}

export interface IVideos extends VideosAttrs {
  id: string;
}

const videosSchema = new mongoose.Schema(
  {
    goalsVideo: {
      type: String,
      required: true,
    },
    staffOnDemand: {
      type: String,
      required: true,
    },
    communityAndCrowd: {
      type: String,
      required: true,
    },
    algorithms: {
      type: String,
      required: true,
    },
    leveragedAssets: {
      type: String,
      required: true,
    },
    Engagement: {
      type: String,
      required: true,
    },
    interface: {
      type: String,
      required: true,
    },
    dashboard: {
      type: String,
      required: true,
    },
    experimentation: {
      type: String,
      required: true,
    },
    socialPlatforms: {
      type: String,
      required: true,
    },
    ecoSystems: {
      type: String,
      required: true,
    },
    autonomy: {
      type: String,
      required: true,
    },
    infoIsPower: {
      type: String,
      required: true,
    },
    OTCR: {
      type: String,
      required: true,
    },
    valueDestruction: {
      type: String,
      required: true,
    },
    customerJourney: {
      type: String,
      required: true,
    },
    digitalPlatforms: {
      type: String,
      required: true,
    },
    buildingCapacity: {
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


videosSchema.statics.build = (attrs: VideosAttrs) => {
  return new Videos(attrs);
};

export const Videos =
  mongoose.models.Videos ||
  mongoose.model<VideosDocument, VideosModel>("Videos", videosSchema);
