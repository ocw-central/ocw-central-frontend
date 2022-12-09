import { useRef } from "react";
import YouTubePlayer from "react-player/youtube";
import ReactPlayer from "react-player/youtube";

type Props = {
  FocusedYoutubeId: string | undefined;
  startAt: number;
  autoPlayOn: number; // 0: off, 1: on
  setPlayedSeconds: (playedSeconds: number) => void;
};

export const PlayerWrapper = (props: Props) => {
  const ref = useRef<YouTubePlayer>(null);
  const handleOnProgress = (state: { playedSeconds: number }) => {
    props.setPlayedSeconds(state.playedSeconds);
  };
  if (props.FocusedYoutubeId === undefined) {
    return <></>;
  }
  return (
    <ReactPlayer
      url={
        `https://www.youtube.com/watch?v=${props.FocusedYoutubeId}?start=${props.startAt}` +
        `&randomNumberJustForTellingReactToReRender=${Math.random()}`
      }
      ref={ref}
      playsInline
      width="100%"
      height="100%"
      pip={true}
      controls={true}
      muted={true}
      style={{
        aspectRatio: "16 / 9",
        maxWidth: 960,
        maxHeight: 540,
      }}
      onProgress={handleOnProgress}
      playing={props.autoPlayOn === 1}
    />
  );
};
