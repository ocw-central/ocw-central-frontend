import AttachmentIcon from "@mui/icons-material/Attachment";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/system";
import { Subject } from "@/gqltypes/subject";

export function SubjectResources({ subject }: { subject: Subject }) {
  return (
    <Box>
      {subject.resources.map((resource) => (
        <Paper key={resource.id} sx={{ my: 2 }}>
          <a href={resource.link} target="_blank" rel="noreferrer">
            <ListItem key={resource.id}>
              <ListItemButton>
                <ListItemIcon>
                  {resource.link.toLowerCase().endsWith(".pdf") ? (
                    <PictureAsPdfIcon sx={{ color: "red" }} />
                  ) : resource.link.toLowerCase().endsWith(".mp4") ? (
                    <VideoFileIcon sx={{ color: "red" }} />
                  ) : (
                    <AttachmentIcon sx={{ color: "secondary.main" }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={resource.title}
                  secondary={resource.description}
                />
              </ListItemButton>
            </ListItem>
          </a>
          <Divider />
        </Paper>
      ))}
    </Box>
  );
}
