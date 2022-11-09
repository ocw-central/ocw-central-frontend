import { Grid, ImageListItem, ImageListItemBar } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

type Props = {
  subjectId: string;
  // FIXME: thumbnailLink should be video's one
  //        for now, we can't access video's thumbnailLink via query
  subjectThumbnailLink: string;
  videoId: string;
  videoTitle: string;
  videoFaculty: string;
};

const MyImageListItemBar = styled(ImageListItemBar)({
  color: "white",
  backgroundColor: alpha("#000", 0.75),
});
const MyImageListItem = styled(ImageListItem)({
  "&:hover": {
    opacity: 0.5,
    transition: 0.3,
  },
});

export const VideoCard = (props: Props) => {
  return (
    <Grid item xs={12} sm={4} md={4} sx={{ p: 0.5 }}>
      <Link to={`/subjects/${props.subjectId}?video_id=${props.videoId}`}>
        <MyImageListItem>
          <img
            src={`${props.subjectThumbnailLink}`}
            loading="lazy"
            style={{ height: 280 }}
          />
          <MyImageListItemBar
            title={props.videoTitle}
            subtitle={props.videoFaculty}
          />
        </MyImageListItem>
      </Link>
    </Grid>
  );
};
