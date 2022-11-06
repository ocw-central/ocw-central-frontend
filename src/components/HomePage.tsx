import { Loading } from "@/components/common/Loading";
import { ReportButton } from "@/components/common/ReportButton";
import { SubjectCard } from "@/components/searchPageComponents/SubjectCard";
import { useRandomSubjectQuery } from "@/generated/graphql";
import { SubjectOnSearchPage } from "@/gqltypes/subjectsOnSearchPage";
import { theme } from "@/utils/themes";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Search,
} from "@mui/icons-material";
import { alpha, Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TwitterIcon, TwitterShareButton } from "react-share";

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
        <Grid item>
          <TwitterShareButton
            title={"OCW Central"}
            via="ocwcentral"
            url={window.location.href}
            related={["ocwcentral"]}
          >
            <TwitterIcon size={50} round />
          </TwitterShareButton>
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
        <FinalLecturesPane />
      </Grid>
      <Grid item xs={12}>
        <ComputerSciencePane />
      </Grid>
      <Grid item xs={12}>
        <PhysicsPane />
      </Grid>
    </Grid>
  );
};

const FinalLecturesPane = () => {
  const { data, loading, error } = useRandomSubjectQuery({
    variables: {
      category: "final-lecture",
      series: "",
      academicField: "",
      numSubjects: 12,
    },
  });

  return (
    <SubjectsRow
      subjects={data ? data.randomSubjects : []}
      rowTitle="最終講義"
      loading={loading}
      error={error !== undefined}
    />
  );
};

const ComputerSciencePane = () => {
  const { data, loading, error } = useRandomSubjectQuery({
    variables: {
      category: "",
      series: "",
      academicField: "コンピュータサイエンス",
      numSubjects: 12,
    },
  });

  return (
    <SubjectsRow
      subjects={data ? data.randomSubjects : []}
      rowTitle="コンピューターサイエンス"
      loading={loading}
      error={error !== undefined}
    />
  );
};

const PhysicsPane = () => {
  const { data, loading, error } = useRandomSubjectQuery({
    variables: {
      category: "",
      series: "",
      academicField: "物理学",
      numSubjects: 12,
    },
  });

  return (
    <SubjectsRow
      subjects={data ? data.randomSubjects : []}
      rowTitle="物理学"
      loading={loading}
      error={error !== undefined}
    />
  );
};

const SubjectsRow = ({
  subjects,
  rowTitle,
  loading,
  error,
}: {
  subjects: SubjectOnSearchPage[];
  rowTitle: string;
  loading: boolean;
  error: boolean;
}) => {
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
    return <Loading size={"4em"} color={"primary"} />;
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

const HomeMessagePane = () => {
  return (
    <Grid container direction="column" spacing={5}>
      <Grid item xs={12}>
        <CatchPhrase />
      </Grid>
      <Grid item xs={8}>
        <Typography
          color="black"
          sx={{ typography: { xs: "body2", sm: "h6" } }}
        >
          OCW CentralはOCW(大学によって提供される教育資料)のポータルサイトです。
          <br />
          AIモデルによる自動書き起こしでOCWの利便性を向上させます。
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Link to={"/search"}>
          <Button variant="contained" disableElevation size="large">
            <Search />
            <Box p={1} sx={{ fontSize: 20 }}>
              講義を検索
            </Box>
          </Button>
        </Link>
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
              typography: { xs: "h4", sm: "h3" },
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
            typography: { xs: "h4", sm: "h3" },
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
            typography: { xs: "h4", sm: "h3" },
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
