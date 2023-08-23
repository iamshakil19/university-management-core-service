export type ICourseCreateData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: {
    courseId: string;
  }[];
};

export type ICourseFilter = {
  searchTerm?: string | undefined;
};
