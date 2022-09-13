import { Chapter } from "./chapter";

export type Video = {
  id: string;
  title: string;
  link?: string; // どちらかがほしい
  videoId?: string; // どちらかがほしい
  chapters?: Chapter[];
  faculty?: string;
  lecturedOn?: number;
  videoLength?: number; // 秒数
  language?: string;
};
