import TranslateIcon from "@mui/icons-material/Translate";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 200 }}
    >
      <TranslateIcon />
      <FormControl fullWidth>
        <InputLabel id="locale-select-label">Language</InputLabel>
        <Select
          labelId="locale-select-label"
          id="locale-select"
          value={i18n.language}
          label="Language"
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          <MenuItem value="jp">日本語</MenuItem>
          <MenuItem value="en">English</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
}
