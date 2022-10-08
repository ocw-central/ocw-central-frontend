import { theme } from "@/utils/themes";
import { Box, List, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { alpha } from "@mui/material/styles";
type Props = {
  transcription: string;
  setTime: (time: number) => void;
  setAutoPlayOn: (autoPlayOn: number) => void;
};

export function VideoTranscription(props: Props) {
  function processText(text: string) {
    const lines = text.split(/\r?\n/);
    const processedLines = lines.map((line) => {
      const [startTime, endTime, text] = line.split(",");
      return { startTime, text };
    });
    return processedLines;
  }

  // convert seconds to mm:ss
  function convertSecondToTime(second: number) {
    let mm: string = String(Math.floor(second / 60));
    let ss: string = String(Math.floor(second % 60));
    if (mm.length === 1) {
      mm = `0${mm}`;
    }
    if (ss.length === 1) {
      ss = `0${ss}`;
    }
    return `${mm}:${ss}`;
  }

  const processedLines = processText(props.transcription);

  return (
    <Box
      className="VideoBox"
      sx={{
        bgcolor: alpha(theme.palette.primary.main, 0.15),
        borderRadius: 1,
        p: 5,
      }}
    >
      <List
        sx={{
          width: "100%",
          maxHeight: 540,
          overflow: "auto",
        }}
        subheader={
          <Typography
            variant="h5"
            component="div"
            align="left"
            sx={{
              borderLeft: 1,
              p: 1,
              color: theme.palette.primary.dark,
              fontWeight: "bold",
            }}
          >
            トランスクリプション
          </Typography>
        }
      >
        {processedLines.map((line, index) => {
          return (
            <ListItem
              key={index}
              button
              onClick={() => {
                props.setTime(Number(line.startTime));
                props.setAutoPlayOn(1);
              }}
              sx={{
                color: "white",
                p: 0,
              }}
            >
              <ListItemText
                primary={`${processedLines[index].text}`}
                primaryTypographyProps={{
                  color: "black",
                  fontWeight: "medium",
                }}
                secondary={`${convertSecondToTime(
                  Number(processedLines[index].startTime)
                )}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
