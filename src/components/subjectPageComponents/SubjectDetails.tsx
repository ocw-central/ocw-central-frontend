import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { Subject } from "@/gqltypes/subject";

export function SubjectDetails({ subject }: { subject: Subject }) {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="subject details">
          <TableHead>
            <TableRow>
              {subject.firstHeldOn && (
                <TableCell>
                  <b>開講日</b>
                </TableCell>
              )}
              {subject.category && (
                <TableCell>
                  <b>カテゴリ</b>
                </TableCell>
              )}
              {subject.location && (
                <TableCell>
                  <b>開催場所</b>
                </TableCell>
              )}
              {subject.department && (
                <TableCell>
                  <b>開講学科</b>
                </TableCell>
              )}
              {subject.faculty && (
                <TableCell>
                  <b>担当教員</b>
                </TableCell>
              )}
              {subject.language && (
                <TableCell>
                  <b>言語</b>
                </TableCell>
              )}
              {subject.freeDescription && (
                <TableCell>
                  <b>概要</b>
                </TableCell>
              )}
              {subject.series && (
                <TableCell>
                  <b>シリーズ</b>
                </TableCell>
              )}
              {subject.academicField && (
                <TableCell>
                  <b>学術分野</b>
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
