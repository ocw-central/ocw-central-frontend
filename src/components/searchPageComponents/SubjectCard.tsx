import { ImageListItem, ImageListItemBar } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

type SubjectOnSearchPage = {
  id: string;
  title: string;
  faculty: string;
  thumbnailLink: string;
};

const MyImageListItemBar = styled(ImageListItemBar)({
  color: "white",
  backgroundColor: alpha("#000", 0.75),
});
const MyImageListItem = styled(ImageListItem)({
  "&:hover": {
    opacity: 0.5,
    transition: 0.3,
  },
});

export const SubjectCard = (subject: SubjectOnSearchPage) => {
  return (
    <Link to={`/subjects/${subject.id}`}>
      <MyImageListItem>
        <img
          src={`${subject.thumbnailLink}`}
          loading="lazy"
          style={{ height: 280 }}
        />
        <MyImageListItemBar title={subject.title} subtitle={subject.faculty} />
      </MyImageListItem>
    </Link>
  );
};
