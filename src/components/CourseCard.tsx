import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Course } from "../types/courses.types";
import ReactPlayer from "react-player";

export function CourseCard({
  course,
  onShow,
  onEdit,
  onDelete,
}: {
  course: Course;
  onShow: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Card maxW="sm">
      <CardBody
        onClick={onShow}
        cursor="pointer"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {course.course_files && course.course_files.length > 0 ? (
          <Box shadow="xl">
            <ReactPlayer
              width={300}
              height={165}
              controls={true}
              url={course.course_files[0].file_url}
            />
          </Box>
        ) : (
          <Box
            width={300}
            height={165}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.200"
          >
            <Text>Vídeo não disponível</Text>
          </Box>
        )}
        <Stack mt="6" spacing="3">
          <Heading size="md">{course.title}</Heading>
          <Text>{course.description}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justifyContent="space-around">
        <ButtonGroup spacing="2">
          <Button gap={2} onClick={onEdit} variant="solid" colorScheme="blue">
            Editar
            <FiEdit />
          </Button>
          <Button gap={2} onClick={onDelete} variant="solid" colorScheme="red">
            Deletar
            <FiTrash2 />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
