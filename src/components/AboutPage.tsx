import { Contact } from "@/components/common/Contact";
import { theme } from "@/utils/themes";
import { Box, Grid, Typography } from "@mui/material";

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
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            // color: "#0F5173",
            my: 2,
          }}
        >
          What's this?
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="body1"
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            width: {
              md: "30%",
              sm: "80%",
              xs: "80%",
            },
            margin: "auto",
          }}
        >
          OCWCentralは大学によって無償で提供される教育資料であるOCW（オープン・コース・ウェア）のポータルサイトです。
          公益性の高い教育資源の保全とアクセス向上を目指し京都大学情報学研究科の学生有志により運営されています。
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.palette.primary.main,
            // color: "#0F5173",
            my: 2,
          }}
        >
          Feature
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            width: {
              md: "30%",
              sm: "80%",
              xs: "80%",
            },
            margin: "auto",
          }}
        >
          <ul>
            <li>講義動画の検索</li>
            <li>講義動画の閲覧</li>
            <li>講義資料のダウンロード</li>
            <li>講義音声のトランスクリプション（書き起こし）</li>
          </ul>
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h2"
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
          variant="body1"
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            width: {
              md: "30%",
              sm: "80%",
              xs: "80%",
            },
            margin: "auto",
          }}
        >
          このサイトで公開されている全ての資料は
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja">
            クリエイティブ・コモンズ・ライセンス "表示-非営利-継承 4.0 国際"
          </a>
          に基づき公開されています。
          ライセンスに関するご指摘がございましたら下記のメールアドレスまでご連絡ください。
          <br />
          また、このウェブサービスのソースコードはMITライセンスのもとでGitHubで公開されています。バグレポートやプルリクを歓迎します。
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.palette.primary.main,
            // color: "#0F5173",
            my: 2,
          }}
        >
          Contact
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            width: {
              md: "30%",
              sm: "80%",
              xs: "80%",
            },
            margin: "auto",
          }}
        >
          <address>feedback@ocwcentral.com</address>
        </Typography>
      </Grid>
    </Grid>
  );
}
