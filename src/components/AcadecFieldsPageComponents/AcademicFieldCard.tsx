import { AcademicField } from "@/generated/graphql";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  academicField: AcademicField;
};

export const AcademicFieldCard = (props: Props) => {
  return (
    <Link to={`/subjects/?field=${props.academicField.name.toLowerCase()}`}>
      <CardActionArea>
        <Card
          className="AcademicFieldCard"
          sx={{ display: "flex", maxWidth: "20em" }}
        >
          <CardContent sx={{ alignItems: "center" }}>
            <Typography variant="h6" component="div">
              {props.academicField.name}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Link>
  );
};
