import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { Course } from "../types/courses.types";
import { useEffect, useState } from "react";

export default function DeleteCourseModal({
  isOpen,
  onClose,
  courseId,
  refetchCourses,
}: {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  refetchCourses: () => Promise<void>;
}) {
  const [course, setCourses] = useState<Course>();
  const toast = useToast();

  const handleDeleteCourse = async () => {
    try {
      const res = await fetch(`http://localhost:5000/courses/${courseId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete course !");

      refetchCourses();
      onClose();

      toast({
        title: "Curso deletado.",
        description: "O curso foi deletado com sucesso !",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Erro",
        description: "Falha ao deletar o curso.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      const fetchCourses = async () => {
        try {
          const res = await fetch(`http://localhost:5000/courses/${courseId}`);
          if (!res.ok) throw new Error("Failed to fetch courses");
          const data: Course = await res.json();
          setCourses(data);
        } catch (err) {
          toast({
            title: "Erro",
            description: "Falha ao buscar cursos.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      };

      fetchCourses();
    }
  }, [isOpen, courseId]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mt={4}>
          Certeza que deseja deletar este curso ?
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{course?.description}</Text>
        </ModalBody>
        <Flex justifyContent="flex-end">
          <ModalFooter>
            <ModalFooter>
              <Button colorScheme="red" onClick={handleDeleteCourse}>
                Deletar
              </Button>
            </ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
