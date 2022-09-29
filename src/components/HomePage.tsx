import { Box } from "@mui/material";

import { Loading } from "@/components/common/Loading";
import { SubjectCard } from "@/components/common/SubjectCard";
import { useSubjectOnHomepageQuery } from "@/generated/graphql";
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

const FEATURED_SUBJECTS_IDS = [
  "01GB4X63H1KYQ3K8MN95PGYASY",
  "01GBMW5CXV2RMJMSTQKCS5KKC0",
  "01GB4X63GYPW8ECNVC7WXW7934",
  "01GB4X63H5XDNBJ36VWYS83X9V",
  "01GB4X63H52R2YFD372NEGCH92",
  "01GB4X63GY2TZ3RGR0FHZ25K53",
  "01GB4X63GYCAFPK51DZZSKB8JF",
  "01GB4X63H0451ZJJ7RS4FB7PT2",
  "01GB4X63H0D6B8FZJZS7FDHSM9",
  "01GB4X63H2NC2K55QQA0ANN9V1",
];

export function HomePage() {
  const navigate = useNavigate();
  const GridItems: JSX.Element[] = [];
  FEATURED_SUBJECTS_IDS.forEach((id) => {
    const { data, loading, error } = useSubjectOnHomepageQuery({
      variables: {
        id: id,
      },
    });

    if (loading) {
      return <Loading size={"7em"} color={"primary"} />;
    }
    if (error) {
      return <div>Error</div>;
    }
    if (!data) {
      return <div>該当講義がありません</div>;
    }
    if (data) {
      GridItems.push(<SubjectCard {...data.subject} />);
    }
  });
  return (
    <Box>
      <Box className="HomePage">
        <h2>
          OCW
          CentralはOCW(高等教育機関によってオープンライセンスの元で提供される無料の学習教材)のポータルサイトです。
          教育資源の保全とアクセス向上を目的としています。
          このサイトは京都大学情報学科の学生有志によって自主的に運営されており、いかなる大学機関とも関わりはありません。
        </h2>
        <Grid container sx={{ height: "100%" }}>
          <Grid
            container
            xs={0}
            md={3}
            sx={{
              display: { xs: "none", md: "flex" },
              mb: 2,
              flexDirection: "column",
              height: 500,
              overflow: "hidden",
              overflowY: "scroll",
            }}
          ></Grid>
          <Grid item xs={12} md={9}>
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
                <b>注目の講義</b>
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container>{GridItems}</Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
