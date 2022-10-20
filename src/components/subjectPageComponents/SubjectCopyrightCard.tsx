import { Video } from "@/generated/graphql";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

type Props = {
  title: string;
  subject_faculty: string;
  syllabus_faculty: string | undefined;
  subject_year: string;
  syllabus_year: number | undefined;
  videos: Video[];
};

export function SubjectCopyrightCard(props: Props) {
  const title = props.title;
  const subject_faculty = props.subject_faculty;
  const syllabus_faculty = props.syllabus_faculty;
  const videos = props.videos;

  const subject_faculty_str = subject_faculty;
  const syllabus_faculty_str = syllabus_faculty;
  // concatinate all faculty names in videos
  const video_names = videos ? videos.map((video) => video.faculty) : "";
  // remove duplication with the same order
  const videos_faculty_str = video_names
    ? video_names.filter((x, i, self) => self.indexOf(x) === i).join(", ")
    : "";

  const faculty_copyright = subject_faculty_str
    ? subject_faculty_str
    : syllabus_faculty_str
    ? syllabus_faculty_str
    : videos_faculty_str
    ? videos_faculty_str
    : "京都大学";

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 600,
        backgroundColor: "#E6F2FF",
        mb: 2,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: "1.2em" }} color="black" gutterBottom>
          <b>著作権表記</b>
        </Typography>
        <Typography
          sx={{ mb: 1.5, fontSize: "1em", textAlign: "left" }}
          color="black"
        >
          この資料は京都大学OCWウェブサイトに掲載されている
          {title}の資料であり、その著作権は{faculty_copyright}
          に帰属します。
          <Link
            href="https://ocw.kyoto-u.ac.jp/guideline/"
            target="_blank"
            rel="noopener noreferrer"
          >
            より詳しく
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
