import { IBlob, Blob } from "../models/mongoose/blob";

export async function storeBlob(blob: IBlob) {
  try {
    const newBlob = new Blob(blob);
    await newBlob.save()
    return newBlob;
  } catch (error) {
    console.log('dms.service.storeBlob', error);
  }
}

export async function getCourseBlobs(courseId: string, type: string) {
  try {
    return await Blob.find({ courseId: courseId, type: type  });
  } catch (error) {
    console.log("dms.service.getCourseBlobs", error);
  }
}


export async function deleteBlob(blobId: string) {
  try {
    return await Blob.deleteOne({ blobId: blobId });
  } catch (error) {
    console.log("dms.service.deleteBlob", error);
  }
}
