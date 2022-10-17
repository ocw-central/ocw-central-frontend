import { Video } from "@/generated/graphql";
import { theme } from "@/utils/themes";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { alpha, Box, List, ListItemIcon } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";

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
