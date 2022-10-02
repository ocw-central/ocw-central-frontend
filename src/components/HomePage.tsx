import { Box } from "@mui/material";

import Background from "@/assets/background.svg";
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
    <Box
      className="HomePage"
      alignItems="center"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        sx={{
          height: {
            xs: 300,
            sm: 400,
            md: 400,
          },
          width: {
            xs: "100%",
            md: "100%",
          },
          p: {
            xs: 1,
            md: 4,
          },
          borderWidth: 20,
          borderRadius: 2,
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat, repeat",
          backgroundPosition: "right",
        }}
      >
        <Grid
          item
          md={7}
          sm={12}
          xs={12}
          sx={{
            px: {
              xs: 2,
              md: 5,
              ld: 10,
            },
            py: {
              xs: 2,
              md: 2,
            },
            m: {
              xs: 2,
              md: 0,
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "left",
              my: 4,
            }}
          >
            <b>
              OCW CentralはOCW(大学によって <br />
              無償で提供される教育資料)のポータル
              <br />
              サイトです。京都大学情報学科の学生有志
              <br />
              によって教育資源の保全とアクセス向上を
              <br />
              目的として運営されています。
            </b>
          </Typography>
        </Grid>
      </Grid>
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
  );
}
