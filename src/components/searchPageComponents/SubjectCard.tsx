import { Grid, ImageListItem, ImageListItemBar } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

type SubjectOnSearchPage = {
  id: string;
  title: string;
  faculty: string;
  thumbnailLink: string;
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

export const SubjectCard = (subject: SubjectOnSearchPage) => {
  const thumbnailURL = "public/subject_thumbnails/" + subject.id + ".png";
  return (
    <Grid item xs={12} sm={4} md={4} sx={{ p: 0.5 }}>
      <Link to={`/subjects/${subject.id}`}>
        <MyImageListItem>
          <img src={thumbnailURL} loading="lazy" style={{ height: 280 }} />
          <MyImageListItemBar
            title={subject.title}
            subtitle={subject.faculty}
          />
        </MyImageListItem>
      </Link>
    </Grid>
  );
};
