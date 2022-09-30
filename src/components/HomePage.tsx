import { Box } from "@mui/material";

import { Loading } from "@/components/common/Loading";
import { SubjectCard } from "@/components/common/SubjectCard";
import { useRandomSubjectQuery } from "@/generated/graphql";
import { Divider, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type SubjectOnSearchPage = {
  id: string;
  title: string;
  faculty: string;
  thumbnailLink: string;
};

type Params = {
  title?: string;
  faculty?: string;
  field?: string;
};

export function HomePage() {
  const navigate = useNavigate();
  const GridRandomItems: JSX.Element[] = [];

  const { data, loading, error } = useRandomSubjectQuery({
    variables: {},
  });

  if (loading) {
    return <Loading size={"7em"} color={"primary"} />;
  }
  if (error) {
    return <div>Failed to fetch random lectures.</div>;
  }
  if (!data) {
    return <div>該当講義がありません</div>;
  }
  if (data) {
    data.randomSubjects.map((subject) => {
      GridRandomItems.push(
        <SubjectCard
          id={subject.id}
          title={subject.title}
          faculty={subject.faculty}
          thumbnailLink={subject.thumbnailLink}
        />
      );
    });
  }
  return (
    <Box>
      <Box
        className="HomePage"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <h2>
          OCW
          CentralはOCW(高等教育機関によってオープンライセンスの元で提供される無料の学習教材)のポータルサイトです。
          教育資源の保全とアクセス向上を目的としています。
          このサイトは京都大学情報学科の学生有志によって自主的に運営されており、いかなる大学機関とも関わりはありません。
        </h2>
        <Grid
          container
          sx={{ height: "100%", alignSelf: "center", justifyContent: "center" }}
        >
          <Grid item xs={12} md={15}>
            <Box
              sx={{
                m: {
                  xs: 0,
                  md: 4,
                },
                mb: 2,
                display: "flex",
                flexDirection: "column",
                height: 700,
                overflow: "hidden",
                overflowY: "scroll",
              }}
            >
              <Typography variant="h5" component="div" align="left">
                <b>Feeling Lucky</b>
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container>{GridRandomItems}</Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
