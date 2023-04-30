import { Videos, IVideos } from './../models/videos';

export async function getOne() {
   try {
      const result = await Videos.find();

      return result[0];
   } catch (error) {
      console.log(error);
   }
}

export async function updateOne(videos: IVideos) {
   try {
      const updateResult = await Videos.updateOne(
         { _id: videos.id },
         {
            $set: { ...videos },
         }
      );

      const updatedVideos = await Videos.findById(videos.id);
      return updatedVideos.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function insertOne(videos: IVideos) {
   try {
      const newVideos = new Videos(videos)
      await newVideos.save();
      return newVideos.toJSON();
   } catch (error) {
      console.log(error);
   }
}