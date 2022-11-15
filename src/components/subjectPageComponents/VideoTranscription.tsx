import { theme } from "@/utils/themes";
import { Box, Grid, List, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { alpha } from "@mui/material/styles";
import { useState } from "react";

type Props = {
  transcription: string;
  setTime: (time: { start: number }) => void;
  setAutoPlayOn: (autoPlayOn: number) => void;
  playedSeconds: number;
  playing: boolean;
};

function processText(text: string) {
  //remove empty lines
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
  console.log(props.playing);
  console.log(props.playedSeconds);
  const processedLines = processText(props.transcription);
  return (
    <Box
      className="VideoTranscription"
      sx={{
        bgcolor: alpha(theme.palette.primary.main, 0.15),
        borderRadius: 0.5,
        p: { xs: 2, sm: 3 },
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
      <List
        sx={{
          width: "100%",
          maxHeight: { xs: 250, sm: 540 },
        }}
        subheader={
          <Typography
            fontSize={{ xs: 15, sm: 25 }}
            component="div"
            align="left"
            sx={{
              borderLeft: 1,
              p: 1,
              color: theme.palette.primary.dark,
              fontWeight: "bold",
            }}
          >
            自動書き起こし
          </Typography>
        }
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
                color: "white",
                p: 0,
                "&:hover, &:focus": {
                  bgcolor: alpha(theme.palette.primary.main, 0.3),
                  cursor: "pointer",
                },
              }}
            >
              <Grid
                container
                direction="row"
                sx={{
                  backgroundColor:
                    Number(processedLines[index].startTime) <=
                      props.playedSeconds &&
                    (index == processedLines.length - 1 ||
                      Number(processedLines[index + 1].startTime) >
                        props.playedSeconds)
                      ? alpha(theme.palette.primary.main, 0.3)
                      : "transparent",
                }}
              >
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
    </Box>
  );
}
