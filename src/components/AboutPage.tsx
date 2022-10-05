import { Contact } from "@/components/common/Contact";
import { Box, Typography } from "@mui/material";

export function AboutPage() {
  return (
    <Box className="About" sx={{ m: "5em" }}>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          my: 4,
        }}
      >
        <b>
          OCW
          CentralはOCW(大学によって無償で提供される教育資料)のポータルサイトです。
          <br />
          京都大学情報学科の学生有志によって教育資源の保全とアクセス向上を目指して運営されています。
        </b>
      </Typography>
      <Contact />
    </Box>
  );
}
