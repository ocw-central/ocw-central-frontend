import { Loading } from "@/components/common/Loading";
import { useSearchVideosQuery } from "@/generated/graphql";
import { Grid, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { VideoCard } from "./VideoCard";

export function VideoPanel() {
  const [searchParams] = useSearchParams();

  const titleParam = searchParams.get("title");
  const title: string = titleParam !== null ? titleParam : "";
  const facultyParam = searchParams.get("faculty");
  const faculty: string = facultyParam !== null ? facultyParam : "";

  const { data, loading, error } = useSearchVideosQuery({
    variables: {
      title: title,
      faculty: faculty,
    },
    skip: title === "" && faculty === "",
  });
  if (loading) {
    return <Loading size={"7em"} color={"primary"} />;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <Grid
      container
      sx={{
        height: 400,
      }}
    >
      {data?.subjectsWithSpecifiedVideos?.length === 0 ? (
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: "black",
            }}
          >
            該当する科目がありません
          </Typography>
        </Grid>
      ) : (
        data?.subjectsWithSpecifiedVideos?.map((subjectWithSpecifiedVideos) =>
          subjectWithSpecifiedVideos.videos.map((video) => (
            <VideoCard
              subjectId={subjectWithSpecifiedVideos.subject.id}
              subjectThumbnailLink={
                subjectWithSpecifiedVideos.subject.thumbnailLink
              }
              videoId={video.id}
              videoTitle={video.title}
              videoFaculty={video.faculty}
              key={video.id}
            />
          ))
        )
      )}
    </Grid>
  );
}
