import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type AcademicField = {
  __typename?: 'AcademicField';
  name: Scalars['String'];
};

export type Chapter = Node & {
  __typename?: 'Chapter';
  id: Scalars['ID'];
  startAt: Scalars['Int'];
  thumbnailLink: Scalars['String'];
  topic: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  academicFields: Array<AcademicField>;
  randomSubjects: Array<Subject>;
  subject: Subject;
  subjects: Array<Subject>;
  subjectsWithSpecifiedVideos: Array<SubjectWithSpecifiedVideos>;
};


export type QueryRandomSubjectsArgs = {
  academicField: Scalars['String'];
  category: Scalars['String'];
  numSubjects: Scalars['Int'];
  series: Scalars['String'];
};


export type QuerySubjectArgs = {
  id: Scalars['ID'];
};


export type QuerySubjectsArgs = {
  academicField: Scalars['String'];
  faculty: Scalars['String'];
  title: Scalars['String'];
};


export type QuerySubjectsWithSpecifiedVideosArgs = {
  faculty: Scalars['String'];
  title: Scalars['String'];
};

export type RelatedSubject = Node & {
  __typename?: 'RelatedSubject';
  academicField: Scalars['String'];
  category: Scalars['String'];
  department: Scalars['String'];
  faculty: Scalars['String'];
  firstHeldOn?: Maybe<Scalars['Time']>;
  freeDescription: Scalars['String'];
  id: Scalars['ID'];
  language: Scalars['String'];
  location: Scalars['String'];
  relatedSubjectIds: Array<Scalars['ID']>;
  resourceIds: Array<Scalars['ID']>;
  series: Scalars['String'];
  syllabusId: Scalars['ID'];
  thumbnailLink: Scalars['String'];
  title: Scalars['String'];
  videoIds: Array<Scalars['ID']>;
};

export type Resource = Node & {
  __typename?: 'Resource';
  description: Scalars['String'];
  id: Scalars['ID'];
  link: Scalars['String'];
  ordering: Scalars['Int'];
  title: Scalars['String'];
};

export type Subject = Node & {
  __typename?: 'Subject';
  academicField: Scalars['String'];
  category: Scalars['String'];
  department: Scalars['String'];
  faculty: Scalars['String'];
  firstHeldOn?: Maybe<Scalars['Time']>;
  freeDescription: Scalars['String'];
  id: Scalars['ID'];
  language: Scalars['String'];
  location: Scalars['String'];
  relatedSubjects: Array<RelatedSubject>;
  resources: Array<Resource>;
  series: Scalars['String'];
  syllabus?: Maybe<Syllabus>;
  thumbnailLink: Scalars['String'];
  title: Scalars['String'];
  videos: Array<Video>;
};

export type SubjectWithSpecifiedVideos = {
  __typename?: 'SubjectWithSpecifiedVideos';
  subject: Subject;
  videos: Array<Video>;
};

