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
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";
import { useState } from "react";
import { SelectorButton } from "./SelectorButton";
import { IoTrashOutline } from "react-icons/io5";
import { MdSaveAlt } from "react-icons/md";
import { CurrencyInput } from "./CurrencyInput";
import { deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { toast } from "react-toastify";
import { categories } from "../utils/categories";

type Transaction = {
  id: string;
  authorId: string;
  name: string;
  price: number;
  isDeposit: boolean;
  category: string;
  createdAt: Timestamp;
};

type EditTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
};

export function EditTransactionModal({
  isOpen,
  onClose,
  transaction,
}: EditTransactionModalProps) {
  const [name, setName] = useState(transaction.name);
  const [price, setPrice] = useState(String(transaction.price));
  const [isDeposit, setIsDeposit] = useState(transaction.isDeposit);
  const [category, setCategory] = useState(transaction.category);
  const formatToNumber = (s: string) => Number(s.replace(",", "."));

  async function handleEditTransaction() {
    const transactionRef = doc(db, `transactions/${transaction?.id}`);
    try {
      await updateDoc(transactionRef, {
        name,
        price: formatToNumber(price),
        isDeposit,
        category,
      });
      toast.success("Transação editada com sucesso");
    } catch (e) {
      toast.error("Erro ao editar sua transação");
    }
    onClose();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCategory(event.target.value);
  }

  async function handleDeleteTransaction() {
    const transactionRef = doc(db, `transactions/${transaction?.id}`);

    try {
      await deleteDoc(transactionRef);
      toast.success("Transação deletada com sucesso");
    } catch (e) {
      toast.error("Erro ao deletar sua transação");
    }
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="10px">
        <ModalHeader>
          <Text textAlign="center">Editar Transação</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack gap="8px">
            <Input
              placeholder="Nome"
              bg="white.300"
              p="24px"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
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
            <Select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setCategory(e.target.value)
              }
              bg="white.300"
              h="48px"
              data-testid="select"
              value={category}
              _focus={{
                borderBottom: "2px solid #DC1637",
              }}
            >
              {categories.map(({ id, label, value }) => (
                <option key={id} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </Stack>
        </ModalBody>

        <ModalFooter gap="8px">
          <Button
            w="50%"
            bg="green.500"
            color="white"
            leftIcon={<MdSaveAlt />}
            p="24px"
            onClick={handleEditTransaction}
          >
            Salvar
          </Button>

          <Button
            w="50%"
            bg="red.500"
            color="white"
            leftIcon={<IoTrashOutline />}
            p="24px"
            onClick={handleDeleteTransaction}
          >
            Deletar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
