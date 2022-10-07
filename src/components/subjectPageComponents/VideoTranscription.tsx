import { Box, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { FixedSizeList, ListChildComponentProps } from "react-window";

type Props = {
  transcription: string;
  setTime: (time: number) => void;
};

export function VideoTranscription(props: Props) {
  const navigate = useNavigate();

  function processText(text: string) {
    const lines = text.split(/\r?\n/);
    const processedLines = lines.map((line) => {
      const [startTime, endTime, text] = line.split(",");
      return { startTime, text };
    });
    return processedLines;
  }

  const dummy_text = `0,15,この授業は振動波動論の授業です
              15,17,それでは始めます
              17,21,最初に自己紹介をしておきます
              21,34,私の名前は前川悟と申します`;

  const processedLines = processText(dummy_text);

  function renderRow(propsRender: ListChildComponentProps) {
    const { index, style } = propsRender;

    return (
      <ListItem style={style} key={index}>
        <ListItemButton
          sx={{
            border: "1em",
            marginTop: "1em",
            height: "1.5em",
          }}
        >
          <ListItemText
            primary={`${processedLines[index].startTime}: ${processedLines[index].text}`}
            primaryTypographyProps={{
              color: "primary.dark",
              fontWeight: "medium",
              variant: "body1",
            }}
            onClick={() => {
              props.setTime(Number(processedLines[index].startTime));
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  }

  console.log();

  return (
    <Box
      className="VideoBox"
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRadius: 1,
        p: 5,
      }}
    >
      <Typography
        variant="h5"
        component="div"
        align="left"
        sx={{
          borderLeft: 1,
          p: 1,
        }}
      >
        トランスクリプション
      </Typography>

      <FixedSizeList
        height={400}
        width={560}
        itemSize={30}
        itemCount={processedLines.length}
        overscanCount={100}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
