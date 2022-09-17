import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Subject } from "../../models/subject";

type Props = {
  subject: Subject;
};

const thumbnailBaseURL = "/subject_thumbnails/";

export const SubjectCard = (props: Props) => {
  return (
    <Link to={`/subjecs/?id=${props.subject.id}`}>
      <CardActionArea>
        <Card className="SubjectCard" sx={{ m: 5, p: 5 }}>
          <CardMedia
            component="img"
            height="300"
            image={`${thumbnailBaseURL}${props.subject.id}.png`}
            alt="thumbnail of subject"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {props.subject.title}
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.subject.faculty}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Link>
  );
};
