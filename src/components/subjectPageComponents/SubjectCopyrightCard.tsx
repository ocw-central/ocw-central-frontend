import { Video } from "@/generated/graphql";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type Props = {
  title: string;
  subject_faculty: string;
  syllabus_faculty: string | undefined;
  subject_year: any;
  syllabus_year: number | undefined;
  videos: Video[];
};

export function SubjectCopyrightCard(props: Props) {
  const {
    title,
    subject_faculty,
    syllabus_faculty,
    subject_year,
    syllabus_year,
    videos,
  } = props;

  const subject_year_str = subject_year
    ? subject_year.toString().slice(0, 4)
    : "";
  const syllabus_year_str = syllabus_year ? syllabus_year.toString() : "";

  const subject_faculty_str = subject_faculty;
  const syllabus_faculty_str = syllabus_faculty;
  // concatinate all faculty names in videos
  const videos_faculty_str = videos
    ? videos.map((video) => video.faculty).join("")
    : "";

  const faculty_copyright = subject_faculty_str
    ? subject_faculty_str
    : syllabus_faculty_str
    ? syllabus_faculty_str
    : videos_faculty_str
    ? videos_faculty_str
    : "京都大学";

  const year_copyright = subject_year_str
    ? subject_year_str
    : syllabus_year_str
    ? syllabus_year_str
    : "";

  return (
    <Card sx={{ minWidth: 275}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          著作権表記
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          この資料は京都大学OCWウェブサイトに掲載されている
          {title}の資料であり、その著作権は{faculty_copyright}
          に帰属します。©️ {year_copyright} {faculty_copyright}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
