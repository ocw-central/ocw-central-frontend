import { useState, useRef, useCallback } from "react";
import { Loading } from "@/components/common/Loading";
import { SubjectCard } from "@/components/searchPageComponents/SubjectCard";
import {
  useRandomSubjectQuery,
  useSubjectOnSearchPageQuery,
} from "@/generated/graphql";
import { theme } from "@/utils/themes";
import { alpha, Box, Button, Grid, Typography } from "@mui/material";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { ReportButton } from "@/components/common/ReportButton";
import { SubjectOnSearchPage } from "@/gqltypes/subjectsOnSearchPage";

export function HomePage() {
  return (
    <Box
      className="HomePage"
      sx={{
        pt: { xs: 5, sm: 10 },
        px: { xs: 2, sm: 5 },
        pb: 1,
      }}
    >
      <Grid
        container
        spacing={{ xs: 3, sm: 7 }}
        flexDirection="column"
        alignItems="center"
      >
        <Grid item xs={12}>
          <HomeMessagePane />
        </Grid>
        <Grid item xs={12}>
          <SubjectsPane />
        </Grid>

        <Grid
          item
          container
          sx={{
            justifyContent: "right",
            pr: 2,
          }}
        >
          <ReportButton url="/" name="ご意見・不具合報告" />
        </Grid>
      </Grid>
    </Box>
  );
}

const SubjectsPane = () => {
  return (
    <Grid container spacing={{ xs: 3, sm: 7 }}>
      <Grid item xs={12}>
        <RandomSubjectsPane />
      </Grid>
      <Grid item xs={12}>
        <YanakaShinyaPane />
      </Grid>
      <Grid item xs={12}>
        <ComputerScienceSubjectsPane />
      </Grid>
    </Grid>
  );
};

const RandomSubjectsPane = () => {
  const { data, loading, error } = useRandomSubjectQuery({
    variables: {},
  });

  if (error) {
    return <div>講義の取得に失敗しました</div>;
  }
  if (!data) {
    return <div>該当講義がありません</div>;
  }
  return (
    <SubjectsRow
      subjects={data.randomSubjects}
      rowTitle="Random Subjects"
      loading={loading}
    />
  );
};

const YanakaShinyaPane = () => {
  const { data, loading, error } = useSubjectOnSearchPageQuery({
    variables: {
      title: "",
      faculty: "山中",
      field: "",
    },
  });

  if (error) {
    return <div>講義の取得に失敗しました</div>;
  }
  if (!data) {
    return <div>該当講義がありません</div>;
  }
  return (
    <SubjectsRow
      subjects={data.subjects}
      rowTitle="Yamanaka Shinya"
      loading={loading}
    />
  );
};

const ComputerScienceSubjectsPane = () => {
  const { data, loading, error } = useSubjectOnSearchPageQuery({
    variables: {
      title: "",
      faculty: "",
      field: "コンピュータサイエンス",
    },
  });

  if (error) {
    return <div>講義の取得に失敗しました</div>;
  }
  if (!data) {
    return <div>該当講義がありません</div>;
  }

  return (
    <SubjectsRow
      subjects={data.subjects}
      rowTitle="Computer Science"
      loading={loading}
    />
  );
};

const SubjectsRow = ({
  subjects,
  rowTitle,
  loading,
}: {
  subjects: SubjectOnSearchPage[];
  rowTitle: string;
  loading: boolean;
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
        {loading ? (
          <Loading size={"4em"} color={"primary"} />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              position: "relative",
            }}
          >
            {scrollLeft > 0 && (
              <Arrow scrollRef={scrollRef} direction={"left"} />
            )}
            <div
              style={{ display: "flex", overflowX: "scroll" }}
              ref={measuredRef}
            >
              {subjects.map((subject) => (
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
        )}
      </Grid>
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
    <Grid container direction="column" spacing={3}>
      <Grid item xs={12}>
        <CatchPhrase />
      </Grid>
      <Grid item xs={12}>
        <TwitterShareButton
          title={"OCW Central"}
          via="ocwcentral"
          url={window.location.href}
          related={["ocwcentral"]}
        >
          <TwitterIcon size={50} round />
        </TwitterShareButton>
      </Grid>
    </Grid>
  );
};

const CatchPhrase = () => {
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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
