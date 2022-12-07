import { Spinner } from "@/components/common/Spinner";
import { SubjectCard } from "@/components/searchPageComponents/SubjectCard";
import { SubjectOnSearchPage } from "@/gqltypes/subjectsOnSearchPage";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";

type Direction = "right" | "left";

type ArrowProps = {
  scrollRef: React.MutableRefObject<HTMLDivElement>;
  direction: Direction;
};

const Arrow = ({ scrollRef, direction }: ArrowProps) => {
  const divStyle: React.CSSProperties = {
    backgroundColor: "black",
    opacity: 0.7,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "100%",
    animationDelay: "0.5s",
  };

  if (direction === "left") {
    divStyle.left = 0;
  } else {
    divStyle.right = 0;
  }

  return (
    <Box sx={{ display: { xs: "none", sm: "initial" } }}>
      <div style={divStyle}>
        <Button
          sx={{ height: "100%", color: "white" }}
          onClick={() => {
            scrollRef.current.scrollBy({
              left: direction == "left" ? -1000 : 1000,
              behavior: "smooth",
            });
          }}
        >
          {direction == "left" ? (
            <KeyboardDoubleArrowLeft />
          ) : (
            <KeyboardDoubleArrowRight />
          )}
        </Button>
      </div>
    </Box>
  );
};

const RowContent = ({
  subjects,
  loading,
  error,
}: {
  subjects: SubjectOnSearchPage[];
  loading: boolean;
  error: boolean;
}) => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null!);

  const measuredRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      scrollRef.current = node;
      node.addEventListener("scroll", () => {
        setScrollLeft(scrollRef.current.scrollLeft);
      });
    }
  }, []);

  if (loading) {
    return <Spinner size={"4em"} color={"primary"} />;
  }

  if (error) {
    return <div>講義の取得に失敗しました</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{ display: "flex", overflowX: "scroll", width: "100%" }}
        ref={measuredRef}
      >
        {subjects.map((subject) => (
          <Box
            sx={{
              flexBasis: { xs: "320px", sm: "400px" },
              flexShrink: 0,
            }}
            key={subject.id}
            px={0.5}
          >
            <SubjectCard
              id={subject.id}
              title={subject.title}
              faculty={subject.faculty}
              thumbnailLink={subject.thumbnailLink}
            />
          </Box>
        ))}
      </div>
      {scrollLeft > 0 && <Arrow scrollRef={scrollRef} direction={"left"} />}
      {(scrollRef.current == null ||
        scrollLeft <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth) && (
        <Arrow scrollRef={scrollRef} direction={"right"} />
      )}
    </Box>
  );
};

export function SubjectsRow({
  subjects,
  rowTitle,
  loading,
  error,
}: {
  subjects: SubjectOnSearchPage[];
  rowTitle: string;
  loading: boolean;
  error: boolean;
}) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} textAlign="left">
        <Box sx={{ px: 2 }}>
          <Typography color="black" sx={{ fontWeight: "bold", fontSize: 25 }}>
            {rowTitle}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <RowContent subjects={subjects} loading={loading} error={error} />
      </Grid>
    </Grid>
  );
}
