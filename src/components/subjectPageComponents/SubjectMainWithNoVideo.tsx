import { Box } from "@mui/material";

//import { ChapterBox } from "./subjectPageComponents/ChapterBox";
import { SubjectDetails } from "@/components/subjectPageComponents/SubjectDetails";
import { SubjectResources } from "@/components/subjectPageComponents/SubjectResources";
import { SubjectSyllabus } from "@/components/subjectPageComponents/SubjectSyllabus";

type Subject = {
  __typename?: "Subject" | undefined;
  id: string;
  title: string;
  category: string;
  location: string;
  department: string;
  firstHeldOn?: any;
  faculty: string;
  language: string;
  freeDescription: string;
  series: string;
  academicField: string;
  thumbnailLink: string;
  videos: {
    __typename?: "Video" | undefined;
    id: string;
    title: string;
    ordering: number;
    link: string;
    faculty: string;
    lecturedOn: any;
    videoLength: number;
    language: string;
    chapters: {
      __typename?: "Chapter" | undefined;
      id: string;
      startAt: number;
      topic: string;
      thumbnailLink: string;
    }[];
  }[];
  resources: {
    __typename?: "Resource" | undefined;
    id: string;
    title: string;
    ordering: number;
    description: string;
    link: string;
  }[];
  relatedSubjects: {
    __typename?: "RelatedSubject" | undefined;
    id: string;
    title: string;
    thumbnailLink: string;
    faculty: string;
  }[];
  syllabus?:
    | {
        __typename?: "Syllabus" | undefined;
        id: string;
        faculty: string;
        language: string;
        subjectNumbering: string;
        academicYear: number;
        semester: string;
        numCredit: number;
        courseFormat: string;
        assignedGrade: string;
        targetedAudience: string;
        courseDayPeriod: string;
        outline: string;
        objective: string;
        lessonPlan: string;
        gradingMethod: string;
        courseRequirement: string;
        outClassLearning: string;
        reference: string;
        remark: string;
        subpages: {
          __typename?: "Subpage" | undefined;
          id: string;
          content: string;
        }[];
      }
    | null
    | undefined;
};

type Props = {
  //setVideoIdFunc: (videoId: string) => void;
  subject: Subject;
};

export function SubjectMainWithNoVideo(props: Props) {
  const hasResources = props.subject.resources.length > 0;
  const hasDetails =
    props.subject.firstHeldOn ||
    props.subject.category ||
    props.subject.location ||
    props.subject.department ||
    props.subject.faculty ||
    props.subject.language ||
    props.subject.freeDescription ||
    props.subject.series ||
    props.subject.academicField;
  const hasSyllabus = props.subject.syllabus !== null;

  return (
    <Box className="Subject">
      <Box className="MainBox">
        {hasResources && <SubjectResources subject={props.subject} />}
        {hasDetails && <SubjectDetails subject={props.subject} />}
        {hasSyllabus && <SubjectSyllabus subject={props.subject} />}
      </Box>
    </Box>
  );
}
