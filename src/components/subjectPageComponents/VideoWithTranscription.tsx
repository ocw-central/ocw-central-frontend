import { PlayerWrapper } from "@/components/subjectPageComponents/PlayerWrapper";
import { VideoTranscription } from "@/components/subjectPageComponents/VideoTranscription";
import { Video } from "@/generated/graphql";
import { Subject } from "@/gqltypes/subject";
import { theme } from "@/utils/themes";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import urlParser from "js-video-url-parser";

type Props = {
  //setVideoIdFunc: (videoId: string) => void;
  subject: Subject;
  videos: Video[];
  focusedVideoOrdering: number;
  setFocusedVideoOrdering: (ordering: number) => void;
};

const removeParenthesis = (s: string) => {
  const re_full = /(\(|（)[^(）)]*(\)|）)/g;
  const re_half = /[(（].*?[)）]/g;
  return s.replace(re_full, " ").replace(re_half, " ");
};

export function VideoWithTranscription(props: Props) {
  const videos = props.videos ?? []; //already sorted by `ordering` field
  const [VideoStartTime, SetVideoStartTime] = useState({start: 0});
  const [AutoPlayOn, SetAutoPlayOn] = useState(0);
  const [searchParams] = useSearchParams();

  const FocusedVideoOrdering = props.focusedVideoOrdering;
  const FocusedVideo = videos[FocusedVideoOrdering];
  const FocusedYoutubeId = urlParser.parse(FocusedVideo.link)?.id;

  useEffect(() => {
    //find Video with initialVideoId
    const initialVideoId = searchParams.get("video_id");
    const initialVideo = videos.find((v) => v.id === initialVideoId);
    const initialVideoOrdering = initialVideo?.ordering ?? 0;
    props.setFocusedVideoOrdering(initialVideoOrdering);
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction={{ xs: "row", sm: "row", md: "row" }}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        direction={{ xs: "column", sm: "column", md: "row" }}
        md={7}
        sm={12}
        xs={12}
        sx={{
          justifyContent: "center",
          ml: { xs: 0, sm: 0, md: 0 },
          pb: { xs: 3, sm: 5 },
          minHeight: {
            md: 420,
          },
        }}
      >
        {
          // @NOTE: 講義名と動画名の表示に一貫性がないため、このままの制御だと不十分
          props.subject.title.includes(FocusedVideo.title) && (
            <Typography
              sx={{
                mb: 2,
                fontWeight: "bold",
                color: "black",
                fontSize: { xs: 20, sm: 30 },
              }}
            >
              {props.subject.title} |{" "}
              {removeParenthesis(props.subject.faculty.trim())}
            </Typography>
          )
        }
        {!props.subject.title.includes(FocusedVideo.title) && (
          <Box>
            <Typography
              sx={{
                mb: 2,
                fontWeight: "bold",
                color: "black",
                fontSize: { xs: 20, sm: 30 },
              }}
            >
              {props.subject.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                width: "100%",
                fontWeight: "medium",
                color: theme.palette.primary.dark,
                fontSize: { xs: 18, sm: 28 },
              }}
            >
              {FocusedVideo.title} |{" "}
              {removeParenthesis(FocusedVideo.faculty.trim())}
            </Typography>
          </Box>
        )}
        <PlayerWrapper
          FocusedYoutubeId={FocusedYoutubeId}
          startAt={VideoStartTime.start}
          autoPlayOn={AutoPlayOn}
        />
      </Grid>
      {FocusedVideo.transcription && (
        <Grid
          item
          md={4}
          sm={12}
          xs={12}
          sx={{ p: 3.5, pr: { md: 0 }, pt: { xs: 1, sm: 3 } }}
        >
          <VideoTranscription
            transcription={FocusedVideo.transcription}
            setTime={SetVideoStartTime}
            setAutoPlayOn={SetAutoPlayOn}
          />
        </Grid>
      )}
    </Grid>
  );
}
