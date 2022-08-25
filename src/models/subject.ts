import { Resource } from "./resource";
import { Video } from "./video";

export type Subject = {
  id: string;
  title: string;
  thumbnail?: string;
  category?: string;
  videos?: Video[];
  location?: string;
  resources?: Resource[];
  relatedSubjects?: Subject[];
  department?: string;
  firstHeldOn?: number;
  faculties?: string[];
  language?: string;
  freeDescription?: string;
  series?: string;
  academicField?: string;
  //syllabus: Syllabus;
};
