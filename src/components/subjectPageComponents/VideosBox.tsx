import { Video } from "@/generated/graphql";
import { theme } from "@/utils/themes";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { alpha, Box, List, ListItemIcon } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { Subject } from "@/gqltypes/subject";

type Props = {
  focusedVideoOrdering: number;
  setFocusedVideoOrdering: (videoId: number) => void;
  subject: Subject;
  videos: Video[];
};

function secondsToHms(d: number) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + "h" : "";
  var mDisplay = m > 0 ? m + "m" : "";
  var sDisplay = s > 0 ? s + "s" : "";
  return hDisplay + mDisplay + sDisplay;
}

export function VideosBox(propsVideo: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <List
      sx={{
        width: "100%",
        maxHeight: 540,
        overflow: "auto",
      }}
    >
      {propsVideo.videos.map((video, index) => {
        return (
          <ListItem
            key={index}
            button={false}
            sx={{
              bgcolor:
                propsVideo.focusedVideoOrdering === video.ordering
                  ? alpha(theme.palette.primary.main, 0.1)
                  : "unset",
              "&:hover, &:focus": {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              },
              width: "100%",
            }}
            onClick={() => {
              propsVideo.setFocusedVideoOrdering(video.ordering);
              navigate(
                `/subjects/${propsVideo.subject.id}?video_id=${video.id}` //FIXME ad-hoc solution for routing
              );
            }}
          >
            <Box
              className="background"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: 10,
                bgcolor:
                  propsVideo.focusedVideoOrdering === video.ordering
                    ? alpha(theme.palette.primary.main, 0.8)
                    : "unset",
              }}
            />

            <ListItemIcon>
              <PlayCircleIcon />
            </ListItemIcon>
            <ListItemText
              primary={`${video.ordering + 1}. ${video.title}`}
              primaryTypographyProps={{
                color: "primary.dark",
                fontWeight: "medium",
                variant: "body1",
              }}
              secondary={
                `${video.faculty} ` +
                `${video.lecturedOn.slice(0, 10)} ` +
                `${video.language} ` +
                `${secondsToHms(video.videoLength)}`
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}
