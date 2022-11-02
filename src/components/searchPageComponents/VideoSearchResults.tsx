import { VideoCard } from "@/components/searchPageComponents/VideoCard";
import { Grid, Typography } from "@mui/material";
import { SubjectsWithSpecifiedVideos } from "@/gqltypes/subjectsWithSpecifiedVideos";

export const VideoSearchResults = (
  subjectsWithSpecifiedVideos: SubjectsWithSpecifiedVideos
) => {
  if (subjectsWithSpecifiedVideos.subjectsWithSpecifiedVideos?.length === 0) {
    return (
      <Typography
        variant="h5"
        component="div"
        align="center"
        sx={{ color: "black" }}
      >
        該当する科目がありません
      </Typography>
    );
  }
  return (
    <Grid container sx={{ height: 400 }}>
      {subjectsWithSpecifiedVideos.subjectsWithSpecifiedVideos?.map(
        (subjectWithSpecifiedVideos) =>
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
      )}
    </Grid>
  );
};
