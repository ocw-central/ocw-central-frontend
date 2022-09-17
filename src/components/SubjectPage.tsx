import { useSubjectQuery } from "@/generated/graphql";
import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { ChapterBox } from "./subjectPageComponents/ChapterBox";

// 実際にはparams.idから取得
//const params = useParams();

export function SubjectPage() {
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id")!;

  const { data, loading, error } = useSubjectQuery({
    variables: {
      id: id,
    },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  console.log(data);
  const subject = data.subject;
  const videos = subject.videos ?? []; //already sorted by `ordering` field
  const youtubeLinks = videos.map((video) => video.link);
  const youtubeIds = youtubeLinks.map((link) => link.split("=")[1]);
  const topVideo = videos[0];
  //const chapters = videos.chapters ?? [];
  const syllabus = subject.syllabus;

  //  const [videoId, setVideoId] = useState(videos[0].id);
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
              <YouTub
            </Box>
          </Box>
        </Box>
      </Box>

      <ChapterBox />
    </Box>
  );
}
