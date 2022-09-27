import { Loading } from "@/components/common/Loading";
import { useAcademicFieldsQuery } from "@/generated/graphql";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { createSearchParams, useNavigate } from "react-router-dom";
import { FixedSizeList, ListChildComponentProps } from "react-window";
type Props = {
  inNav: boolean;
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

  function renderRow(propsRender: ListChildComponentProps, fields: string[]) {
    const { index, style } = propsRender;

    return (
      <ListItem style={style} key={index} button={true}>
        <ListItemButton
          sx={{
            border: "1em",
            marginTop: "1em",
          }}
        >
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${fields[index]}`}
            primaryTypographyProps={{
              color: "primary.dark",
              fontWeight: "medium",
              variant: "h6",
              fontStyle: "bald",
            }}
            onClick={() => {
              const academicFieldParames = createSearchParams({
                field: fields[index],
              });
              props.onClick && props.onClick();
              navigate(`/search/?${academicFieldParames}`);
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  }

  function japaneseRenderRow(propsRender: ListChildComponentProps) {
    return renderRow(propsRender, japaneseFields);
  }

  function englishRenderRow(propsRender: ListChildComponentProps) {
    return renderRow(propsRender, englishFields);
  }

  return (
    <List
      subheader={
        <ListSubheader component="div" sx={{ textAlign: "left" }}>
          {!props.inNav && (
            <Typography variant="h5" color="black">
              <b>学問分野一覧</b>
            </Typography>
          )}
        </ListSubheader>
      }
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {!props.inNav && (
            <Typography variant="h6" color="black">
              <b>日本語講義</b>
            </Typography>
          )}
          {props.inNav && (
            <Typography>
              <b>日本語講義分野</b>
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          {!props.inNav && (
            <FixedSizeList
              height={350}
              width={"auto"}
              itemSize={75}
              itemCount={japaneseFields.length}
              overscanCount={100}
            >
              {japaneseRenderRow}
            </FixedSizeList>
          )}
          {props.inNav && (
            <FixedSizeList
              height={350}
              width={330}
              itemSize={70}
              itemCount={japaneseFields.length}
              overscanCount={100}
            >
              {japaneseRenderRow}
            </FixedSizeList>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {!props.inNav && (
            <Typography variant="h6" color="black">
              <b>英語講義</b>
            </Typography>
          )}
          {props.inNav && (
            <Typography>
              <b>英語講義分野</b>
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          {!props.inNav && (
            <FixedSizeList
              height={350}
              width={"auto"}
              itemSize={75}
              itemCount={englishFields.length}
              overscanCount={100}
            >
              {englishRenderRow}
            </FixedSizeList>
          )}
          {props.inNav && (
            <FixedSizeList
              height={350}
              width={330}
              itemSize={70}
              itemCount={englishFields.length}
              overscanCount={100}
            >
              {englishRenderRow}
            </FixedSizeList>
          )}
        </AccordionDetails>
      </Accordion>
    </List>
  );
}
