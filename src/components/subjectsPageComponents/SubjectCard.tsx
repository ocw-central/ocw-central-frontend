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

export const SubjectCard = (props: Props) => {
  return (
    <Link to={`/subject/${props.subject.id}`}>
      <CardActionArea>
        <Card className="SubjectCard" sx={{ m: 5, p: 3 }}>
          <CardMedia
            component="img"
            height="300"
            image={props.subject.thumbnail}
            alt="thumbnail of subject"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {props.subject.title}
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.subject.faculties && props.subject.faculties.join(", ")}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Link>
  );
};
