import { Video } from "@/generated/graphql";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  setFocusedVideoOrdering: (videoId: number) => void;
  subjectId: string;
  videos: Video[];
};

export function VideosBox(props: Props) {
  const VideoItems = [];
  const navigate = useNavigate();
  const location = useLocation();

  for (const video of props.videos) {
    const VideoItem = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "row",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
          borderBottom: 2,
        }}
        onClick={() => {
          props.setFocusedVideoOrdering(video.ordering);
          navigate(
            `/subjects/?id=${props.subjectId}&video=${video.id}` //FIXME ad-hoc solution for routing
          );
        }}
      >
        {/*  <img #FIXME after adding thumbnail field to Video model
          src={video.thumbnailLink}
          style={{ width: "20%", height: "100%" }}
        /> */}
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
          <Typography variant="h5" component="div" align="left">
            {video.title}
          </Typography>
          <Typography variant="h6" component="div" align="left">
            {video.faculty}
          </Typography>
        </Box>
      </Box>
    );
    VideoItems.push(VideoItem);
  }
  return (
    <Box
      className="VideoBox"
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRadius: 1,
        p: 5,
      }}
    >
      <Typography
        variant="h3"
        component="div"
        align="center"
        sx={{
          bgcolor: "secondary.dark",
          color: "primary.contrastText",
          borderLeft: 1,
          p: 1,
        }}
      >
        動画一覧
      </Typography>
      {VideoItems}
    </Box>
  );
}
