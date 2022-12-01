import { theme } from "@/utils/themes";
import { Box, Grid, List, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { alpha } from "@mui/material/styles";
import { memo, useEffect } from "react";

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

// TODO: binary searchへ変更
function searchNearestTranscriptionIdx(
  processedLines: { startTime: string; text: string }[],
  playedSeconds: number
) {
  let nearestIdx = 0;
  let nearestDiff = Infinity;
  processedLines.forEach((line, idx) => {
    const lineTime = Number(line.startTime);
    const diff = Math.abs(lineTime - playedSeconds);
    // 最も近い書き起こしは必ず実際の再生時間よりも前にあるようにする
    // -> intervalの計算における仮定を満たすため
    if (lineTime <= playedSeconds && diff < nearestDiff) {
      nearestIdx = idx;
      nearestDiff = diff;
    }
  });
  return nearestIdx;
}

type TranscriptionLineProps = {
  text: string;
  startTime: string;
  isCurrent: boolean;
  setTime: (time: { start: number }) => void;
  setAutoPlayOn: (autoPlayOn: number) => void;
};
const TranscriptionLineMemo = memo(function TranscriptionLine(
  props: TranscriptionLineProps
) {
  return (
    <ListItem
      button
      onClick={() => {
        // Playerの再生時間を変更
        props.setTime({ start: Number(props.startTime) });
        // Playerの自動再生を設定
        props.setAutoPlayOn(1);
      }}
      sx={{
        color: "white",
        p: 0,
        "&:hover": {
          bgcolor: alpha(theme.palette.primary.main, 0.3),
          cursor: "pointer",
        },
      }}
    >
      <Grid
        container
        direction="row"
        sx={{
          backgroundColor: props.isCurrent
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
            {`${convertSecondToTime(Number(props.startTime))} `}
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
          >
            {`${props.text}`}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
});

type VideoTranscriptionProps = {
  transcription: string;
  playedSeconds: number;
  playing: boolean;
  setStartTime: (time: { start: number }) => void;
  setAutoPlayOn: (autoPlayOn: number) => void;
  setPlayedSeconds: (playedSeconds: number) => void;
};

export function VideoTranscription(props: VideoTranscriptionProps) {
  const processedLines = processText(props.transcription);
  const nearestIdx = searchNearestTranscriptionIdx(
    processedLines,
    props.playedSeconds
  );
  // stateで管理することが難しいため、constで定義
  // ただし、この場合はintervalごとにsearchNearestTranscriptionIdxが呼ばれる
  const currentIdx = nearestIdx;
  // 途中で再生した場合にprops.playedSecondsとprocessedLines[currentIdx].startTimeが一致しない問題に対処
  const interval =
    Math.floor(props.playedSeconds) !=
    Number(processedLines[currentIdx].startTime)
      ? Number(processedLines[currentIdx + 1].startTime) - props.playedSeconds
      : Number(processedLines[currentIdx + 1].startTime) -
        Number(processedLines[currentIdx].startTime);
  useEffect(() => {
    if (props.playing) {
      const timer = setTimeout(() => {
        props.setPlayedSeconds(
          Number(processedLines[currentIdx + 1].startTime)
        );
      }, interval * 1000);
      return () => clearTimeout(timer);
    }
  }, [props.playing, props.playedSeconds]);

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
        {processedLines.map((line, idx) => {
          return (
            <TranscriptionLineMemo
              key={idx}
              text={line.text}
              startTime={line.startTime}
              isCurrent={idx === currentIdx}
              setTime={props.setStartTime}
              setAutoPlayOn={props.setAutoPlayOn}
            />
          );
        })}
      </List>
    </Box>
  );
}
