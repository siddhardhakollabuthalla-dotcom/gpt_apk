import { Timestamp } from "firebase/firestore";

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  coverImage: string;
  galleryImages: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
