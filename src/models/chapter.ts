export type Chapter = {
  id: string;
  startAt: number; // 経過秒数なのでintでよい
  topic: string;
  thumbnailLink: string;
};
