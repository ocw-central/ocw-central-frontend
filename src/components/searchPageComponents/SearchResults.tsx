import { SubjectCard } from "@/components/searchPageComponents/SubjectCard";
import { Grid } from "@mui/material";
import { Subjects } from "@/gqltypes/subjects";

export const SearchResults = (subjects: Subjects) => {
  if (subjects.subjects?.length === 0) {
    return <div>検索結果がありません</div>;
  }
  return (
    <Grid container sx={{ height: 400 }}>
      {subjects.subjects?.map((subject) => (
        <SubjectCard
          id={subject.id}
          key={subject.id}
          title={subject.title}
          faculty={subject.faculty}
          thumbnailLink={subject.thumbnailLink}
        />
      ))}
    </Grid>
  );
};