export type Subpage = Node & {
  __typename?: 'Subpage';
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type Syllabus = Node & {
  __typename?: 'Syllabus';
  academicYear: Scalars['Int'];
  assignedGrade: Scalars['String'];
  courseDayPeriod: Scalars['String'];
  courseFormat: Scalars['String'];
  courseRequirement: Scalars['String'];
  faculty: Scalars['String'];
  gradingMethod: Scalars['String'];
  id: Scalars['ID'];
  language: Scalars['String'];
  lessonPlan: Scalars['String'];
  numCredit: Scalars['Int'];
  objective: Scalars['String'];
  outClassLearning: Scalars['String'];
  outline: Scalars['String'];
  reference: Scalars['String'];
  remark: Scalars['String'];
  semester: Scalars['String'];
  subjectNumbering: Scalars['String'];
  subpages: Array<Subpage>;
  targetedAudience: Scalars['String'];
};

export type Video = Node & {
  __typename?: 'Video';
  chapters: Array<Chapter>;
  faculty: Scalars['String'];
  id: Scalars['ID'];
  language: Scalars['String'];
  lecturedOn?: Maybe<Scalars['Time']>;
  link: Scalars['String'];
  ordering: Scalars['Int'];
  title: Scalars['String'];
  transcription: Scalars['String'];
  videoLength: Scalars['Int'];
};

export type AcademicFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type AcademicFieldsQuery = { __typename?: 'Query', academicFields: Array<{ __typename?: 'AcademicField', name: string }> };

export type SubjectOnSearchPageQueryVariables = Exact<{
  title: Scalars['String'];
  faculty: Scalars['String'];
  field: Scalars['String'];
}>;


export type SubjectOnSearchPageQuery = { __typename?: 'Query', subjects: Array<{ __typename?: 'Subject', id: string, title: string, thumbnailLink: string, faculty: string }> };

export type SearchVideosQueryVariables = Exact<{
  title: Scalars['String'];
  faculty: Scalars['String'];
}>;


export type SearchVideosQuery = { __typename?: 'Query', subjectsWithSpecifiedVideos: Array<{ __typename?: 'SubjectWithSpecifiedVideos', subject: { __typename?: 'Subject', id: string, thumbnailLink: string }, videos: Array<{ __typename?: 'Video', id: string, title: string, ordering: number, faculty: string, link: string }> }> };

export type SubjectQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SubjectQuery = { __typename?: 'Query', subject: { __typename?: 'Subject', id: string, title: string, category: string, location: string, department: string, firstHeldOn?: any | null, faculty: string, language: string, freeDescription: string, series: string, academicField: string, thumbnailLink: string, videos: Array<{ __typename?: 'Video', id: string, title: string, ordering: number, link: string, faculty: string, lecturedOn?: any | null, videoLength: number, language: string, transcription: string, chapters: Array<{ __typename?: 'Chapter', id: string, startAt: number, topic: string, thumbnailLink: string }> }>, resources: Array<{ __typename?: 'Resource', id: string, title: string, ordering: number, description: string, link: string }>, relatedSubjects: Array<{ __typename?: 'RelatedSubject', id: string, title: string, thumbnailLink: string, faculty: string }>, syllabus?: { __typename?: 'Syllabus', id: string, faculty: string, language: string, subjectNumbering: string, academicYear: number, semester: string, numCredit: number, courseFormat: string, assignedGrade: string, targetedAudience: string, courseDayPeriod: string, outline: string, objective: string, lessonPlan: string, gradingMethod: string, courseRequirement: string, outClassLearning: string, reference: string, remark: string, subpages: Array<{ __typename?: 'Subpage', id: string, content: string }> } | null } };

export type SubjectOnHomepageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SubjectOnHomepageQuery = { __typename?: 'Query', subject: { __typename?: 'Subject', id: string, title: string, thumbnailLink: string, faculty: string } };

export type RandomSubjectQueryVariables = Exact<{
  category: Scalars['String'];
  series: Scalars['String'];
  academicField: Scalars['String'];
  numSubjects: Scalars['Int'];
}>;


export type RandomSubjectQuery = { __typename?: 'Query', randomSubjects: Array<{ __typename?: 'Subject', id: string, title: string, thumbnailLink: string, faculty: string }> };


export const AcademicFieldsDocument = gql`
    query academicFields {
  academicFields {
    name
  }
}
    `;

/**
 * __useAcademicFieldsQuery__
 *
 * To run a query within a React component, call `useAcademicFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAcademicFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAcademicFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAcademicFieldsQuery(baseOptions?: Apollo.QueryHookOptions<AcademicFieldsQuery, AcademicFieldsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AcademicFieldsQuery, AcademicFieldsQueryVariables>(AcademicFieldsDocument, options);
      }
export function useAcademicFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AcademicFieldsQuery, AcademicFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AcademicFieldsQuery, AcademicFieldsQueryVariables>(AcademicFieldsDocument, options);
        }
export type AcademicFieldsQueryHookResult = ReturnType<typeof useAcademicFieldsQuery>;
export type AcademicFieldsLazyQueryHookResult = ReturnType<typeof useAcademicFieldsLazyQuery>;
export type AcademicFieldsQueryResult = Apollo.QueryResult<AcademicFieldsQuery, AcademicFieldsQueryVariables>;
export const SubjectOnSearchPageDocument = gql`
    query subjectOnSearchPage($title: String!, $faculty: String!, $field: String!) {
  subjects(title: $title, faculty: $faculty, academicField: $field) {
    id
    title
    thumbnailLink
    faculty
  }
}
    `;

/**
 * __useSubjectOnSearchPageQuery__
 *
 * To run a query within a React component, call `useSubjectOnSearchPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectOnSearchPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectOnSearchPageQuery({
 *   variables: {
 *      title: // value for 'title'
 *      faculty: // value for 'faculty'
 *      field: // value for 'field'
 *   },
 * });
 */
export function useSubjectOnSearchPageQuery(baseOptions: Apollo.QueryHookOptions<SubjectOnSearchPageQuery, SubjectOnSearchPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubjectOnSearchPageQuery, SubjectOnSearchPageQueryVariables>(SubjectOnSearchPageDocument, options);
      }
export function useSubjectOnSearchPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubjectOnSearchPageQuery, SubjectOnSearchPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubjectOnSearchPageQuery, SubjectOnSearchPageQueryVariables>(SubjectOnSearchPageDocument, options);
        }
export type SubjectOnSearchPageQueryHookResult = ReturnType<typeof useSubjectOnSearchPageQuery>;
export type SubjectOnSearchPageLazyQueryHookResult = ReturnType<typeof useSubjectOnSearchPageLazyQuery>;
export type SubjectOnSearchPageQueryResult = Apollo.QueryResult<SubjectOnSearchPageQuery, SubjectOnSearchPageQueryVariables>;
export const SearchVideosDocument = gql`
    query searchVideos($title: String!, $faculty: String!) {
  subjectsWithSpecifiedVideos(title: $title, faculty: $faculty) {
    subject {
      id
      thumbnailLink
    }
    videos {
      id
      title
      ordering
      faculty
      link
    }
  }
}
    `;

/**
 * __useSearchVideosQuery__
 *
 * To run a query within a React component, call `useSearchVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchVideosQuery({
 *   variables: {
 *      title: // value for 'title'
 *      faculty: // value for 'faculty'
 *   },
 * });
 */
