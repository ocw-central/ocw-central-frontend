import { SubjectCard } from "@/components/common/SubjectCard";
import { Grid } from "@mui/material";

type Subjects = {
  subjects:
    | {
        __typename?: "Subject" | undefined;
        id: string;
        title: string;
        thumbnailLink: string;
        faculty: string;
      }[]
    | undefined;
};

export const SubjectGrid = (subjects: Subjects) => {
  if (subjects.subjects?.length === 0) {
    return <div>検索結果がありません</div>;
  }
  return (
    <Grid container>
      {subjects.subjects?.map((subject) => (
        <SubjectCard
          id={subject.id}
          title={subject.title}
          faculty={subject.faculty}
          thumbnailLink={subject.thumbnailLink}
        />
      ))}
    </Grid>
  );
};
