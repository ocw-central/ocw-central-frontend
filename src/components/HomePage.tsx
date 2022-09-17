import { Box } from "@mui/material";

export function HomePage() {
  return (
    <Box className="HomePage" sx={{ flexGrow: 1 }}>
      <h3>
        OCW CentralはOCW
        (大学によって無償で提供される教育資料)のポータルサイトです。
        教育資源の保全と学習者の利便性の向上を目的としています。
        このサイトは京都大学情報学科の学生有志によって自主的に運営されています。
      </h3>
    </Box>
  );
}
