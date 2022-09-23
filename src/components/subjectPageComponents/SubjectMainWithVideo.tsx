import { youtube_parser } from "@/utils/youtubeParser";
import { Box, Typography } from "@mui/material";
import YouTube from "react-youtube";
//import { ChapterBox } from "./subjectPageComponents/ChapterBox";
import { SubjectDetails } from "@/components/subjectPageComponents/SubjectDetails";
import { SubjectResources } from "@/components/subjectPageComponents/SubjectResources";
import { VideosBox } from "@/components/subjectPageComponents/VideosBox";
import { Video } from "@/generated/graphql";
import { useState } from "react";
import { SubjectSyllabus } from "./SubjectSyllabus";

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
  const FocusedVideo = videos[FocusedVideoOrdering];
  const FocusedYoutubeId = youtube_parser(FocusedVideo.link);

  // const video = videos.find((video) => video.id === videoId);

  return (
    <Box className="Subject">
      <Box className="MainBox">
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
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              borderRadius: 1,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                component="div"
                align="left"
                color="primary"
                sx={{ color: "primary.main", borderLeft: 1, p: 1 }}
              >
                {FocusedVideo?.title}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                align="left"
                gutterBottom={true}
                sx={{ p: 1 }}
              >
                {FocusedVideo?.faculty}
              </Typography>
              <YouTube
                videoId={FocusedYoutubeId}
                opts={{
                  height: "390",
                  width: "640",
                  playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: 0,
                  },
                }}
              />
            </Box>
            <VideosBox
              subject={props.subject}
              videos={videos}
              setFocusedVideoOrdering={SetFocusedVideoOrdering}
            />
          </Box>
          <SubjectResources subject={props.subject} />
          <SubjectDetails subject={props.subject} />
          <SubjectSyllabus subject={props.subject} />
        </Box>
      </Box>
    </Box>
  );
}
