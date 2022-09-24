import { AcademicFieldCard } from "@/components/AcadecFieldsPageComponents/AcademicFieldCard";
import { useAcademicFieldsQuery } from "@/generated/graphql";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export function SideBar() {
  const { data, loading, error } = useAcademicFieldsQuery({});
  const navigate = useNavigate();
  if (loading) {
    return <div>loading...</div>;
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
    <List
      subheader={
        <ListSubheader component="div" sx={{ textAlign: "left" }}>
          <Typography variant="h5">分野一覧</Typography>
        </ListSubheader>
      }
    >
      <Divider />
      {data.academicFields.map((academicField) => (
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              const academicFieldParames = createSearchParams({
                field: academicField.name,
              });
              navigate(`/search/?${academicFieldParames}`);
            }}
          >
            <ListItemText primary={academicField.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
