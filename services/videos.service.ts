import { Videos, IVideos } from './../models/videos';

export async function getOne() {
   try {
      
      const result = await Videos.find();
      console.log("get videos from the service", result)

      return result[0];
   } catch (error) {
      console.log(error);
   }
}

export async function updateOne(videos: IVideos) {
   try {
      console.log("videos from the service", videos)

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
      console.log("videos from the service", videos)

      const newVideos = new Videos(videos)
      await newVideos.save();
      return newVideos.toJSON();
   } catch (error) {
      console.log(error);
   }
}