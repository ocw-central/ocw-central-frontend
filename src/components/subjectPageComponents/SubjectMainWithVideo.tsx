import { PlayerWrapper } from "@/components/subjectPageComponents/PlayerWrapper";
import { VideoTranscription } from "@/components/subjectPageComponents/VideoTranscription";
import { Video } from "@/generated/graphql";
import { theme } from "@/utils/themes";
import { youtube_parser } from "@/utils/youtubeParser";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";

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
    transcription: string;
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
  focusedVideoOrdering: number;
};

export function SubjectMainWithVideo(props: Props) {
  const videos = props.videos ?? []; //already sorted by `ordering` field
  const [VideoStartTime, SetVideoStartTime] = useState(0);
  const [AutoPlayOn, SetAutoPlayOn] = useState(0);
  const FocusedVideo = videos[props.focusedVideoOrdering];
  const FocusedYoutubeId = youtube_parser(FocusedVideo.link);

  return (
    <Grid
      container
      spacing={0}
      direction={{ xs: "row", sm: "row", md: "row" }}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        direction={{ xs: "column", sm: "column", md: "row" }}
        md={7}
        sm={12}
        xs={12}
        sx={{
          justifyContent: "center",
          ml: { xs: 0, sm: 0, md: 0 },
          pb: 5,
          minHeight: {
            md: 420,
          },
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          {props.subject.title}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            width: "100%",
            fontWeight: "medium",
            color: theme.palette.primary.dark,
          }}
        >
          {FocusedVideo.title} | {FocusedVideo.faculty.trim()}
        </Typography>
        <PlayerWrapper
          FocusedYoutubeId={FocusedYoutubeId}
          startAt={VideoStartTime}
          autoPlayOn={AutoPlayOn}
        />
      </Grid>
      {FocusedVideo.transcription && (
        <Grid item md={4} sm={12} xs={12} sx={{ pl: 3 }}>
          <VideoTranscription
            transcription={FocusedVideo.transcription}
            setTime={SetVideoStartTime}
            setAutoPlayOn={SetAutoPlayOn}
          />
        </Grid>
      )}
    </Grid>
  );
}
