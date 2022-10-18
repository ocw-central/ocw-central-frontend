export type Subjects = {
  subjects:
    | {
        __typename?: "Subject" | undefined;
        id: string;
        title: string;
        thumbnailLink: string;
        faculty: string;
      }[]
    | undefined;
};
