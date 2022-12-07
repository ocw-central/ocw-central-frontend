import { SubjectsRow } from "@/components/common/SubjectsRow";
import { useRandomSubjectQuery } from "@/generated/graphql";
import { useTranslation } from "react-i18next";

type SubjectsPaneProps = {
  category: string;
  series: string;
  academicField: string;
  numSubjects: number;
  rowTitle: string;
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

  return (
    <SubjectsRow
      subjects={data ? data.randomSubjects : []}
      rowTitle={`${t(props.rowTitle)}`}
      loading={loading}
      error={error !== undefined}
    />
  );
}
