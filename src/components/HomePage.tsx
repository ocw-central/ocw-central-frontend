import { useAcademicFieldsQuery } from "@/generated/graphql";
import { Box } from "@mui/material";

export function HomePage() {
  const { data, loading, error } = useAcademicFieldsQuery({});
  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  console.log(data);

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
