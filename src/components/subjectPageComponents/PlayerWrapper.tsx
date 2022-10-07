type Props = {
  FocusedYoutubeId: string;
  startAt: number;
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
      src={`https://www.youtube.com/embed/${props.FocusedYoutubeId}?start=${props.startAt}&autoplay=1&mute=0`}
      frameBorder="0"
    />
  );
};
