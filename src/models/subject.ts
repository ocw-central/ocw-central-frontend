import { Resource } from "./resource";
import { Video } from "./video";

export type Subject = {
  id: string;
  title: string;
  thumbnailLink?: string;
  category?: string;
  videos?: Video[];
  location?: string;
  resources?: Resource[];
  relatedSubjects?: Subject[];
  department?: string;
  firstHeldOn?: number;
  faculty?: string[];
  language?: string;
  freeDescription?: string;
  series?: string;
  academicField?: string;
  //syllabus: Syllabus;
};