export function useSearchVideosQuery(baseOptions: Apollo.QueryHookOptions<SearchVideosQuery, SearchVideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchVideosQuery, SearchVideosQueryVariables>(SearchVideosDocument, options);
      }
export function useSearchVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchVideosQuery, SearchVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchVideosQuery, SearchVideosQueryVariables>(SearchVideosDocument, options);
        }
export type SearchVideosQueryHookResult = ReturnType<typeof useSearchVideosQuery>;
export type SearchVideosLazyQueryHookResult = ReturnType<typeof useSearchVideosLazyQuery>;
export type SearchVideosQueryResult = Apollo.QueryResult<SearchVideosQuery, SearchVideosQueryVariables>;
export const SubjectDocument = gql`
    query subject($id: ID!) {
  subject(id: $id) {
    id
    title
    category
    title
    videos {
      id
      title
      ordering
      link
      chapters {
        id
        startAt
        topic
        thumbnailLink
      }
      faculty
      lecturedOn
      videoLength
      language
      transcription
    }
    location
    resources {
      id
      title
      ordering
      description
      link
    }
    relatedSubjects {
      id
      title
      thumbnailLink
      faculty
    }
    department
    firstHeldOn
    faculty
    language
    freeDescription
    syllabus {
      id
      faculty
      language
      subjectNumbering
      academicYear
      semester
      numCredit
      courseFormat
      assignedGrade
      targetedAudience
      courseDayPeriod
      outline
      objective
      lessonPlan
      gradingMethod
      courseRequirement
      outClassLearning
      reference
      remark
      subpages {
        id
        content
      }
    }
    series
    academicField
    thumbnailLink
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
export function useSubjectQuery(baseOptions: Apollo.QueryHookOptions<SubjectQuery, SubjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubjectQuery, SubjectQueryVariables>(SubjectDocument, options);
      }
export function useSubjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubjectQuery, SubjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubjectQuery, SubjectQueryVariables>(SubjectDocument, options);
        }
export type SubjectQueryHookResult = ReturnType<typeof useSubjectQuery>;
export type SubjectLazyQueryHookResult = ReturnType<typeof useSubjectLazyQuery>;
export type SubjectQueryResult = Apollo.QueryResult<SubjectQuery, SubjectQueryVariables>;
export const SubjectOnHomepageDocument = gql`
    query subjectOnHomepage($id: ID!) {
  subject(id: $id) {
    id
    title
    thumbnailLink
    faculty
  }
}
    `;

/**
 * __useSubjectOnHomepageQuery__
 *
 * To run a query within a React component, call `useSubjectOnHomepageQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectOnHomepageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectOnHomepageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubjectOnHomepageQuery(baseOptions: Apollo.QueryHookOptions<SubjectOnHomepageQuery, SubjectOnHomepageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubjectOnHomepageQuery, SubjectOnHomepageQueryVariables>(SubjectOnHomepageDocument, options);
      }
export function useSubjectOnHomepageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubjectOnHomepageQuery, SubjectOnHomepageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubjectOnHomepageQuery, SubjectOnHomepageQueryVariables>(SubjectOnHomepageDocument, options);
        }
export type SubjectOnHomepageQueryHookResult = ReturnType<typeof useSubjectOnHomepageQuery>;
export type SubjectOnHomepageLazyQueryHookResult = ReturnType<typeof useSubjectOnHomepageLazyQuery>;
export type SubjectOnHomepageQueryResult = Apollo.QueryResult<SubjectOnHomepageQuery, SubjectOnHomepageQueryVariables>;
export const RandomSubjectDocument = gql`
    query randomSubject($category: String!, $series: String!, $academicField: String!, $numSubjects: Int!) {
  randomSubjects(
    category: $category
    series: $series
    academicField: $academicField
    numSubjects: $numSubjects
  ) {
    id
    title
    thumbnailLink
    faculty
  }
}
    `;

/**
 * __useRandomSubjectQuery__
 *
 * To run a query within a React component, call `useRandomSubjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useRandomSubjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRandomSubjectQuery({
 *   variables: {
 *      category: // value for 'category'
 *      series: // value for 'series'
 *      academicField: // value for 'academicField'
 *      numSubjects: // value for 'numSubjects'
 *   },
 * });
 */
export function useRandomSubjectQuery(baseOptions: Apollo.QueryHookOptions<RandomSubjectQuery, RandomSubjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RandomSubjectQuery, RandomSubjectQueryVariables>(RandomSubjectDocument, options);
      }
export function useRandomSubjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RandomSubjectQuery, RandomSubjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RandomSubjectQuery, RandomSubjectQueryVariables>(RandomSubjectDocument, options);
        }
export type RandomSubjectQueryHookResult = ReturnType<typeof useRandomSubjectQuery>;
export type RandomSubjectLazyQueryHookResult = ReturnType<typeof useRandomSubjectLazyQuery>;
export type RandomSubjectQueryResult = Apollo.QueryResult<RandomSubjectQuery, RandomSubjectQueryVariables>;