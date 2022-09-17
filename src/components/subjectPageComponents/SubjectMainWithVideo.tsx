import { youtube_parser } from "@/utils/youtubeParser";
import { Box, Typography } from "@mui/material";
import YouTube from "react-youtube";
//import { ChapterBox } from "./subjectPageComponents/ChapterBox";
import { Video } from "@/generated/graphql";

type Props = {
  //setVideoIdFunc: (videoId: string) => void;
  videos: Video[];
};

export function SubjectMainWithVideo(props: Props) {
  const videos = props.videos ?? []; //already sorted by `ordering` field
  const hasVideos = videos.length > 0;

  const youtubeLinks = videos.map((video) => video.link);
  const youtubeIds = youtubeLinks.map((link) => youtube_parser(link));
  const topVideo = hasVideos ? videos[0] : null;
  const topYoutubeId = hasVideos ? youtubeIds[0] : "";

  //  const video = videos.find((video) => video.id === videoId);

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
              flexDirection: "row",
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
                {topVideo?.title}
              </Typography>
              <Typography
                variant="h4"
                component="div"
                align="left"
                gutterBottom={true}
                sx={{ p: 1 }}
              >
                {topVideo?.faculty}
              </Typography>
              {hasVideos && (
                <YouTube
                  videoId={topYoutubeId}
                  opts={{
                    height: "390",
                    width: "640",
                    playerVars: {
                      // https://developers.google.com/youtube/player_parameters
                      autoplay: 0,
                    },
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
