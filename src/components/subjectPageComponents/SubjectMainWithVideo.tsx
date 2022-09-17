import { youtube_parser } from "@/utils/youtubeParser";
import { Box, Typography } from "@mui/material";
import YouTube from "react-youtube";
//import { ChapterBox } from "./subjectPageComponents/ChapterBox";
import { VideosBox } from "@/components/subjectPageComponents/VideosBox";
import { Video } from "@/generated/graphql";
import { useState } from "react";

type Props = {
  //setVideoIdFunc: (videoId: string) => void;
  subjectId: string;
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
                variant="h3"
                component="div"
                align="left"
                color="primary"
                sx={{ color: "primary.main", borderLeft: 1, p: 1 }}
              >
                {FocusedVideo?.title}
              </Typography>
              <Typography
                variant="h4"
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
              subjectId={props.subjectId}
              videos={videos}
              setFocusedVideoOrdering={SetFocusedVideoOrdering}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
