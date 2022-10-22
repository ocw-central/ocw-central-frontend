import { Loading } from "@/components/common/Loading";
import { SubjectCopyrightCard } from "@/components/subjectPageComponents/SubjectCopyrightCard";
import { SubjectDetails } from "@/components/subjectPageComponents/SubjectDetails";
import { SubjectResources } from "@/components/subjectPageComponents/SubjectResources";
import { SubjectSyllabus } from "@/components/subjectPageComponents/SubjectSyllabus";
import { VideoWithTranscription } from "@/components/subjectPageComponents/VideoWithTranscription";
import { useSubjectQuery } from "@/generated/graphql";
import { theme } from "@/utils/themes";
import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useState } from "react";
import { VideosBox } from "./subjectPageComponents/VideosBox";
import { ReportButton } from "./common/ReportButton";

export function SubjectPage() {
  const [FocusedVideoOrdering, SetFocusedVideoOrdering] = useState(0);
  let { id } = useParams();
  // FIXME: I don't know how to distinguish parameter and search parameter
  id = id?.replace(/&.+/, "");

  const removeParenthesis = (s: string) => {
    const re_full = /(\(|（)[^(）)]*(\)|）)/g;
    const re_half = /[(（].*?[)）]/g;
    return s.replace(re_full, " ").replace(re_half, " ");
  };
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
  const syllabus = subject.syllabus;

  // Component display flags
  const hasVideos = videos.length > 0;
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
    <Grid container className="Subject" direction="column" sx={{ mt: 3 }}>
      {!hasVideos && (
        <Typography
          sx={{
            mb: { xs: 1, sm: 2 },
            fontWeight: "bold",
            color: "black",
            fontSize: { xs: 20, sm: 30 },
          }}
        >
          {subject.title}
        </Typography>
      )}
      {!hasVideos && subject.faculty && (
        <Typography
          sx={{
            mb: { xs: 1, sm: 2 },
            width: "100%",
            fontWeight: "medium",
            color: theme.palette.primary.dark,
            fontSize: { xs: 18, sm: 28 },
          }}
        >
          {removeParenthesis(subject.faculty.trim())}
        </Typography>
      )}

      {hasVideos && (
        <VideoWithTranscription
          subject={subject}
          videos={videos}
          focusedVideoOrdering={FocusedVideoOrdering}
          setFocusedVideoOrdering={SetFocusedVideoOrdering}
        />
      )}
      <Grid
        container
        direction="column"
        width={{ md: "60%", sm: "90%", xs: "95%" }}
        sx={{ justifyContent: "center", mx: "auto" }}
      >
        {videos.length > 1 && (
          <Accordion
            sx={{
              border: "3px solid #0F5173",
              my: "0.5em",
              width: "100%",
            }}
            defaultExpanded={true}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="videos"
              id="videos"
            >
              <Typography sx={{ fontWeight: "bold" }}>
                講義一覧 ({videos.length})
              </Typography>
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
              my: "0.5em",
              width: "100%",
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
              my: "0.5em",
              width: "100%",
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
            sx={{ border: "3px solid #0F5173", my: "0.5em", width: "100%" }}
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
          pt: "2.5em",
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
      <Grid
        container
        sx={{
          justifyContent: "right",
          pr: 2,
        }}
      >
        <ReportButton
          url={`${location.pathname}?video_id=${videos[FocusedVideoOrdering].id}`}
          name="ご意見・不具合報告"
        />
      </Grid>
    </Grid>
  );
}
