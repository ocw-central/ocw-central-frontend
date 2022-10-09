import { Loading } from "@/components/common/Loading";
import { SubjectCopyrightCard } from "@/components/subjectPageComponents/SubjectCopyrightCard";
import { SubjectMainWithVideo } from "@/components/subjectPageComponents/SubjectMainWithVideo";
import { useSubjectQuery } from "@/generated/graphql";
import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { SubjectDetails } from "@/components/subjectPageComponents/SubjectDetails";
import { SubjectResources } from "@/components/subjectPageComponents/SubjectResources";
import { SubjectSyllabus } from "@/components/subjectPageComponents/SubjectSyllabus";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useState } from "react";
import { VideosBox } from "./subjectPageComponents/VideosBox";

export function SubjectPage() {
  const [FocusedVideoOrdering, SetFocusedVideoOrdering] = useState(0);
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
    <Grid container className="Subject" direction="column">
      {!hasVideos && (
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          {subject.title}
        </Typography>
      )}
      {!hasVideos && subject.faculty && (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {subject.faculty}
        </Typography>
      )}

      {hasVideos && (
        <SubjectMainWithVideo
          subject={subject}
          videos={videos}
          focusedVideoOrdering={FocusedVideoOrdering}
        />
      )}
      <Grid
        container
        direction="column"
        width="80%"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {hasVideos && (
          <Accordion
            sx={{
              border: "3px solid #0F5173",
              m: "0.5em",
              width: "30%",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="videos"
              id="videos"
            >
              <Typography sx={{ fontWeight: "bold" }}>講義一覧</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <VideosBox
                subject={subject}
                videos={videos}
                focusedVideoOrdering={FocusedVideoOrdering}
                setFocusedVideoOrdering={SetFocusedVideoOrdering}
              />
            </AccordionDetails>
          </Accordion>
        )}
        {hasResources && (
          <Accordion
            sx={{
              border: "3px solid #0F5173",
              m: "0.5em",
              width: "30%",
            }}
          >
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
          <Accordion
            sx={{
              border: "3px solid #0F5173",
              m: "0.5em",
              width: "30%",
              justifyItems: "center",
            }}
          >
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
          <Accordion
            sx={{ border: "3px solid #0F5173", m: "0.5em", width: "30%" }}
          >
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
      </Grid>
      <Grid
        container
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
      </Grid>
    </Grid>
  );
}
