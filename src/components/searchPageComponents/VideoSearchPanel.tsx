import { Loading } from "@/components/common/Loading";
import { VideoDetailSearchBar } from "@/components/searchPageComponents/VideoDetailSearchBar";
import { useSearchVideosQuery } from "@/generated/graphql";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { VideoSearchResults } from "./VideoSearchResults";

type Params = {
  title?: string;
  faculty?: string;
};

export function VideoSearchPanel() {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchFaculty, setSearchFaculty] = useState("");
  // check whether the search button has already clicked
  const [onSearch, setOnSearch] = useState(false);
  const navigate = useNavigate();
  const setSearchParams = () => {
    const params: Params = {
      title: searchTitle,
      faculty: searchFaculty,
    };
    const searchParams = createSearchParams(params);

    navigate(`?${searchParams}&video`);
  };

  const [searchParams] = useSearchParams();
  const isVideoSearch = searchParams.get("video") !== null;

  const titleParam = searchParams.get("title");
  const title: string = titleParam !== null && isVideoSearch ? titleParam : "";
  const facultyParam = searchParams.get("faculty");
  const faculty: string =
    facultyParam !== null && isVideoSearch ? facultyParam : "";

  const { data, loading, error } = useSearchVideosQuery({
    variables: {
      title: title,
      faculty: faculty,
    },
    skip: title === "" && faculty === "",
  });
  if (loading) {
    return <Loading size={"7em"} color={"primary"} />;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <Box>
      <VideoDetailSearchBar
        setSearchParams={setSearchParams}
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        searchFaculty={searchFaculty}
        setSearchFaculty={setSearchFaculty}
        onSearch={() => setOnSearch(true)}
      />
      {isVideoSearch && onSearch && !title && !faculty && (
        <Typography
          variant="h5"
          component="div"
          align="center"
          sx={{ color: "black" }}
        >
          少なくとも一つの項目を入力してください
        </Typography>
      )}
      {(title || faculty) && (
        <VideoSearchResults
          subjectsWithSpecifiedVideos={data?.subjectsWithSpecifiedVideos}
        />
      )}
    </Box>
  );
}
