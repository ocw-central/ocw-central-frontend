import { Spinner } from "@/components/common/Spinner";
import { useAcademicFieldsQuery } from "@/generated/graphql";
import { theme } from "@/utils/themes";
import SchoolIcon from "@mui/icons-material/School";
import {
  alpha,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate } from "react-router-dom";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  return <Box hidden={props.value !== props.index}>{props.children}</Box>;
}

function separateEnglishAndJapaneseWords(word: string[]) {
  const englishWords: string[] = [];
  const japaneseWords: string[] = [];

  word.forEach((word) => {
    if (word[0].match(/^[a-zA-Z0-9]+$/)) {
      // chack if the first character is English
      englishWords.push(word);
    } else {
      japaneseWords.push(word);
    }
  });
  return [englishWords, japaneseWords];
}
/* This is only for mobile */
export function FieldsPage() {
  const { t } = useTranslation();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTabIndex(newValue);
  };

  const { data, loading, error } = useAcademicFieldsQuery({});
  const navigate = useNavigate();

  if (loading) {
    return <Spinner size={"5em"} color={"primary"} />;
  }

  if (error) {
    return (
      <div>Failed to fetch useAcademicFieldsQuery in AcademicFields.tsx</div>
    );
  }

  if (!data) {
    return <div>no data</div>;
  }

  const [englishFields, japaneseFields] = separateEnglishAndJapaneseWords(
    data.academicFields.map((academicField) => academicField.name)
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        component="div"
        align="left"
        sx={{ color: "black", pl: 2, pt: 2 }}
      >
        <b>{t("translation.academic_field_page.academic_field")}</b>
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTabIndex}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label={t("translation.academic_field_page.japanese_lecture")} />
          <Tab label={t("translation.academic_field_page.english_lecture")} />
        </Tabs>
      </Box>
      <TabPanel value={selectedTabIndex} index={0}>
        <List sx={{ width: "100%", overflow: "auto" }}>
          {japaneseFields.map((field, index) => (
            <ListItem
              key={index}
              button={false}
              disablePadding={false}
              divider={true}
              onClick={() => {
                const academicFieldParames = createSearchParams({
                  field: field,
                });
                navigate(`/search/?${academicFieldParames}`);
              }}
              sx={{
                fullWidth: "true",
                margin: "0",
                "&:hover, &:focus": {
                  bgcolor: alpha(theme.palette.primary.main, 0.3),
                  cursor: "pointer",
                  textDecoration: "none",
                },
              }}
            >
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText
                primary={field}
                primaryTypographyProps={{
                  color: "primary.dark",
                  fontWeight: "medium",
                  variant: "h6",
                }}
              />
            </ListItem>
          ))}
        </List>
      </TabPanel>
      <TabPanel value={selectedTabIndex} index={1}>
        {englishFields.map((field, index) => (
          <ListItem
            divider={true}
            key={index}
            button={false}
            disablePadding={false}
            onClick={() => {
              const academicFieldParames = createSearchParams({
                field: field,
              });
              navigate(`/search/?${academicFieldParames}`);
            }}
            sx={{
              fullWidth: "true",
              margin: "0",
              "&:hover, &:focus": {
                bgcolor: alpha(theme.palette.primary.main, 0.3),
                textDecoration: "none",
                cursor: "pointer",
              },
            }}
          >
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText
              primary={field}
              primaryTypographyProps={{
                color: "primary.dark",
                fontWeight: "medium",
                variant: "h6",
              }}
            />
          </ListItem>
        ))}
      </TabPanel>
    </Box>
  );
}
