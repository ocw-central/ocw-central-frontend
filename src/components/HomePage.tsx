import { ReportButton } from "@/components/common/ReportButton";
import { SubjectsRow } from "@/components/common/SubjectsRow";
import { useRandomSubjectQuery } from "@/generated/graphql";
import { theme } from "@/utils/themes";
import { Search } from "@mui/icons-material";
import { alpha, Box, Button, Grid, Typography } from "@mui/material";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { TwitterIcon, TwitterShareButton } from "react-share";

export function HomePage() {
  const { t } = useTranslation();
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
        direction="row"
        spacing={{ xs: 3, sm: 7 }}
        flexDirection="column"
        alignItems="right"
      >
        <Grid item xs={12}>
          <HomeMessagePane />
        </Grid>
        <Grid item xs={12}>
          <FieldsPane />
        </Grid>
        <Grid item>
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
            <ReportButton url="/" name={`${t("translation.report.label")}`} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

const FieldsPane = () => {
  return (
    <Grid container spacing={{ xs: 3, sm: 7 }}>
      <Grid item xs={12}>
        <FinalLecturesPane />
      </Grid>
      <Grid item xs={12}>
        <EconomicsPane />
      </Grid>
      <Grid item xs={12}>
        <ComputerSciencePane />
      </Grid>
      <Grid item xs={12}>
        <PedagogyPane />
      </Grid>
      <Grid item xs={12}>
        <HumanitiesPane />
      </Grid>
      <Grid item xs={12}>
        <PhysicsPane />
      </Grid>
      <Grid item xs={12}>
        <MathematicsPane />
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
      rowTitle={t("translation.home.academic_fields.final_lecture")}
      loading={loading}
      error={error !== undefined}
    />
  );
};

const EconomicsPane = () => {
  const { data, loading, error } = useRandomSubjectQuery({
    variables: {
      category: "",
      series: "",
      academicField: "経済学・金融",
      numSubjects: 12,
    },
  });

  return (
    <SubjectsRow
      subjects={data ? data.randomSubjects : []}
      rowTitle={`${t("translation.home.academic_fields.economics")}`}
      loading={loading}
      error={error !== undefined}
    />
  );
};

const PedagogyPane = () => {
  const { data, loading, error } = useRandomSubjectQuery({
    variables: {
      category: "",
      series: "",
      academicField: "教育学",
      numSubjects: 12,
    },
  });

  return (
    <SubjectsRow
      subjects={data ? data.randomSubjects : []}
      rowTitle={`${t("translation.home.academic_fields.pedagogy")}`}
      loading={loading}
      error={error !== undefined}
    />
  );
};

const HumanitiesPane = () => {
  const { data, loading, error } = useRandomSubjectQuery({
    variables: {
      category: "",
      series: "",
      academicField: "人文科学",
      numSubjects: 12,
    },
  });

  return (
    <SubjectsRow
      subjects={data ? data.randomSubjects : []}
      rowTitle={`${t("translation.home.academic_fields.humanities")}`}
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
      rowTitle={`${t("translation.home.academic_fields.computer_science")}`}
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
      rowTitle={`${t("translation.home.academic_fields.physics")}`}
      loading={loading}
      error={error !== undefined}
    />
  );
};

const MathematicsPane = () => {
  const { data, loading, error } = useRandomSubjectQuery({
    variables: {
      category: "",
      series: "",
      academicField: "数学",
      numSubjects: 12,
    },
  });

  return (
    <SubjectsRow
      subjects={data ? data.randomSubjects : []}
      rowTitle={`${t("translation.home.academic_fields.mathematics")}`}
      loading={loading}
      error={error !== undefined}
    />
  );
};

const HomeMessagePane = () => {
  const { t } = useTranslation();
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
          {t("translation.home.message.sentence1")}
          <br />
          {t("translation.home.message.sentence2")}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Link to={"/search"}>
          <Button variant="contained" disableElevation size="large">
            <Search />
            <Box p={1} sx={{ fontSize: 20 }}>
              {t("translation.home.message.search_button")}
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
