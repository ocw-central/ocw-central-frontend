import { Subject } from "@/gqltypes/subject";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

export function SubjectSyllabus({ subject }: { subject: Subject }) {
  const { t } = useTranslation();
  const syllabus = subject.syllabus;

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="subject details">
          <TableHead>
            <TableRow>
              {syllabus?.academicYear !== 0 && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.academic_year")} </b>
                </TableCell>
              )}
              {syllabus?.semester && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.semester")} </b>
                </TableCell>
              )}
              {syllabus?.numCredit !== 0 && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.num_credit")} </b>
                </TableCell>
              )}
              {syllabus?.assignedGrade && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.assigned_grade")} </b>
                </TableCell>
              )}
              {syllabus?.courseFormat && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.course_format")} </b>
                </TableCell>
              )}
              {syllabus?.targetedAudience && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.targeted_audience")} </b>
                </TableCell>
              )}
              {syllabus?.language && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.language")} </b>
                </TableCell>
              )}
              {syllabus?.courseDayPeriod && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.course_day_period")} </b>
                </TableCell>
              )}
              {syllabus?.faculty && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.faculty")} </b>
                </TableCell>
              )}
              {syllabus?.outline && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.outline")} </b>
                </TableCell>
              )}
              {syllabus?.objective && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.objective")} </b>
                </TableCell>
              )}
              {syllabus?.lessonPlan && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.lesson_plan")} </b>
                </TableCell>
              )}
              {syllabus?.gradingMethod && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.grading_method")} </b>
                </TableCell>
              )}
              {syllabus?.courseRequirement && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.course_requirement")} </b>
                </TableCell>
              )}
              {syllabus?.outClassLearning && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.outclass_learning")} </b>
                </TableCell>
              )}
              {syllabus?.reference && (
                <TableCell>
                  <b>{t("translation.subject.syllabus.reference")} </b>
                </TableCell>
              )}
            </TableRow>
            <TableRow>
              {(syllabus?.academicYear || syllabus?.academicYear !== 0) && (
                <TableCell>{syllabus?.academicYear}</TableCell>
              )}
              {syllabus?.semester && <TableCell>{syllabus.semester}</TableCell>}
              {(syllabus?.numCredit || syllabus?.numCredit !== 0) && (
                <TableCell>{syllabus?.numCredit}</TableCell>
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
