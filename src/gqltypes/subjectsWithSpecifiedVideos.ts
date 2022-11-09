export type SubjectsWithSpecifiedVideos = {
  subjectsWithSpecifiedVideos:
    | {
        __typename?: "SubjectWithSpecifiedVideos" | undefined;
        subject: {
          __typename?: "Subject" | undefined;
          id: string;
          thumbnailLink: string;
        };
        videos: {
          __typename?: "Video" | undefined;
          id: string;
          title: string;
          ordering: number;
          faculty: string;
        }[];
      }[]
    | undefined;
};
