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

  const dummy_text = `0,15,この授業は振動波動論の授業です
15,17,それでは始めます
17,21,最初に自己紹介をしておきます
21,34,私の名前は前川悟と申します
34,38,所属は人間環境学研究科で
38,42,専門分野は低温磁性物理学ということで
42,45,絶対冷凍近くに物質の温度を冷やして
45,52,物質の磁気的な性質の研究を実験的に行っています
52,58,それで私の研究室は
58,62,この西の5階建ての建物の
62,64,人間環境学研究科棟
64,66,人間棟と言いますけれども
66,73,人間棟のJ209号室におりますので
73,76,質問とか話とかありましたら
76,79,来ていただいたら結構です`;

  const processedLines = processText(dummy_text);

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
