import { AcademicField } from "@/generated/graphql";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";
type Props = {
  academicField: AcademicField;
};

export const AcademicFieldCard = (props: Props) => {
  const navigate = useNavigate();
  return (
    <CardActionArea>
      <Card
        className="AcademicFieldCard"
        sx={{ display: "flex", maxWidth: "20em" }}
        onClick={() => {
          const academicFieldParames = createSearchParams({
            field: props.academicField.name,
          });
          navigate(`/search/?${academicFieldParames}`);
        }}
      >
        <CardContent sx={{ alignItems: "center" }}>
          <Typography variant="h6" component="div">
            {props.academicField.name}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};
