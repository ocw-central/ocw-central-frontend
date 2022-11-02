import { useState, useRef, useCallback } from "react";
import { Loading } from "@/components/common/Loading";
import { SubjectCard } from "@/components/searchPageComponents/SubjectCard";
import { useRandomSubjectQuery } from "@/generated/graphql";
import { theme } from "@/utils/themes";
import { alpha, Box, Button, Grid, Typography } from "@mui/material";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { ReportButton } from "@/components/common/ReportButton";

export function HomePage() {
  return (
    <Box
      className="HomePage"
      alignItems="center"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HomeMessagePane />
      <RandomSubjectsPane />
      <Box>
        <TwitterShareButton
          title={"OCW Central"}
          via="ocwcentral"
          url={window.location.href}
          related={["ocwcentral"]}
        >
          <TwitterIcon size={50} round />
        </TwitterShareButton>
      </Box>
      <Grid
        container
        sx={{
          justifyContent: "right",
          pr: 2,
        }}
      >
        <ReportButton url="/" name="ご意見・不具合報告" />
      </Grid>
    </Box>
  );
}

const RandomSubjectsPane = () => {
  const { data, loading, error } = useRandomSubjectQuery({
    variables: {},
  });

  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null!);

  const measuredRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      scrollRef.current = node;
      node.addEventListener("scroll", () => {
        setScrollLeft(scrollRef.current.scrollLeft);
        console.log(scrollRef.current.scrollLeft);
      });
    }
  }, []);

  if (loading) {
    return <Loading size={"7em"} color={"primary"} />;
  }
  if (error) {
    return <div>Failed to fetch random lectures.</div>;
  }
  if (!data) {
    return <div>該当講義がありません</div>;
  }

  return (
    <Grid
      container
      sx={{ height: "100%", alignSelf: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          m: {
            xs: 0,
            md: 4,
          },
          mb: 2,
          pt: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            position: "relative",
          }}
        >
          {scrollLeft > 0 && <Arrow scrollRef={scrollRef} direction={"left"} />}
          <div
            style={{ display: "flex", overflowX: "scroll" }}
            ref={measuredRef}
          >
            {data.randomSubjects.map((subject) => (
              <Box
                sx={{
                  flexBasis: { xs: "350px", sm: "400px" },
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
          {(scrollRef.current == null ||
            scrollLeft <
              scrollRef.current.scrollWidth -
                scrollRef.current.clientWidth) && (
            <Arrow scrollRef={scrollRef} direction={"right"} />
          )}
        </Box>
      </Box>
    </Grid>
  );
};

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
    zIndex: 1,
    animationDelay: "0.5s",
  };

  if (direction === "left") {
    divStyle.left = 0;
  } else {
    divStyle.right = 0;
  }

  return (
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
  );
};

const HomeMessagePane = () => {
  return (
    <Grid
      container
      direction="row"
      sx={{
        pt: 2,
        pb: {
          xs: 2,
          sm: 2,
          md: 0,
        },
      }}
    >
      <Grid item md={12} sm={12} xs={12}>
        <Box
          sx={{
            maxWidth: 800,
            mx: "auto",
          }}
        >
          <Typography
            sx={{
              typography: { xs: "h3", sm: "h2" },
              textAlign: "center",
              color: alpha(theme.palette.primary.main, 0),
              background: {
                md: "linear-gradient(45deg, #5286AB 20%, #ff8e50 80%)",
                sm: "linear-gradient(45deg, #5286AB 20%, #ff8e50 80%)",
                xs: "linear-gradient(45deg, #5286AB 20%, #ff8e50 90%)",
              },
              "-webkit-background-clip": {
                md: "text",
                sm: "text",
                xs: "text",
              },
            }}
          >
            <b>Learn Deeply</b>
          </Typography>
        </Box>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Typography
          sx={{
            typography: { xs: "h3", sm: "h2" },
            textAlign: "center",
            color: "#213547",
          }}
        >
          <b>with</b>
        </Typography>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Typography
          sx={{
            typography: { xs: "h3", sm: "h2" },
            textAlign: "center",
            color: "#213547",
          }}
        >
          <b>Quality Lectures</b>
        </Typography>
      </Grid>
    </Grid>
  );
};
