import { Loading } from "@/components/common/Loading";
import { useSubjectOnSearchPageQuery } from "@/generated/graphql";
import { Grid, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { SubjectCard } from "./SubjectCard";

export function SubjectPanel() {
  const [searchParams] = useSearchParams();

  const titleParam = searchParams.get("title");
  const title: string = titleParam !== null ? titleParam : "";
  const facultyParam = searchParams.get("faculty");
  const faculty: string = facultyParam !== null ? facultyParam : "";
  const academicFieldParam = searchParams.get("field");
  const field: string = academicFieldParam !== null ? academicFieldParam : "";

  const { data, loading, error } = useSubjectOnSearchPageQuery({
    variables: {
      title: title,
      faculty: faculty,
      field: field,
    },
    skip: title === "" && faculty === "" && field === "",
  });
  if (loading) {
    return <Loading size={"7em"} color={"primary"} />;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <Grid
      container
      sx={{
        height: 400,
      }}
    >
      {data?.subjects?.length === 0 ? (
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: "black",
            }}
          >
            該当する科目がありません
          </Typography>
        </Grid>
      ) : (
        data?.subjects?.map((subject) => (
          <Grid item xs={12} sm={4} md={4} sx={{ p: 0.5 }} key={subject.id}>
            <SubjectCard
              id={subject.id}
              key={subject.id}
              title={subject.title}
              faculty={subject.faculty}
              thumbnailLink={subject.thumbnailLink}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
}
