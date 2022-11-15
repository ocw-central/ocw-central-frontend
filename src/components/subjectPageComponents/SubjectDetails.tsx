import { Subject } from "@/gqltypes/subject";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

export function SubjectDetails({ subject }: { subject: Subject }) {
  const { t } = useTranslation();
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="subject details">
          <TableHead>
            <TableRow>
              {subject.firstHeldOn && (
                <TableCell>
                  <b>{t("translation.subject.details.first_held_on")}</b>
                </TableCell>
              )}
              {subject.category && (
                <TableCell>
                  <b>{t("translation.subject.details.category")}</b>
                </TableCell>
              )}
              {subject.location && (
                <TableCell>
                  <b>{t("translation.subject.details.location")}</b>
                </TableCell>
              )}
              {subject.department && (
                <TableCell>
                  <b>{t("translation.subject.details.department")}</b>
                </TableCell>
              )}
              {subject.faculty && (
                <TableCell>
                  <b>{t("translation.subject.details.faculty")}</b>
                </TableCell>
              )}
              {subject.language && (
                <TableCell>
                  <b>{t("translation.subject.details.language")}</b>
                </TableCell>
              )}
              {subject.freeDescription && (
                <TableCell>
                  <b>{t("translation.subject.details.free_description")}</b>
                </TableCell>
              )}
              {subject.series && (
                <TableCell>
                  <b>{t("translation.subject.details.series")}</b>
                </TableCell>
              )}
              {subject.academicField && (
                <TableCell>
                  <b>{t("translation.subject.details.academic_field")}</b>
                </TableCell>
              )}
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
                <TableCell>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: subject.freeDescription,
                    }}
                  ></div>
                </TableCell>
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
