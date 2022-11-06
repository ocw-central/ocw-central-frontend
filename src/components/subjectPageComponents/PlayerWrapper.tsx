type Props = {
  FocusedYoutubeId: string | undefined;
  startAt: number;
  autoPlayOn: number; // 0: off, 1: on
};

export const PlayerWrapper = (props: Props) => {
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
      src={`https://www.youtube.com/embed/${props.FocusedYoutubeId}?start=${props.startAt}&autoplay=${props.autoPlayOn}&mute=0&randomNumberJustForTellingReactToReRender=${Math.random()}`}
      frameBorder="0"
      allow="fullscreen; picture-in-picture; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      key={props.FocusedYoutubeId}
    />
  );
};
