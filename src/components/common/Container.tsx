import { Box } from "@material-ui/core";

type Props = {
  children: React.ReactNode;
};

export function Container(props: Props) {
  return (
    <Box
      sx={{
        margin: "3rem 1.5rem 1.5rem 0rem",
        padding: "1rem",
      }}
    >
      {props.children}
    </Box>
  );
}
