import { theme } from "@/utils/themes";
import SendIcon from "@mui/icons-material/Send";
import {
  alpha,
  Box,
  Button,
  FormControl,
  FormControlLabel,
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
          bgcolor: alpha(theme.palette.secondary.main, 0.8),
          color: "white",
          my: 2,
          "&:hover, &:focus": {
            bgcolor: alpha(theme.palette.secondary.main, 0.6),
            cursor: "pointer",
            textDecoration: "none",
          },
        }}
        onClick={handleOpen}
        endIcon={<SendIcon />}
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
            <RadioGroup>
              <FormControlLabel
                sx={{ color: "black" }}
                value="Bug"
                control={<Radio />}
                label="不具合報告"
                onChange={(event) =>
                  setType((event.target as HTMLInputElement).value)
                }
              />
              <FormControlLabel
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
                value="Opinion"
                control={<Radio />}
                label="御意見・御要望"
                onChange={(event) =>
                  setType((event.target as HTMLInputElement).value)
                }
              />
            </RadioGroup>
            <TextField
              required
              multiline
              helperText={"内容"}
              rows={4}
              onChange={(event) =>
                setContent((event.target as HTMLInputElement).value)
              }
            />
            <Button
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                fontSize: "1.8rem",
                fontWeight: "bold",
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
