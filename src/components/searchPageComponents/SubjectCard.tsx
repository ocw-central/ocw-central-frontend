import { theme } from "@/utils/themes";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
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
const MyImageListItem = styled(ImageListItem)({
  "&:hover": {
    opacity: 0.5,
    transition: 0.3,
  },
});

export const SubjectCard = (subject: SubjectOnSearchPage) => {
  return (
    <Grid item xs={12} sm={4} md={3} sx={{ p: 1.5 }}>
      <Link to={`/subjects/?id=${subject.id}`}>
        <MyImageListItem>
          <img
            src={`${subject.thumbnailLink}`}
            loading="lazy"
            style={{ height: 200 }}
          />
          <MyImageListItemBar
            title={subject.title}
            subtitle={subject.faculty}
          />
        </MyImageListItem>
      </Link>
    </Grid>
  );
};
