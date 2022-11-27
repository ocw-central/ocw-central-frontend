import { Maybe, Translation } from "@/generated/graphql";
import { theme } from "@/utils/themes";
import {
  FormControl,
  Grid,
  List,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  transcription: string;
  translations: Maybe<Translation>[];
  setTime: (time: { start: number }) => void;
  setAutoPlayOn: (autoPlayOn: number) => void;
};

function processText(text?: string) {
  //remove empty lines
  if (text === undefined) {
    return [];
  }
  const lines = text.split(/\r?\n/);
  const processedLines = lines.map((line) => {
    const [startTime] = line.split(",");
    // text is everything after the second comma
    const text = line.slice(line.indexOf(",", line.indexOf(",") + 1) + 1);
    return { startTime, text };
  });
  processedLines.pop(); //FIXME: last element is empty
  return processedLines;
}
// convert seconds to mm:ssz
function convertSecondToTime(second: number) {
  let mm = String(Math.floor(second / 60));
  let ss = String(Math.floor(second % 60));
  if (mm.length === 1) {
    mm = `0${mm}`;
  }
  if (ss.length === 1) {
    ss = `0${ss}`;
  }
  return `${mm}:${ss}`;
}

export function VideoTranscription(props: Props) {
  const { t } = useTranslation();
  const [language, setLanguage] = useState("original");
  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };
  const translations = new Map<string, string>();
  for (const t of props.translations) {
    if (t) {
      translations.set(t.languageCode, t.translation);
    }
  }
  const transcription =
    language == "original" ? props.transcription : translations.get(language);
  const processedLines = processText(transcription);

  const languages = ["original", ...translations.keys()];
  // if there is only one language, don't show the language selector
  const showLanguageSelector = languages.length > 1;
  const language_map: { [key: string]: string } = {
    original: `${t("translation.subject.original_translation")}`,
    en: `${t("translation.subject.english_translation")}`,
    ja: `${t("translation.subject.japanese_translation")}`,
  };

  return (
    <Grid
      container
      className="VideoTranscription"
      sx={{
        bgcolor: alpha(theme.palette.primary.main, 0.15),
        borderRadius: 0.5,
        pt: 1,
      }}
    >
      <Grid
        container
        direction="row"
        sx={{
          mt: 1,
          mb: 1,
        }}
      >
        {showLanguageSelector && (
          <Grid
            container
            xs={12}
            sx={{
              justifyContent: "end",
              pr: 2,
            }}
          >
            <FormControl size="small">
              <Select
                value={language}
                onChange={handleLanguageChange}
                sx={{
                  height: 30,
                }}
              >
                {languages.map((l) => (
                  <MenuItem key={l} value={l}>
                    {language_map[l]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography
            fontSize={{ xs: 20, sm: 20 }}
            align="left"
            sx={{
              borderLeft: 1,
              ml: 2,
              pl: 1,
              color: theme.palette.primary.dark,
              fontWeight: "bold",
            }}
          >
            {t("translation.subject.transcription")}
          </Typography>
        </Grid>
      </Grid>
      <List
        sx={{
          width: "100%",
          maxHeight: { xs: 250, sm: 540 },
          px: {
            xs: 2,
            md: 2,
          },
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: 10,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: alpha(theme.palette.primary.dark, 0.3),
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "darkgrey",
            outline: "3px solid slategrey",

            "&:hover": {
              backgroundColor: "grey",
              cursor: "pointer",
            },
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
            cursor: "grabbing",
          },
        }}
      >
        {processedLines.map((line, index) => {
          return (
            <ListItem
              key={index}
              button
              onClick={() => {
                props.setTime({ start: Number(line.startTime) });
                props.setAutoPlayOn(1);
              }}
              sx={{
                pt: 0.3,
                pb: 0.3,
                color: "white",
                "&:hover, &:focus": {
                  bgcolor: alpha(theme.palette.primary.main, 0.3),
                  cursor: "pointer",
                },
              }}
            >
              <Grid container direction="row">
                <Grid
                  item
                  xs={1}
                  sm={1}
                  sx={{
                    justifySelf: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: `${theme.palette.secondary.main}`,
                      fontWeight: "bold",
                      fontSize: { xs: 12, sm: 14, md: 15 },
                      pt: 0.5,
                    }}
                  >
                    {`${convertSecondToTime(Number(line.startTime))} `}
                  </Typography>
                </Grid>
                <Grid item xs={11} sm={11}>
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: "medium",
                      fontSize: { xs: 16, sm: 20 },
                      pl: { md: 3.5, sm: 3, xs: 3 },
                    }}
                  >{`${line.text}`}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
}
