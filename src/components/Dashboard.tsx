import { Flex } from "@chakra-ui/react";
import RankingCourses from "./RankingCoursesTable";
import Courses from "./Courses";
import { useEffect, useState } from "react";
import { Course } from "../types/courses.types";

export default function Dashboard({ selectedPage }: { selectedPage: string }) {
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/courses`);
      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data: Course[] = await res.json();
      const noExpiredCourses = data.filter((course) => {
        return new Date(course.end_date ?? "") > new Date();
      });
      setCourses(noExpiredCourses);
    } catch (err) {}
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      gap={20}
      w="full"
    >
      {selectedPage === "Cursos" && (
        <Courses courses={courses} refetchCourses={fetchCourses} />
      )}
      {selectedPage === "Relatórios" && <RankingCourses courses={courses} />}
    </Flex>
  );
}
