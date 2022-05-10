import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Select,
} from "@chakra-ui/react";
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";
import { useState } from "react";
import { SelectorButton } from "./SelectorButton";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import { CurrencyInput } from "./CurrencyInput";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { toast } from "react-toastify";
import { categories } from "../utils/categories";

type NewTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Transaction = {
  authorId: string;
  name: string;
  price: number;
  isDeposit: boolean;
  category: string;
  createdAt: Timestamp;
};


export function NewTransactionModal({
  isOpen,
  onClose,
}: NewTransactionModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isDeposit, setIsDeposit] = useState(true);
  const [category, setCategory] = useState("food");
  const { user } = useFirebaseAuth();
  const formatToNumber = (s: string) => Number(s.replace(",", "."));

  async function handleCreateTransaction() {
    if (!name.trim() || !price) {
      return;
    }

    try {
      await addDoc(collection(db, "transactions"), {
        authorId: user?.id,
        name,
        price: formatToNumber(price),
        isDeposit,
        category: category || "other",
        createdAt: Timestamp.now(),
      } as Transaction);

      setName("");
      setPrice("");
      setIsDeposit(true);
      toast.success("Transação adicionada com sucesso");
    } catch (e) {
      toast.error("Erro ao criar sua transação");
      setName("");
      setPrice("");
      setIsDeposit(true);
    }
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="10px">
        <ModalHeader>
          <Text textAlign="center">Cadastrar Transação</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack gap="8px">
            <Input
              placeholder="Nome"
              bg="white.200"
              p="24px"
              value={name}
              onChange={(e) => setName(e.target.value)}
              _focus={{
                borderBottom: "2px solid #DC1637",
              }}
            />
            <CurrencyInput data={price} setData={setPrice} />
            <HStack w="100%">
              <SelectorButton
                color="green.500"
                icon={BsArrowUpCircle}
                label="Entrada"
                isActive={isDeposit}
                onClick={() => setIsDeposit(true)}
              />
              <SelectorButton
                color="red.500"
                icon={BsArrowDownCircle}
                label="Saída"
                isActive={!isDeposit}
                onClick={() => setIsDeposit(false)}
              />
            </HStack>
            <Select placeholder='Selecione a categoria'
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.value}
                >
                  {category.label}
                </option>
              ))}
            </Select>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            w="100%"
            bg="red.500"
            color="white"
            p="24px"
            _hover={{
              filter: "brightness(0.9)",
            }}
            onClick={handleCreateTransaction}
          >
            Cadastrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
