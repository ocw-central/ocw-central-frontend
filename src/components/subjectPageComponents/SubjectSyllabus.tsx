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

export function SubjectSyllabus({ subject }: { subject: Subject }) {
  const syllabus = subject.syllabus;

  return (
    <Box>
      <Typography variant="h5">シラバス</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="subject details">
          <TableHead>
            <TableRow>
              {syllabus?.academicYear && (
                <TableCell>
                  <b>開講年度・開講期</b>
                </TableCell>
              )}
              {syllabus?.semester && (
                <TableCell>
                  <b>開講学</b>期
                </TableCell>
              )}
              {syllabus?.numCredit && (
                <TableCell>
                  <b>単位数</b>
                </TableCell>
              )}
              {syllabus?.assignedGrade && (
                <TableCell>
                  <b>配当学年</b>
                </TableCell>
              )}
              {syllabus?.courseFormat && (
                <TableCell>
                  <b>授業形態</b>
                </TableCell>
              )}
              {syllabus?.targetedAudience && (
                <TableCell>
                  <b>対象学生</b>
                </TableCell>
              )}
              {syllabus?.language && (
                <TableCell>
                  <b>使用言語</b>
                </TableCell>
              )}
              {syllabus?.courseDayPeriod && (
                <TableCell>
                  <b>曜時限</b>
                </TableCell>
              )}
              {syllabus?.faculty && (
                <TableCell>
                  <b>教員</b>
                </TableCell>
              )}
              {syllabus?.outline && (
                <TableCell>
                  <b>授業概要</b>
                </TableCell>
              )}
              {syllabus?.objective && (
                <TableCell>
                  <b>授業の概要・目的</b>
                </TableCell>
              )}
              {syllabus?.lessonPlan && (
                <TableCell>
                  <b>授業計画と内容</b>
                </TableCell>
              )}
              {syllabus?.gradingMethod && (
                <TableCell>
                  <b>成績評価の方法・観点</b>
                </TableCell>
              )}
              {syllabus?.courseRequirement && (
                <TableCell>
                  <b>履修要件</b>
                </TableCell>
              )}
              {syllabus?.outClassLearning && (
                <TableCell>
                  <b>授業外学習（予習・復習）等</b>
                </TableCell>
              )}
              {syllabus?.reference && (
                <TableCell>
                  <b>教科書・参考書等</b>
                </TableCell>
              )}
            </TableRow>
            <TableRow>
              {syllabus?.academicYear && (
                <TableCell>{syllabus.academicYear}</TableCell>
              )}
              {syllabus?.semester && <TableCell>{syllabus.semester}</TableCell>}
              {syllabus?.numCredit && (
                <TableCell>{syllabus.numCredit}</TableCell>
              )}
              {syllabus?.assignedGrade && (
                <TableCell>{syllabus.assignedGrade}</TableCell>
              )}
              {syllabus?.courseFormat && (
                <TableCell>{syllabus.courseFormat}</TableCell>
              )}
              {syllabus?.targetedAudience && (
                <TableCell>{syllabus.targetedAudience}</TableCell>
              )}
              {syllabus?.language && <TableCell>{syllabus.language}</TableCell>}
              {syllabus?.courseDayPeriod && (
                <TableCell>{syllabus.courseDayPeriod}</TableCell>
              )}
              {syllabus?.faculty && (
                <TableCell>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: syllabus.faculty,
                    }}
                  ></div>
                </TableCell>
              )}
              {syllabus?.outline && (
                <TableCell>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: syllabus.outline,
                    }}
                  ></div>
                </TableCell>
              )}
              {syllabus?.objective && (
                <TableCell>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: syllabus.objective,
                    }}
                  ></div>
                </TableCell>
              )}
              {syllabus?.lessonPlan && (
                <TableCell>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: syllabus.lessonPlan,
                    }}
                  ></div>
                </TableCell>
              )}
              {syllabus?.gradingMethod && (
                <TableCell>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: syllabus.gradingMethod,
                    }}
                  ></div>
                </TableCell>
              )}
              {syllabus?.courseRequirement && (
                <TableCell>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: syllabus.courseRequirement,
                    }}
                  ></div>
                </TableCell>
              )}
              {syllabus?.outClassLearning && (
                <TableCell>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: syllabus.outClassLearning,
                    }}
                  ></div>
                </TableCell>
              )}
              {syllabus?.reference && (
                <TableCell>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: syllabus.reference,
                    }}
                  ></div>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  );
}
