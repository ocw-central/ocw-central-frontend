import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Duration: any;
  Time: any;
};

export type Chapter = Node & {
  __typename?: "Chapter";
  id: Scalars["ID"];
  startAt: Scalars["Int"];
  thumbnailLink: Scalars["String"];
  topic: Scalars["String"];
};

export type Node = {
  id: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  subject: Subject;
  subjects: Array<Subject>;
};

export type QuerySubjectArgs = {
  id: Scalars["ID"];
};

export type QuerySubjectsArgs = {
  academicField?: InputMaybe<Scalars["String"]>;
  faculty?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type RelatedSubject = Node & {
  __typename?: "RelatedSubject";
  academicField: Scalars["String"];
  category: Scalars["String"];
  department: Scalars["String"];
  faculty: Scalars["String"];
  firstHeldOn: Scalars["Time"];
  freeDescription: Scalars["String"];
  id: Scalars["ID"];
  language: Scalars["String"];
  location: Scalars["String"];
  relatedSubjectIds: Array<Scalars["ID"]>;
  resourceIds: Array<Scalars["ID"]>;
  series: Scalars["String"];
  syllabusId: Scalars["ID"];
  thumbnailLink: Scalars["String"];
  title: Scalars["String"];
  videoIds: Array<Scalars["ID"]>;
};

export type Resource = Node & {
  __typename?: "Resource";
  description: Scalars["String"];
  id: Scalars["ID"];
  link: Scalars["String"];
  ordering: Scalars["Int"];
  title: Scalars["String"];
};

export type Subject = Node & {
  __typename?: "Subject";
  academicField: Scalars["String"];
  category: Scalars["String"];
  department: Scalars["String"];
  faculty: Scalars["String"];
  firstHeldOn: Scalars["Time"];
  freeDescription: Scalars["String"];
  id: Scalars["ID"];
  language: Scalars["String"];
  location: Scalars["String"];
  relatedSubjects: Array<RelatedSubject>;
  resources: Array<Resource>;
  series: Scalars["String"];
  syllabus: Syllabus;
  thumbnailLink: Scalars["String"];
  title: Scalars["String"];
  videos: Array<Video>;
};

export type Subpage = Node & {
  __typename?: "Subpage";
  content: Scalars["String"];
  id: Scalars["ID"];
};

export type Syllabus = Node & {
  __typename?: "Syllabus";
  academicYear: Scalars["Int"];
  assignedGrade: Scalars["String"];
  courceDayPeriod: Scalars["String"];
  courceFormat: Scalars["String"];
  courceRequirement: Scalars["String"];
  faculty: Scalars["String"];
  gradingMethod: Scalars["String"];
  id: Scalars["ID"];
  language: Scalars["String"];
  lessonPlan: Scalars["String"];
  numCredit: Scalars["Int"];
  objective: Scalars["String"];
  outClassLearning: Scalars["String"];
  outline: Scalars["String"];
  reference: Scalars["String"];
  remark: Scalars["String"];
  semester: Scalars["String"];
  subjectNumbering: Scalars["String"];
  subpages: Array<Subpage>;
  targetedAudience: Scalars["String"];
};

export type Video = Node & {
  __typename?: "Video";
  chapters: Array<Chapter>;
  faculty: Scalars["String"];
  id: Scalars["ID"];
  language: Scalars["String"];
  lecturedOn: Scalars["Time"];
  link: Scalars["String"];
  ordering: Scalars["Int"];
  title: Scalars["String"];
  videoLength: Scalars["Int"];
};

export type SubjectQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type SubjectQuery = {
  __typename?: "Query";
  subject: { __typename?: "Subject"; id: string; title: string };
};

export type SubjetcsQueryVariables = Exact<{
  title?: InputMaybe<Scalars["String"]>;
  faculty?: InputMaybe<Scalars["String"]>;
  academicField?: InputMaybe<Scalars["String"]>;
}>;

export type SubjetcsQuery = {
  __typename?: "Query";
  subjects: Array<{
    __typename?: "Subject";
    id: string;
    title: string;
    faculty: string;
    thumbnailLink: string;
  }>;
};

export const SubjectDocument = gql`
  query subject($id: ID!) {
    subject(id: $id) {
      id
      title
    }
  }
`;

/**
 * __useSubjectQuery__
 *
 * To run a query within a React component, call `useSubjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubjectQuery(
  baseOptions: Apollo.QueryHookOptions<SubjectQuery, SubjectQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SubjectQuery, SubjectQueryVariables>(
    SubjectDocument,
    options
  );
}
export function useSubjectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SubjectQuery, SubjectQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SubjectQuery, SubjectQueryVariables>(
    SubjectDocument,
    options
  );
}
export type SubjectQueryHookResult = ReturnType<typeof useSubjectQuery>;
export type SubjectLazyQueryHookResult = ReturnType<typeof useSubjectLazyQuery>;
export type SubjectQueryResult = Apollo.QueryResult<
  SubjectQuery,
  SubjectQueryVariables
>;
export const SubjetcsDocument = gql`
  query subjetcs($title: String, $faculty: String, $academicField: String) {
    subjects(title: $title, faculty: $faculty, academicField: $academicField) {
      id
      title
      faculty
      thumbnailLink
    }
  }
`;

/**
 * __useSubjetcsQuery__
 *
 * To run a query within a React component, call `useSubjetcsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjetcsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjetcsQuery({
 *   variables: {
 *      title: // value for 'title'
 *      faculty: // value for 'faculty'
 *      academicField: // value for 'academicField'
 *   },
 * });
 */
export function useSubjetcsQuery(
  baseOptions?: Apollo.QueryHookOptions<SubjetcsQuery, SubjetcsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SubjetcsQuery, SubjetcsQueryVariables>(
    SubjetcsDocument,
    options
  );
}
export function useSubjetcsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SubjetcsQuery,
    SubjetcsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SubjetcsQuery, SubjetcsQueryVariables>(
    SubjetcsDocument,
    options
  );
}
export type SubjetcsQueryHookResult = ReturnType<typeof useSubjetcsQuery>;
export type SubjetcsLazyQueryHookResult = ReturnType<
  typeof useSubjetcsLazyQuery
>;
export type SubjetcsQueryResult = Apollo.QueryResult<
  SubjetcsQuery,
  SubjetcsQueryVariables
>;
