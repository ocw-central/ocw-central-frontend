import { AcademicFieldCard } from "@/components/AcadecFieldsPageComponents/AcademicFieldCard";
import { Loading } from "@/components/common/Loading";
import { useAcademicFieldsQuery } from "@/generated/graphql";
import { Grid } from "@mui/material";

export function AcademicFields() {
  const { data, loading, error } = useAcademicFieldsQuery({});
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>Failed to fetch useAcademicFieldsQuery in AcademicFields.tsx</div>
    );
  }

  if (!data) {
    return <div>no data</div>;
  }

  return (
    <Grid container spacing={2}>
      {data.academicFields.map((academicField) => (
        <Grid item xs={12} sm={6} md={4} key={academicField.name}>
          <AcademicFieldCard academicField={academicField} />
        </Grid>
      ))}
    </Grid>
  );
}
