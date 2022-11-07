import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { AcademicFieldsList } from "./searchPageComponents/AcademicFieldsList";
import { ReportButton } from "@/components/common/ReportButton";
import { SubjectPanel } from "./searchPageComponents/SubjectPanel";
import { VideoPanel } from "./searchPageComponents/VideoPanel";
import { DetailSearchBar } from "./searchPageComponents/DetailSearchBar";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  return <Box hidden={props.value !== props.index}>{props.children}</Box>;
}

export function SearchPage() {
  const [jpFieldOpen, setJpFieldOpen] = useState(false);
  const [enFieldOpen, setEnFieldOpen] = useState(false);

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
                  <b>詳細検索</b>
                </Typography>
              </Grid>
              <Grid item sx={{ ml: "auto", mr: 1 }}>
                <ReportButton url={url} name="ご意見・不具合報告" />
              </Grid>
            </Grid>
            <Grid item>
              <DetailSearchBar />
            </Grid>
          </Grid>
          <Box>
            <Tabs
              value={selectedTabIndex}
              onChange={handleTabChange}
              aria-label="basic tabs example"
              variant="fullWidth"
            >
              <Tab label="科目" />
              <Tab label="講義動画" />
            </Tabs>
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
