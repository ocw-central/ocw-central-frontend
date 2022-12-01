import { useRef } from "react";
import YouTubePlayer from "react-player/youtube";
import ReactPlayer from "react-player/youtube";

type Props = {
  FocusedYoutubeId: string | undefined;
  startAt: number;
  autoPlayOn: number; // 0: off, 1: on
  setPlayedSeconds: (playedSeconds: number) => void;
  setPlaying: (playing: boolean) => void;
};

export const PlayerWrapper = (props: Props) => {
  const ref = useRef<YouTubePlayer>(null);
  const handleOnPlay = () => {
    if (ref.current) {
      props.setPlayedSeconds(ref.current.getCurrentTime());
      props.setPlaying(true);
    }
  };
  const handleOnPause = () => {
    props.setPlaying(false);
  };
  const handleOnBuffer = () => {
    props.setPlaying(false);
  };
  const handleOnEnded = () => {
    props.setPlaying(false);
  };
  const handleOnError = () => {
    props.setPlaying(false);
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
      onPlay={handleOnPlay}
      onPause={handleOnPause}
      onBuffer={handleOnBuffer}
      onEnded={handleOnEnded}
      onError={handleOnError}
      playing={props.autoPlayOn === 1}
    />
  );
};
