import { Video } from "@/generated/graphql";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  subject_faculty: string;
  syllabus_faculty: string | undefined;
  subject_year: string;
  syllabus_year: number | undefined;
  videos: Video[];
};

export function SubjectCopyrightCard(props: Props) {
  const { t } = useTranslation();
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
          <b>{t("translation.subject.copyright_notice")}</b>
        </Typography>
        <Typography
          sx={{ mb: 1.5, fontSize: "1em", textAlign: "left" }}
          color="black"
        >
          {t("translation.subject.copyright_sentence1")}
          {title}
          {t("translation.subject.copyright_sentence2")}
          {faculty_copyright}
          {t("translation.subject.copyright_sentence3")}
          <Link
            href="https://ocw.kyoto-u.ac.jp/guideline/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("translation.subject.copyright_sentence4")}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
