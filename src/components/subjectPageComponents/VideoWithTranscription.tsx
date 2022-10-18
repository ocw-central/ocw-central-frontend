import { PlayerWrapper } from "@/components/subjectPageComponents/PlayerWrapper";
import { VideoTranscription } from "@/components/subjectPageComponents/VideoTranscription";
import { Video } from "@/generated/graphql";
import { theme } from "@/utils/themes";
import { youtube_parser } from "@/utils/youtubeParser";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Subject } from "@/gqltypes/subject";

type Props = {
  //setVideoIdFunc: (videoId: string) => void;
  subject: Subject;
  videos: Video[];
  focusedVideoOrdering: number;
  setFocusedVideoOrdering: (ordering: number) => void;
};

const removeParenthesis = (s: string) => {
  let re_full = /(\(|（)[^\(\）\)]*(\)|）)/g;
  let re_half = /[\(（].*?[\)）]/g;
  return s.replace(re_full, " ").replace(re_half, " ");
};

export function VideoWithTranscription(props: Props) {
  const videos = props.videos ?? []; //already sorted by `ordering` field
  const [VideoStartTime, SetVideoStartTime] = useState(0);
  const [AutoPlayOn, SetAutoPlayOn] = useState(0);
  const [searchParams] = useSearchParams();
  const initialVideoId = searchParams.get("video_id");
  let FocusedVideoOrdering = props.focusedVideoOrdering;
  let FocusedVideo = videos[FocusedVideoOrdering];
  let FocusedYoutubeId = youtube_parser(FocusedVideo.link);

  useEffect(() => {
    //find Video with initialVideoId
    const initialVideo = videos.find((v) => v.id === initialVideoId);
    const initialVideoOrdering = initialVideo?.ordering ?? 0;
    props.setFocusedVideoOrdering(initialVideoOrdering);
    FocusedVideoOrdering = initialVideoOrdering;
    FocusedVideo = videos[FocusedVideoOrdering];
    FocusedYoutubeId = youtube_parser(FocusedVideo.link);
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
          pb: 5,
          minHeight: {
            md: 420,
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "bold", color: "black" }}
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
          }}
        >
          {FocusedVideo.title} |{" "}
          {removeParenthesis(FocusedVideo.faculty.trim())}
        </Typography>
        <PlayerWrapper
          FocusedYoutubeId={FocusedYoutubeId}
          startAt={VideoStartTime}
          autoPlayOn={AutoPlayOn}
        />
      </Grid>
      {FocusedVideo.transcription && (
        <Grid item md={4} sm={12} xs={12} sx={{ p: 3, pr: { md: 0 } }}>
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
