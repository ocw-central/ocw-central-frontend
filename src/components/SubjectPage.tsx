import { Loading } from "@/components/common/Loading";
import { SubjectCopyrightCard } from "@/components/subjectPageComponents/SubjectCopyrightCard";
import { SubjectMainWithVideo } from "@/components/subjectPageComponents/SubjectMainWithVideo";
import { useSubjectQuery } from "@/generated/graphql";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

//import { ChapterBox } from "./subjectPageComponents/ChapterBox";
import { SubjectDetails } from "@/components/subjectPageComponents/SubjectDetails";
import { SubjectResources } from "@/components/subjectPageComponents/SubjectResources";
import { SubjectSyllabus } from "@/components/subjectPageComponents/SubjectSyllabus";

//import { ChapterBox } from "./subjectPageComponents/ChapterBox";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

export function SubjectPage() {
  let { id } = useParams();
  // FIXME: I don't know how to distinguish parameter and search parameter
  id = id?.replace(/\&.+/, "");

  const { data, loading, error } = useSubjectQuery({
    variables: {
      id: id ? id : "",
    },
  });

  if (loading) {
    return <Loading size={"7em"} color={"primary"} />;
  }

  if (error) {
    return <div>failed to fetch use SubjectQuery in SubjectPage</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  const subject = data.subject;
  const videos = subject.videos ?? []; //already sorted by `ordering` field
  const hasVideos = videos.length > 0;

  //const chapters = videos.chapters ?? [];
  const syllabus = subject.syllabus;

  const hasResources = subject.resources.length > 0;
  const hasDetails =
    subject.firstHeldOn ||
    subject.category ||
    subject.location ||
    subject.department ||
    subject.faculty ||
    subject.language ||
    subject.freeDescription ||
    subject.series ||
    subject.academicField;
  const hasSyllabus = subject.syllabus !== null;

  return (
    <Box className="Subject">
      <Box
        className="MainBox"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Typography variant="h3" component="div" align="left" sx={{ p: 1 }}>
            {subject.title}
          </Typography>
        </Box>
        {hasVideos && (
          <SubjectMainWithVideo subject={subject} videos={videos} />
        )}
      </Box>
      <Box>
        {hasResources && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="resource"
              id="resource"
            >
              <Typography sx={{ fontWeight: "bold" }}>講義資料</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SubjectResources subject={subject} />
            </AccordionDetails>
          </Accordion>
        )}
        {hasDetails && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="details"
              id="details"
            >
              <Typography sx={{ fontWeight: "bold" }}>講義詳細</Typography>
            </AccordionSummary>
            <SubjectDetails subject={subject} />
          </Accordion>
        )}
        {hasSyllabus && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="syllabus"
              id="syllabus"
            >
              <Typography sx={{ variant: "h6", fontWeight: "bold" }}>
                シラバス
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SubjectSyllabus subject={subject} />
            </AccordionDetails>
          </Accordion>
        )}
      </Box>
      <Box
        className="CopyrightBox"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          p: "2.5em",
        }}
      >
        <SubjectCopyrightCard
          title={subject.title}
          subject_faculty={subject.faculty}
          syllabus_faculty={syllabus?.faculty}
          subject_year={subject.firstHeldOn}
          syllabus_year={syllabus?.academicYear}
          videos={videos}
        />
      </Box>
    </Box>
  );
}
