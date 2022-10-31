import { theme } from "@/utils/themes";
import { Grid, Typography } from "@mui/material";
import Link from "@mui/material/Link";

export function AboutPage() {
  return (
    <Grid
      container
      className="About"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        direction: "column",
        my: 2,
      }}
    >
      <Grid item md={12} xs={12}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            // color: "#0F5173",
            my: 2,
          }}
        >
          About
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            width: {
              md: "60%",
              sm: "80%",
              xs: "80%",
            },
            margin: "auto",
            color: "black",
          }}
        >
          OCW Centralは大学によって無償で提供される教育資源であるOCW
          (OpenCourseWare) のポータルサイトです。
          公益性の高い教育資源の保全とアクセス向上を目指し京都大学情報学研究科の学生有志により運営されています。
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.palette.primary.main,
            // color: "#0F5173",
            my: 2,
          }}
        >
          License
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            width: {
              md: "60%",
              sm: "80%",
              xs: "80%",
            },
            margin: "auto",
            color: "black",
          }}
        >
          このサイトで公開されている資料は配布元の規約に基づき、
          <Link
            color="primary"
            underline="always"
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja"
          >
            クリエイティブ・コモンズ・ライセンス 表示-非営利-継承 4.0 国際 (CC
            BY-NC-SA 4.0)
          </Link>
          に基づき公開されます。このサイト上の全ての資料について、著作権は作成者の先生方に帰属します。
          ライセンス表記に関するご指摘や機能追加のご要望がありましたら下記のメールアドレスまでご連絡ください。
          <br />
          このウェブサービスのソースコードはMITライセンスのもとで
          <Link
            color="primary"
            underline="always"
            href="https://github.com/ocw-central"
          >
            GitHub
          </Link>
          で公開されています。バグレポートやプルリクを歓迎します。
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.palette.primary.main,
            // color: "#0F5173",
            my: 2,
          }}
        >
          Disclaimer
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            width: {
              md: "60%",
              sm: "80%",
              xs: "80%",
            },
            margin: "auto",
            color: "black",
          }}
        >
          このサイト上の教育資料や書き起こし等の掲載情報の正確性に関して、一切の保証をいたしません。
        </Typography>
        <br />
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.palette.primary.main,
            // color: "#0F5173",
            my: 0,
          }}
        >
          Contact
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            width: {
              md: "60%",
              sm: "80%",
              xs: "80%",
            },
            margin: "auto",
            color: "black",
          }}
        >
          <address>feedback@ocwcentral.com</address>
        </Typography>
      </Grid>
    </Grid>
  );
}
