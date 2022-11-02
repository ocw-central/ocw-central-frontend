import { Loading } from "@/components/common/Loading";
import { useAcademicFieldsQuery } from "@/generated/graphql";
import { theme } from "@/utils/themes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { alpha } from "@mui/material/styles";
import { createSearchParams, useNavigate } from "react-router-dom";

type Props = {
  jpFieldOpen: boolean;
  setJpFieldOpen: React.Dispatch<React.SetStateAction<boolean>>;
  enFieldOpen: boolean;
  setEnFieldOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
};

export function AcademicFieldsList(props: Props) {
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
    return <Loading size={"5em"} color={"primary"} />;
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
    <List sx={{ margin: "2em" }}>
      <Accordion defaultExpanded={props.jpFieldOpen}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" color="black">
            <b>学問分野(日本語講義)</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ width: "100%", height: "540", overflow: "auto" }}>
            {japaneseFields.map((field, index) => (
              <ListItem
                key={index}
                button={false}
                disablePadding={true}
                divider={true}
                onClick={() => {
                  const academicFieldParames = createSearchParams({
                    field: field,
                  });
                  props.setJpFieldOpen(true);
                  props.onClick && props.onClick();
                  navigate(`/search/?${academicFieldParames}&subject`);
                }}
                sx={{
                  fullWidth: "true",
                  margin: "0",
                  "&:hover, &:focus": {
                    bgcolor: alpha(theme.palette.primary.main, 0.3),
                    cursor: "pointer",
                    textDecoration: "none",
                  },
                }}
              >
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText
                  primary={field}
                  primaryTypographyProps={{
                    color: "primary.dark",
                    fontWeight: "medium",
                    variant: "h6",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={props.enFieldOpen}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" color="black">
            <b>学問分野(英語講義)</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {englishFields.map((field, index) => (
            <ListItem
              divider={true}
              key={index}
              button={false}
              disablePadding={true}
              onClick={() => {
                const academicFieldParames = createSearchParams({
                  field: field,
                });
                props.setEnFieldOpen(true);
                props.onClick && props.onClick();
                navigate(`/search/?${academicFieldParames}&subject`);
              }}
              sx={{
                fullWidth: "true",
                margin: "0",
                "&:hover, &:focus": {
                  bgcolor: alpha(theme.palette.primary.main, 0.3),
                  textDecoration: "none",
                  cursor: "pointer",
                },
              }}
            >
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText
                primary={field}
                primaryTypographyProps={{
                  color: "primary.dark",
                  fontWeight: "medium",
                  variant: "h6",
                }}
              />
            </ListItem>
          ))}
        </AccordionDetails>
      </Accordion>
    </List>
  );
}
