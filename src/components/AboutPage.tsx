import { Contact } from "@/components/common/Contact";
import { Box, Typography } from "@mui/material";

export function AboutPage() {
  return (
    <Box className="About" sx={{ m: "5em" }}>
      <Typography
        variant="h5"
        sx={{
          textAlign: "left",
          my: 4,
        }}
      >
        <b>
          OCW Centralは大学によって無償で提供される教育資料であるOCW (Open
          Courseware) のポータルサイトです。
          <br />
          教育資源の保全とアクセス向上を目指し京都大学情報学科の学生有志により運営されています。
          <br />
          このサイトで公開されている全ての資料は
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja">
            クリエイティブ・コモンズ・ライセンス "表示-非営利-継承 4.0 国際"
          </a>
          に基づき公開されています。
          <br />
          ご指摘や機能追加などのご要望などがありましたら下記のメールアドレスまでご連絡ください。
          <br />
          このウェブサービスのソースコードはMITライセンスのもとでGitHubで公開されています。バグレポートや
          プルリクエストもお待ちしています。
        </b>
      </Typography>
      <Contact />
    </Box>
  );
}
