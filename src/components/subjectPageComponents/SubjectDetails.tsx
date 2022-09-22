import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
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

export function SubjectDetails({ subject }: { subject: Subject }) {
  return (
    <Box>
      <Typography variant="h4">講義詳細</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="subject details">
          <TableHead>
            <TableRow>
              {subject.firstHeldOn && <TableCell>開講日</TableCell>}
              {subject.category && <TableCell>カテゴリ</TableCell>}
              {subject.location && <TableCell>開催場所</TableCell>}
              {subject.department && <TableCell>開講学部</TableCell>}
              {subject.faculty && <TableCell>開講学科</TableCell>}
              {subject.language && <TableCell>言語</TableCell>}
              {subject.freeDescription && <TableCell>概要</TableCell>}
              {subject.series && <TableCell>シリーズ</TableCell>}
              {subject.academicField && <TableCell>学術分野</TableCell>}
            </TableRow>
            <TableRow>
              {subject.firstHeldOn && (
                <TableCell>{subject.firstHeldOn.slice(0, 10)}</TableCell>
              )}
              {subject.category && <TableCell>{subject.category}</TableCell>}
              {subject.location && <TableCell>{subject.location}</TableCell>}
              {subject.department && (
                <TableCell>{subject.department}</TableCell>
              )}
              {subject.faculty && <TableCell>{subject.faculty}</TableCell>}
              {subject.language && <TableCell>{subject.language}</TableCell>}
              {subject.freeDescription && (
                <TableCell>{subject.freeDescription}</TableCell>
              )}
              {subject.series && <TableCell>{subject.series}</TableCell>}
              {subject.academicField && (
                <TableCell>{subject.academicField}</TableCell>
              )}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  );
}
