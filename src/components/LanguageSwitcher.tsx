import React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const [language, setLanguage] = React.useState("");

  return (
    <Box sx={{ minWidth: 120 }}>
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
    </Box>
  );
}

export default LanguageSwitcher;
