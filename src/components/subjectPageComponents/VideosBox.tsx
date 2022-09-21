import { Video } from "@/generated/graphql";
import { Box, Typography } from "@mui/material";
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
  setFocusedVideoOrdering: (videoId: number) => void;
  subject: Subject;
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
          bgcolor: "background.paper",
          borderRadius: 1,
          borderBottom: 2,
        }}
        onClick={() => {
          props.setFocusedVideoOrdering(video.ordering);
          navigate(
            `/subjects/?id=${props.subject.id}&video=${video.id}` //FIXME ad-hoc solution for routing
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
