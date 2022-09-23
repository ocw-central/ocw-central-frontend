import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const thumbnailBaseURL = "/subject_thumbnails/";

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

export const SubjectCard = (subject: SubjectOnSearchPage) => {
  return (
    <Link to={`/subjects/?id=${subject.id}`}>
      <ImageListItem sx={{ height: 350, p: 1.5 }}>
        <img
          src={`${subject.thumbnailLink}`}
          loading="lazy"
          style={{ height: 200 }}
        />
        <MyImageListItemBar title={subject.title} subtitle={subject.faculty} />
      </ImageListItem>
    </Link>
  );
};
