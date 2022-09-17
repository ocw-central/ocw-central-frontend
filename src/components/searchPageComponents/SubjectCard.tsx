import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const thumbnailBaseURL = "/subject_thumbnails/";

type SubjectOnSearchPage = {
  id: string;
  title: string;
  faculty: string;
  thumbnailLink: string;
};

export const SubjectCard = (subject: SubjectOnSearchPage) => {
  return (
    <Link to={`/subjects/?id=${subject.id}`}>
      <CardActionArea>
        <Card className="SubjectCard" sx={{ m: 5, p: 5 }}>
          <CardMedia
            component="img"
            height="300"
            image={`${thumbnailBaseURL}${subject.id}.png`}
            alt="thumbnail of subject"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {subject.title}
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {subject.faculty}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Link>
  );
};
