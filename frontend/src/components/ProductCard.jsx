import {
  // ...other imports
  Text,
  //   useDisclosure,
  //   useToast,
  VStack,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Icon,
  useDisclosure,
  //   useColorModeValue,
} from "@chakra-ui/react";

import { useColorModeValue } from "./ui/color-mode";

// import { useProductStore } from "../store/product.js";
// import { useState } from "react";

// ✅ lucide-react icons
import { Pencil, Trash2 } from "lucide-react";
import { CiTrash } from "react-icons/ci";
import useProductStore from "../store/product";
import toast from "react-hot-toast";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

const ProductCard = ({ product }) => {
  //   const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct, updateProduct } = useProductStore();
  //   const toast = useToast();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    if (!success) {
      throw new Error(message || "Something went wrong!");
    }
    return message || "Product deleted successfully!";
  };

  //   const handleUpdateProduct = async (pid, updatedProduct) => {
  //     const { success, message } = await updateProduct(pid, updatedProduct);
  //     onClose();

  //     toast({
  //       title: success ? "Success" : "Error",
  //       description: success ? "Product updated successfully" : message,
  //       status: success ? "success" : "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            onClick={onOpen}
            colorScheme="blue"
            aria-label="Edit product"
          >
            <Pencil size={18} />
          </IconButton>
          <IconButton
            colorScheme="red"
            aria-label="Delete product"
            _hover={{ bg: "red.500", color: "white" }}
            onClick={() => {
              toast.promise(handleDeleteProduct(product._id), {
                loading: "Deleting...",
                success: "Product deleted successfully!",
                error: "Could not delete product",
              });
            }}
          >
            <Trash2 size={"18px"} strokeWidth={1.75} />
          </IconButton>
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Product Name" />
            <Input placeholder="Product Price" />
            <Input placeholder="Product Image URL" />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              //   onClick={updateProduct}
              //   onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
