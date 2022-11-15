import { createRef, useRef } from "react";
import ReactPlayer from "react-player/youtube";

type Props = {
  FocusedYoutubeId: string | undefined;
  startAt: number;
  autoPlayOn: number; // 0: off, 1: on
  setPlayedSeconds: (playedSeconds: number) => void;
  setPlaying: (playing: boolean) => void;
};

export const PlayerWrapper = (props: Props) => {
  const ref = useRef(null);
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
  console.log(
    `https://www.youtube.com/watch?v=${props.FocusedYoutubeId}?start=${props.startAt}&autoplay=${props.autoPlayOn}&mute=0` +
      `&randomNumberJustForTellingReactToReRender=${Math.random()}`
  );
  return (
    <ReactPlayer
      ref={ref}
      url={
        `https://www.youtube.com/watch?v=${props.FocusedYoutubeId}?start=${props.startAt}&autoplay=${props.autoPlayOn}&mute=0` +
        `&randomNumberJustForTellingReactToReRender=${Math.random()}`
      }
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
    />
  );
};

export const PlayerWrapper2 = (props: Props) => {
  if (props.FocusedYoutubeId === undefined) {
    return <></>;
  }
  return (
    <iframe
      style={{
        aspectRatio: "16 / 9",
        width: "100%",
        maxWidth: 960,
        height: "95%",
        maxHeight: 540,
      }}
      src={
        `https://www.youtube.com/embed/${props.FocusedYoutubeId}?start=${props.startAt}&autoplay=${props.autoPlayOn}&mute=0` +
        `&randomNumberJustForTellingReactToReRender=${Math.random()}`
      }
      allow="fullscreen; picture-in-picture; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; muted"
      key={props.FocusedYoutubeId}
    />
  );
};
