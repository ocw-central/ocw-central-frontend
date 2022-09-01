import { Box, Typography } from "@mui/material";
import { useState } from "react";
import YouTube from "react-youtube";
import { MockSubjects } from "../mock/MockSubjects";
import { Subject } from "../models/subject";
import { Video } from "../models/video";
import { ChapterBox } from "./subjectPageComponents/ChapterBox";
import { VideosBox } from "./subjectPageComponents/VideosBox";

// 実際にはparams.idから取得
//const params = useParams();
const subject: Subject = MockSubjects[0];

const videos: Video[] = subject.videos ?? [];

export function SubjectPage() {
  const [videoId, setVideoId] = useState(videos[0].id);
  const video = videos.find((video) => video.id === videoId);

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
          <Typography variant="h2" component="div" align="left" sx={{ p: 1 }}>
            {subject.title}
          </Typography>
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
                {video?.title}
              </Typography>
              <Typography
                variant="h4"
                component="div"
                align="left"
                gutterBottom={true}
                sx={{ p: 1 }}
              >
                {video?.faculties && video?.faculties.join(", ")}
              </Typography>
              <YouTube videoId={video?.videoId} />
            </Box>
            {videoId && (
              <VideosBox
                videos={videos}
                setVideoIdFunc={(videoId?: string) => {
                  videoId && setVideoId(videoId);
                }}
              />
            )}
          </Box>
        </Box>
      </Box>

      <ChapterBox />
    </Box>
  );
}
