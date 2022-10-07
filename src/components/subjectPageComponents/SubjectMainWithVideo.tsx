import { youtube_parser } from "@/utils/youtubeParser";
import { Accordion, Box, Button, Grid, Typography } from "@mui/material";
import YouTube from "react-youtube";
//import { ChapterBox } from "./subjectPageComponents/ChapterBox";
import { VideosBox } from "@/components/subjectPageComponents/VideosBox";
import { Video } from "@/generated/graphql";
import { useState } from "react";
import ReactPlayer from "react-player";
import { VideoWrapper } from "./VideoWrapper";

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

type Props = {
  //setVideoIdFunc: (videoId: string) => void;
  subject: Subject;
  videos: Video[];
};

export function SubjectMainWithVideo(props: Props) {
  const videos = props.videos ?? []; //already sorted by `ordering` field
  const [FocusedVideoOrdering, SetFocusedVideoOrdering] = useState(0);
  const [startAt, setStartAt] = useState(0);
  const FocusedVideo = videos[FocusedVideoOrdering];
  const FocusedYoutubeId = youtube_parser(FocusedVideo.link);

  // const video = videos.find((video) => video.id === videoId);
  console.log(startAt);
  return (
    <Grid
      container
      direction="column"
      className="MainBox"
      sx={{
        pb: 3,
      }}
    >
      <Grid
        container
        spacing={0}
        direction={{ xs: "column", sm: "column", md: "row" }}
        sx={{
          justifyContent: "center",
        }}
      >
        {props.videos.length >= 1 && (
          <Grid
            item
            md={3}
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
            }}
            className="VideoBox"
          >
            <VideosBox
              subject={props.subject}
              videos={videos}
              focusedVideoOrdering={FocusedVideoOrdering}
              setFocusedVideoOrdering={SetFocusedVideoOrdering}
            />
          </Grid>
        )}
        <Grid
          container
          direction="row"
          md={8}
          sm={12}
          xs={12}
          sx={{
            justifyContent: "center",
            ml: 5,
            pb: 5,
            minHeight: {
              md: 420,
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 2, width: "100%", fontWeight: "bold" }}
          >
            {props.subject.title}
          </Typography>
          <VideoWrapper FocusedYoutubeId={FocusedYoutubeId} startAt={startAt} />
        </Grid>
        {props.videos.length >= 1 && (
          <Grid
            item
            sx={{
              display: { xs: "block", sm: "block", md: "none" },
            }}
            className="VideoBox"
          >
            <VideosBox
              subject={props.subject}
              videos={videos}
              focusedVideoOrdering={FocusedVideoOrdering}
              setFocusedVideoOrdering={SetFocusedVideoOrdering}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
