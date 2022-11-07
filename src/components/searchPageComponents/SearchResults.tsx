import { SubjectCard } from "@/components/searchPageComponents/SubjectCard";
import { Grid, Typography } from "@mui/material";
import { Subjects } from "@/gqltypes/subjects";

export const SearchResults = (subjects: Subjects) => {
  if (subjects.subjects?.length === 0) {
    return (
      <Typography
        variant="h5"
        component="div"
        align="center"
        sx={{ color: "black" }}
      >
        該当する科目がありません
      </Typography>
    );
  }
  return (
    <Grid container sx={{ height: 400 }}>
      {subjects.subjects?.map((subject) => (
        <Grid item xs={12} sm={4} md={4} sx={{ p: 0.5 }} key={subject.id}>
          <SubjectCard
            id={subject.id}
            key={subject.id}
            title={subject.title}
            faculty={subject.faculty}
            thumbnailLink={subject.thumbnailLink}
          />
        </Grid>
      ))}
    </Grid>
  );
};
