import { Loading } from "@/components/common/Loading";
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
import { createSearchParams, useNavigate } from "react-router-dom";

export function SideBar() {
  function separateEnglishAndJapaneseWords(word: string[]) {
    const englishWords: string[] = [];
    const japaneseWords: string[] = [];
    word.forEach((word) => {
      if (word[0].match(/^[a-zA-Z0-9]+$/)) {
        // chack if the first character is English
        englishWords.push(word);
      } else {
        japaneseWords.push(word);
      }
    });
    return [englishWords, japaneseWords];
  }

  const { data, loading, error } = useAcademicFieldsQuery({});
  const navigate = useNavigate();

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

  const [englishFields, japaneseFields] = separateEnglishAndJapaneseWords(
    data.academicFields.map((academicField) => academicField.name)
  );

  return (
    <List
      subheader={
        <ListSubheader component="div" sx={{ textAlign: "left" }}>
          <Typography variant="h5">分野一覧</Typography>
        </ListSubheader>
      }
    >
      {japaneseFields.map((academicField) => (
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              const academicFieldParames = createSearchParams({
                field: academicField,
              });
              navigate(`/search/?${academicFieldParames}`);
            }}
          >
            <ListItemText primary={academicField} />
          </ListItemButton>
        </ListItem>
      ))}
      <Divider />
      {englishFields.map((academicField) => (
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              const academicFieldParames = createSearchParams({
                field: academicField,
              });
              navigate(`/search/?${academicFieldParames}`);
            }}
          >
            <ListItemText primary={academicField} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
