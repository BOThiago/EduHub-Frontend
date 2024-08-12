import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  InputLeftElement,
  Icon,
  InputGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiFile } from "react-icons/fi";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchCourses: () => Promise<void>;
}

export default function CreateCourseModal({
  isOpen,
  onClose,
  refetchCourses,
}: CreateCourseModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [end_date, setEndDate] = useState("");
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const toast = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    e.target.files = null;
    if (e.target.files) {
      setVideoFiles(Array.from(e.target.files));
    }
  };

  const handleCreateCourse = async () => {
    try {
      const formData = new FormData();
      formData.append("course[title]", title);
      formData.append("course[description]", description);
      formData.append("course[end_date]", end_date);
      videoFiles.forEach((file, index) => {
        formData.append(
          `course[course_files_attributes][${index}][name]`,
          file.name
        );
        formData.append(
          `course[course_files_attributes][${index}][file]`,
          file
        );
      });

      const res = await fetch("http://localhost:5000/courses", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create course");

      refetchCourses();
      onClose();

      toast({
        title: "Curso criado.",
        description: "O curso foi criado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Falha ao criar o curso.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mt={4}>Criar novo curso</ModalHeader>
        <ModalCloseButton />
        <ModalBody gap={2}>
          <FormControl id="title" isRequired>
            <FormLabel>Título</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
            />
          </FormControl>
          <FormControl id="description" isRequired>
            <FormLabel>Descrição</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição"
            />
          </FormControl>
          <FormControl id="endDate" isRequired>
            <FormLabel>Data de Término</FormLabel>
            <Input
              type="date"
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormControl>
          <FormControl id="videos" isRequired>
            <FormLabel>Suba os Vídeos</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FiFile} />}
              />
              <Input
                id="file-uploader"
                type="file"
                accept="video/*"
                multiple
                onChange={handleFileChange}
                // onClick={() => inputRef.current && inputRef.current.click()}
              />
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={handleCreateCourse}>
            Criar curso
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
