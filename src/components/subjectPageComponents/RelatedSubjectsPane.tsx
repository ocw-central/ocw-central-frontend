import { SubjectsPane } from "@/components/common/SubjectsPane";
import { useTranslation } from "react-i18next";

type Props = {
  category: string;
  series: string;
  academicField: string;
  numSubjects: number;
  pageSubjectId?: string;
};

export function RelatedSubjectsPane(props: Props) {
  const { t } = useTranslation();

  if (props.academicField === "")
    return (
      <SubjectsPane
        category={""}
        series={""}
        academicField={""}
        numSubjects={props.numSubjects}
        rowTitle={t("translation.subject.related_subjects")}
        pageSubjectId={props.pageSubjectId}
      />
    );

  return (
    <SubjectsPane
      category={""}
      series={""}
      academicField={props.academicField}
      numSubjects={props.numSubjects}
      rowTitle={t("translation.subject.related_subjects")}
      pageSubjectId={props.pageSubjectId}
    />
  );
}
