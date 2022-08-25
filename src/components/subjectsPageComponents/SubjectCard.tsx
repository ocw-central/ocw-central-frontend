import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Subject } from "../../models/subject";

type Props = {
  subject: Subject;
};

export const SubjectCard = (props: Props) => {
  return (
    <Link to={`/subject/${props.subject.id}`}>
      <Card className="SubjectCard" sx={{ m: 5, p: 3 }}>
        <CardMedia component="img" height="100" image={props.subject.thumbnail} />
        <CardContent>
          <Typography variant="h5" component="div">
            {props.subject.title}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.subject.faculties && props.subject.faculties.join(", ")}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
