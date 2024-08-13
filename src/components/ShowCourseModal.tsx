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
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import { Course } from "../types/courses.types";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function ShowCourseModal({
  isOpen,
  onClose,
  courseId,
}: {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
}) {
  const [course, setCourses] = useState<Course>();
  const toast = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/courses/${courseId}`
        );
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data: Course = await res.json();
        setCourses(data);
      } catch (err) {
        toast({
          title: "Erro",
          description: "Falha ao encontrar o curso.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchCourses();
  }, [courseId]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mt={4}>{course?.title}</ModalHeader>
        <ModalCloseButton />
        {course?.course_files && course.course_files.length > 0 ? (
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap={4}
          >
            {course.course_files.map((file, index) => (
              <Flex
                key={index}
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                gap={4}
                mb={4}
              >
                <Text maxW="80%" fontWeight="bold">
                  {file.name}
                </Text>
                <ReactPlayer
                  width={300}
                  height={165}
                  controls={true}
                  url={`${import.meta.env.VITE_API_URL}${file.file_url}`}
                />
              </Flex>
            ))}
          </Flex>
        ) : (
          <Flex
            width="full"
            height={165}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontWeight="bold">Esse curso não possui vídeos</Text>
          </Flex>
        )}
        <ModalBody>
          <FormLabel>Descrição</FormLabel>
          <Text>{course?.description}</Text>
        </ModalBody>
        <ModalBody>
          <FormLabel>Data de término</FormLabel>
          <Text>{course?.end_date}</Text>
        </ModalBody>
        <ModalBody>
          <FormLabel>Espaço ocupado</FormLabel>
          <Text>{course?.total_size_in_mb} MB</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Sair</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
