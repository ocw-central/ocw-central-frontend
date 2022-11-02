import { Box, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { AcademicFieldsList } from "./common/AcademicFieldsList";
import { ReportButton } from "@/components/common/ReportButton";
import { SubjectSearchPanel } from "./searchPageComponents/SubjectSearchPanel";
import { VideoSearchPanel } from "./searchPageComponents/VideoSearchPanel";

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
  const isVideoSearch = searchParams.get("video") !== null;
  const url = isVideoSearch
    ? `${location.pathname}?title=${title}&faculty=${faculty}&field=${field}&video`
    : `${location.pathname}?title=${title}&faculty=${faculty}&field=${field}&subject`;
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
          <Grid container direction="row">
            <Grid item sx={{ ml: "auto", mr: 1 }}>
              <ReportButton url={url} name="ご意見・不具合報告" />
            </Grid>
          </Grid>
          <Box>
            <Tabs
              value={selectedTabIndex}
              onChange={handleTabChange}
              aria-label="basic tabs example"
              variant="fullWidth"
            >
              <Tab label="科目検索" />
              <Tab label="講義動画検索" />
            </Tabs>
          </Box>
          <TabPanel value={selectedTabIndex} index={0}>
            <SubjectSearchPanel />
          </TabPanel>
          <TabPanel value={selectedTabIndex} index={1}>
            <VideoSearchPanel />
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
}
