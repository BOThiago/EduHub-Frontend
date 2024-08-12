import {
  Stack,
  Heading,
  Flex,
  Button,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Course } from "../types/courses.types";
import EditCourseModal from "./EditCourseModal";
import ShowCourseModal from "./ShowCourseModal";
import CreateCourseModal from "./CreateCourseModal";
import DeleteCourseModal from "./DeleteCourseModal";
import { CourseCard } from "./CourseCard";

enum ModalType {
  SHOW = "SHOW",
  EDIT = "EDIT",
  DELETE = "DELETE",
  CREATE = "CREATE",
}

export default function Courses({
  courses,
  refetchCourses,
}: {
  courses: Course[];
  refetchCourses: () => Promise<void>;
}) {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (type: ModalType, id: number | null = null) => {
    setSelectedCourseId(id);
    setModalType(type);
    onOpen();
  };

  const renderModal = () => {
    if (!modalType) return null;
    switch (modalType) {
      case ModalType.SHOW:
        if (!selectedCourseId) return null;
        return (
          <ShowCourseModal
            courseId={selectedCourseId}
            isOpen={isOpen}
            onClose={onClose}
          />
        );
      case ModalType.EDIT:
        if (!selectedCourseId) return null;
        return (
          <EditCourseModal
            courseId={selectedCourseId}
            isOpen={isOpen}
            onClose={onClose}
            refetchCourses={refetchCourses}
          />
        );
      case ModalType.DELETE:
        if (!selectedCourseId) return null;
        return (
          <DeleteCourseModal
            courseId={selectedCourseId}
            isOpen={isOpen}
            onClose={onClose}
            refetchCourses={refetchCourses}
          />
        );
      case ModalType.CREATE:
        return (
          <CreateCourseModal
            isOpen={isOpen}
            onClose={onClose}
            refetchCourses={refetchCourses}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        width="100%"
        height="100%"
      >
        <Stack w="full" h="full" spacing={10} alignItems="center" p="1rem">
          <Button
            colorScheme="green"
            size="lg"
            onClick={() => openModal(ModalType.CREATE)}
            my={6}
          >
            + Adicione um novo curso
          </Button>
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
            {courses.length > 0 ? (
              courses.map((course: Course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onShow={() => openModal(ModalType.SHOW, course.id)}
                  onEdit={() => openModal(ModalType.EDIT, course.id)}
                  onDelete={() => openModal(ModalType.DELETE, course.id)}
                />
              ))
            ) : (
              <Heading marginY={20} size="md">
                Infelizmente nenhum curso foi encontrado :(
              </Heading>
            )}
          </Box>
        </Stack>
      </Flex>
      {renderModal()}
    </>
  );
}
