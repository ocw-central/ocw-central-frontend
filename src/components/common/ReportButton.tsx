import { theme } from "@/utils/themes";
import {
  alpha,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";

const reportIssue = (type: string, content: string, url: string) => {
  let env = "LOCAL";
  if (import.meta.env.DEV) {
    env = "LOCAL";
  } else if (APP_ENV == "DEV") {
    env = "DEV";
  } else {
    env = "PROD";
  }
  fetch(
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLScY3353IuQAge_om4Xw5DBVDTBSc2PEdgoY7r1SwTj5LaJY_Q/formResponse",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `entry.1988270508=${encodeURIComponent(
        content
      )}&entry.232228889=${encodeURIComponent(
        type
      )}&entry.511263990=${encodeURIComponent(
        url
      )}&entry.1201590111=${encodeURIComponent(env)}`,
    }
  );
};
type Props = {
  url: string;
  name: string;
};
export function ReportButton(props: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [type, setType] = useState("Bug");
  const [content, setContent] = useState("");
  return (
    <Box>
      <Button
        sx={{
          bgcolor: theme.palette.primary.main,
          color: "white",
          my: 2,
          "&:hover, &:focus": {
            bgcolor: alpha(theme.palette.primary.main, 0.6),
            cursor: "pointer",
            textDecoration: "none",
          },
        }}
        onClick={handleOpen}
      >
        {props.name}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
          }}
        >
          <FormControl sx={{ m: 2 }}>
            <FormLabel>種類</FormLabel>
            <RadioGroup>
              <FormControlLabel
                value="Bug"
                control={<Radio />}
                label="不具合"
                onChange={(event) =>
                  setType((event.target as HTMLInputElement).value)
                }
              />
              <FormControlLabel
                value="Opinion"
                control={<Radio />}
                label="意見"
                onChange={(event) =>
                  setType((event.target as HTMLInputElement).value)
                }
              />
            </RadioGroup>
            <FormLabel>ご報告内容</FormLabel>
            <TextField
              required
              multiline
              rows={4}
              onChange={(event) =>
                setContent((event.target as HTMLInputElement).value)
              }
            />
            <Button
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                my: 2,
                "&:hover, &:focus": {
                  bgcolor: alpha(theme.palette.primary.main, 0.6),
                  cursor: "pointer",
                  textDecoration: "none",
                },
              }}
              onClick={() => {
                reportIssue(type, content, props.url);
                handleClose();
              }}
            >
              送信
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
}
