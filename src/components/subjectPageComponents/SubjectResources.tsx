import AttachmentIcon from "@mui/icons-material/Attachment";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/system";

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

export function SubjectResources({ subject }: { subject: Subject }) {
  return (
    <Box>
      {subject.resources.map((resource) => (
        <Paper key={resource.id} sx={{ my: 2 }}>
          <a href={resource.link} target="_blank" rel="noreferrer">
            <ListItem key={resource.id}>
              <ListItemButton>
                <ListItemIcon>
                  {resource.link.toLowerCase().endsWith(".pdf") ? (
                    <PictureAsPdfIcon sx={{ color: "red" }} />
                  ) : resource.link.toLowerCase().endsWith(".mp4") ? (
                    <VideoFileIcon sx={{ color: "red" }} />
                  ) : (
                    <AttachmentIcon sx={{ color: "secondary.main" }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={resource.title}
                  secondary={resource.description}
                />
              </ListItemButton>
            </ListItem>
          </a>
          <Divider />
        </Paper>
      ))}
    </Box>
  );
}
