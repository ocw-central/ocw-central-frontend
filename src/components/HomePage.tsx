import { Box } from "@mui/material";

import { Loading } from "@/components/common/Loading";
import { SubjectCard } from "@/components/common/SubjectCard";
import { useSubjectOnSearchPageQuery } from "@/generated/graphql";
import { useRef, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

type Params = {
  title?: string;
  faculty?: string;
  field?: string;
};

const ChangeGridItems = () => {
  const GridItems: JSX.Element[] = [];
  const [searchParams] = useSearchParams();
  const titleParam = searchParams.get("title");
  const title: string = titleParam !== null ? titleParam : "";
  const facultyParam = searchParams.get("faculty");
  const faculty: string = facultyParam !== null ? facultyParam : "";
  const academicFieldParam = searchParams.get("field");
  const field: string = academicFieldParam !== null ? academicFieldParam : "";
  const mounted = useRef(false);
  const { data, loading, error } = useSubjectOnSearchPageQuery({
    variables: {
      title: title,
      faculty: faculty,
      field: field,
    },
    skip: title === "" && faculty === "" && field === "",
  });
  if (mounted.current) {
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
      data.subjects.forEach((subject) => {
        GridItems.push(<SubjectCard {...subject} />);
      });
    }
  }
  mounted.current = true;
  return GridItems;
};

export function HomePage() {
  const navigate = useNavigate();
  // クエリパラメータをもとに検索を行い、コンポーネントを書き換える
  const GridItems = ChangeGridItems();

  // 講義名検索結果を持つstate
  const [searchTitle, setSearchTitle] = useState("");
  const [searchFaculty, setSearchFaculty] = useState("");
  const [searchAcademicField, setSearchAcademicField] = useState("");

  // stateに基づきsearch parameterを切り替える関数
  const setSearchParams = () => {
    const params: Params = {
      title: searchTitle,
      faculty: searchFaculty,
      field: searchAcademicField,
    };
    const searchParams = createSearchParams(params);

    navigate(`?${searchParams}`);
  };

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
    </Box>
  );
}
