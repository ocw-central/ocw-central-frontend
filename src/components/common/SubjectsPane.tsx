import { SubjectsRow } from "@/components/common/SubjectsRow";
import { useRandomSubjectQuery } from "@/generated/graphql";
import { useTranslation } from "react-i18next";

type SubjectsPaneProps = {
  category: string;
  series: string;
  academicField: string;
  numSubjects: number;
  rowTitle: string;
  pageSubjectId?: string;
};

export function SubjectsPane(props: SubjectsPaneProps) {
  const { t } = useTranslation();
  const { data, loading, error } = useRandomSubjectQuery({
    variables: {
      category: props.category,
      series: props.series,
      academicField: props.academicField,
      numSubjects: props.numSubjects,
    },
  });
  let relatedSubjects = data?.randomSubjects;
  // remove the subject itself from the list
  if (props.pageSubjectId) {
    relatedSubjects = data?.randomSubjects.filter(
      (subject) => subject.id !== props.pageSubjectId
    );
  }
  // no related subjects
  if (relatedSubjects?.length === 0) {
    return <></>;
  }

  return (
    <SubjectsRow
      subjects={relatedSubjects ? relatedSubjects : []}
      rowTitle={`${t(props.rowTitle)}`}
      loading={loading}
      error={error !== undefined}
    />
  );
}
