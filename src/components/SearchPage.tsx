import { AcademicFieldsList } from "@/components/common/AcademicFieldsList";
import { ReportButton } from "@/components/common/ReportButton";
import ClassIcon from "@mui/icons-material/Class";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router-dom";
import { DetailSearchBar } from "./searchPageComponents/DetailSearchBar";
import { SubjectPanel } from "./searchPageComponents/SubjectPanel";
import { VideoPanel } from "./searchPageComponents/VideoPanel";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  return <Box hidden={props.value !== props.index}>{props.children}</Box>;
}

export function SearchPage() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [jpFieldOpen, setJpFieldOpen] = useState(true);
  const [enFieldOpen, setEnFieldOpen] = useState(true);

  // for report button
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const titleParam = searchParams.get("title");
  const title: string = titleParam !== null ? titleParam : "";
  const facultyParam = searchParams.get("faculty");
  const faculty: string = facultyParam !== null ? facultyParam : "";
  const academicFieldParam = searchParams.get("field");
  const field: string = academicFieldParam !== null ? academicFieldParam : "";
  const url = `${location.pathname}?title=${title}&faculty=${faculty}&field=${field}`;
  // disable video tab when only academic field is filled
  const disableVideoTab =
    title.length == 0 && faculty.length == 0 && field.length != 0;

  // for tab
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTabIndex(newValue);
  };

  return (
    <Grid container>
      <Grid
        xs={0}
        md={3}
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          height: 920,
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <AcademicFieldsList
          currentLanguage={currentLanguage}
          jpFieldOpen={jpFieldOpen}
          setJpFieldOpen={setJpFieldOpen}
          enFieldOpen={enFieldOpen}
          setEnFieldOpen={setEnFieldOpen}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 900,
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            mx: {
              xs: 0,
              md: 4,
            },
            mb: 2,
            mt: 2,
          }}
        >
          <Grid container direction="column">
            <Grid container direction="row">
              <Grid
                item
                sx={{
                  alignSelf: "center",
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  align="left"
                  sx={{ color: "black", ml: { sm: 2, xs: 2 } }}
                >
                  <b>{t("translation.search.advanced_search")}</b>
                </Typography>
              </Grid>
              <Grid item sx={{ ml: "auto", mr: 1 }}>
                <ReportButton
                  url={url}
                  name={`${t("translation.report.label")}`}
                />
              </Grid>
            </Grid>
            <Grid item>
              <DetailSearchBar />
            </Grid>
          </Grid>
          <Box sx={{ pb: "1em" }}>
            {!disableVideoTab && (
              <Tabs
                value={selectedTabIndex}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="search tabs"
                variant="fullWidth"
              >
                <Tab
                  icon={<ClassIcon />}
                  iconPosition="start"
                  label={`${t("translation.search.subject_tab")}`}
                  sx={{ fontSize: 20, fontWeight: "bold" }}
                />
                <Tab
                  icon={<OndemandVideoIcon />}
                  iconPosition="start"
                  label={`${t("translation.search.video_tab")}`}
                  sx={{ fontSize: 20, fontWeight: "bold" }}
                />
              </Tabs>
            )}
            {disableVideoTab && (
              <Tabs
                value={selectedTabIndex}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="search tabs"
                variant="fullWidth"
              >
                <Tab
                  icon={<ClassIcon />}
                  iconPosition="start"
                  label={`${t("translation.search.subject_tab")}`}
                  sx={{ fontSize: 20, fontWeight: "bold" }}
                />
                <Tab
                  icon={<OndemandVideoIcon />}
                  iconPosition="start"
                  disabled
                  label={`${t("translation.search.video_tab")}`}
                  sx={{ fontSize: 20, fontWeight: "bold" }}
                />
              </Tabs>
            )}
          </Box>
          <TabPanel value={selectedTabIndex} index={0}>
            <SubjectPanel />
          </TabPanel>
          <TabPanel value={selectedTabIndex} index={1}>
            <VideoPanel />
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
}
