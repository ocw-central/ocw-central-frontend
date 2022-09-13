import { Video } from "../models/video";

const video1: Video = {
  id: "1",
  title: "計算機科学-第一回-",
  videoId: "mBHRueanQoY",
  faculty: "京大四郎 教授, 京大亮太 先生",
};
const video2: Video = {
  id: "2",
  title: "計算機科学-第二回-",
  videoId: "1d_m39AzbfQ",
  faculty: "京大太郎 教授",
};

export const mockVideos: Video[] = [video1, video2];
