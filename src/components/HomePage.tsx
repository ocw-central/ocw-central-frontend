import { Box } from "@mui/material";

import { SubjectCard } from "@/components/common/SubjectCard";
import { useSubjectOnHomepageQuery } from "@/generated/graphql";
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
  "01GB4X63GY2TZ3RGR0FHZ25K53",
  "01GB4X63GYCAFPK51DZZSKB8JF",
  "01GB4X63H0451ZJJ7RS4FB7PT2",
  "01GB4X63GZHN1NBB0Q7S84XH0A",
  "01GB4X63H0D6B8FZJZS7FDHSM9",
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
      return <div>Loading</div>;
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
      <Box className="HomePage" sx={{ flexGrow: 1 }}>
        <h1>
          OCW CentralはOCW
          (大学によって無償で提供される教育資料)のポータルサイトです。
          教育資源の保全と学習者の利便性の向上を目的としています。
          このサイトは京都大学情報学科の学生有志によって自主的に運営されています。
        </h1>
      </Box>
      <Box className="FeaturedSubjects">
        <h2>Featured Subjects</h2>
        {GridItems}
      </Box>
    </Box>
  );
}
