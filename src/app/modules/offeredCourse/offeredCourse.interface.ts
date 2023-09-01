export type ICreateOfferedCourse = {
  courseIds: string;
  academicDepartmentId: string;
  semesterRegistrationId: string;
};

export type IOfferedCourseFilter = {
  searchTerm?: string | undefined;
  semesterRegistrationId?: string | undefined;
  courseId?: string | undefined;
  academicDepartmentId?: string | undefined;
};
