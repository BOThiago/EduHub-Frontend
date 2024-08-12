import {
  Stack,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Course } from "../types/courses.types";

export default function RankingCourses({ courses }: { courses: Course[] }) {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      width="100%"
      height="100%"
    >
      <Stack w="full" h="full" spacing={10} alignItems="center" p="1rem">
        <Box w="full">
          <Heading size="xl" marginY={4}>
            Ranking do Tamanho do Vídeos
          </Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Posição</Th>
                  <Th>Título</Th>
                  <Th>Tamanho</Th>
                </Tr>
              </Thead>
              <Tbody>
                {courses?.length ? (
                  courses
                    .filter(
                      (course: Course) => course.total_size_in_mb !== undefined
                    )
                    .sort(
                      (a, b) =>
                        (a.total_size_in_mb ?? 0) - (b.total_size_in_mb ?? 0)
                    )
                    .reverse()
                    .map((course: Course, index) => (
                      <Tr key={course.id}>
                        <Td>{index + 1}</Td>
                        <Td>{course.title}</Td>
                        <Td>{course.total_size_in_mb} MB</Td>
                      </Tr>
                    ))
                ) : (
                  <Heading marginY={20} size="md">
                    Infelizmente não há dados para gerar o relatório :(
                  </Heading>
                )}
              </Tbody>
            </Table>
            {courses.length === 0 && (
              <Heading marginY={20} size="md">
                Infelizmente nenhum curso foi encontrado :(
              </Heading>
            )}
          </TableContainer>
        </Box>
      </Stack>
    </Flex>
  );
}
