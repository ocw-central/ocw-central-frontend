// VideoCard MUI component
//
// This component is used to display a video card in the VideosBox component.

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Video } from "../../models/video";

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="140"
          //image={video.thumbnail}
          alt={video.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {video.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.faculties && video.faculties.join(", ")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
