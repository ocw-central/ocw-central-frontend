import { Video } from "@/generated/graphql";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Box, ListItemIcon, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { FixedSizeList, ListChildComponentProps } from "react-window";

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
  //colorize selected component

  function renderRow(propsRender: ListChildComponentProps) {
    const { index, style } = propsRender;

    return (
      <ListItem style={style} key={index} button={true}>
        <ListItemButton
          sx={{
            border: "1em",
            marginTop: "1em",
          }}
        >
          <ListItemIcon>
            <PlayCircleIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${propsVideo.videos[index].ordering + 1}. ${
              propsVideo.videos[index].title
            }`}
            primaryTypographyProps={{
              color: "primary.dark",
              fontWeight: "medium",
              variant: "body1",
            }}
            secondary={
              `${propsVideo.videos[index].faculty} ` +
              `${propsVideo.videos[index].lecturedOn.slice(0, 10)} ` +
              `${propsVideo.videos[index].language} ` +
              `${secondsToHms(propsVideo.videos[index].videoLength)}`
            }
            onClick={() => {
              propsVideo.setFocusedVideoOrdering(
                propsVideo.videos[index].ordering
              );
              navigate(
                `/subjects/${propsVideo.subject.id}&video=${propsVideo.videos[index].id}` //FIXME ad-hoc solution for routing
              );
            }}
          />
        </ListItemButton>
      </ListItem>
    );
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
        講義一覧 ({propsVideo.videos.length})
      </Typography>

      <FixedSizeList
        height={400}
        width={560}
        itemSize={130}
        itemCount={propsVideo.videos.length}
        overscanCount={100}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
