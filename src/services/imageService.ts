import { storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const uploadImage = async (file: File) => {
  const imageRef = ref(storage, `events/${Date.now()}-${file.name}`);

  await uploadBytes(imageRef, file);

  return await getDownloadURL(imageRef);
};

export const removeImage = async (imageUrl: string) => {
  const imageRef = ref(storage, imageUrl);

  await deleteObject(imageRef);
};
