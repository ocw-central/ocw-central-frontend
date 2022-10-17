type Props = {
  FocusedYoutubeId: string;
  startAt: number;
  autoPlayOn: number; // 0: off, 1: on
};

export const PlayerWrapper = (props: Props) => {
  return (
    <iframe
      style={{
        aspectRatio: "16 / 9",
        width: "100%",
        maxWidth: 960,
        height: "95%",
        maxHeight: 540,
      }}
      src={`https://www.youtube.com/embed/${props.FocusedYoutubeId}?start=${props.startAt}&autoplay=${props.autoPlayOn}&mute=0`}
      frameBorder="0"
      allow="fullscreen; picture-in-picture; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      key={props.FocusedYoutubeId}
    />
  );
};
