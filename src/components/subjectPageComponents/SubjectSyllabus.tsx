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
                <TableCell>開講年度・開講期</TableCell>
              )}
              {syllabus?.semester && <TableCell>開講学期</TableCell>}
              {syllabus?.numCredit && <TableCell>単位数</TableCell>}
              {syllabus?.assignedGrade && <TableCell>配当学年</TableCell>}
              {syllabus?.courseFormat && <TableCell>授業形態</TableCell>}
              {syllabus?.targetedAudience && <TableCell>対象学生</TableCell>}
              {syllabus?.language && <TableCell>使用言語</TableCell>}
              {syllabus?.courseDayPeriod && <TableCell>曜時限</TableCell>}
              {syllabus?.faculty && <TableCell>教員</TableCell>}
              {syllabus?.outline && <TableCell>授業概要</TableCell>}
              {syllabus?.objective && <TableCell>授業の概要・目的</TableCell>}
              {syllabus?.lessonPlan && <TableCell>授業計画と内容</TableCell>}
              {syllabus?.gradingMethod && (
                <TableCell>成績評価の方法・観点</TableCell>
              )}
              {syllabus?.courseRequirement && <TableCell>履修要件</TableCell>}
              {syllabus?.outClassLearning && (
                <TableCell>授業外学習（予習・復習）等</TableCell>
              )}
              {syllabus?.reference && <TableCell>教科書・参考書等</TableCell>}
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
