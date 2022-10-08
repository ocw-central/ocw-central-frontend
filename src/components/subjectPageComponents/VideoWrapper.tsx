type Props = {
  FocusedYoutubeId: string;
  startAt: number;
};

export const VideoWrapper = (props: Props) => {
  return (
    <iframe
      style={{
        aspectRatio: "16 / 9",
        width: "100%",
        maxWidth: 960,
        maxHeight: 540,
      }}
      src={`https://www.youtube.com/embed/${props.FocusedYoutubeId}?start=${props.startAt}`}
      frameBorder="0"
    />
  );
};
