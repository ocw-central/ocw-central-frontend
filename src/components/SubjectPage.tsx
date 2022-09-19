import { SubjectCopyrightCard } from "@/components/subjectPageComponents/SubjectCopyrightCard";
import { SubjectMainWithNoVideo } from "@/components/subjectPageComponents/SubjectMainWithNoVideo";
import { SubjectMainWithVideo } from "@/components/subjectPageComponents/SubjectMainWithVideo";
import { useSubjectQuery } from "@/generated/graphql";
import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export function SubjectPage() {
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id")!;

  const { data, loading, error } = useSubjectQuery({
    variables: {
      id: id,
    },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>failed to fetch use SubjectQuery in SubjectPage</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  const subject = data.subject;
  const videos = subject.videos ?? []; //already sorted by `ordering` field
  const hasVideos = videos.length > 0;

  //const chapters = videos.chapters ?? [];
  const syllabus = subject.syllabus;

  return (
    <Box className="Subject">
      <Box
        className="MainBox"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Typography variant="h2" component="div" align="left" sx={{ p: 1 }}>
            {subject.title}
          </Typography>
        </Box>
        {hasVideos && (
          <SubjectMainWithVideo subjectId={subject.id} videos={videos} />
        )}
        {!hasVideos && <SubjectMainWithNoVideo />}
      </Box>
      <Box className="CopyrightBox" sx={{ display: "flex" }}>
        <SubjectCopyrightCard
          title={subject.title}
          subject_faculty={subject.faculty}
          syllabus_faculty={syllabus?.faculty}
          subject_year={subject.firstHeldOn}
          syllabus_year={syllabus?.academicYear}
          videos={videos}
        />
      </Box>
    </Box>
  );
}
