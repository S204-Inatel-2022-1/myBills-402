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
} from "@chakra-ui/react";
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";
import { useState } from "react";
import { SelectorButton } from "./SelectorButton";
import { IoTrashOutline } from "react-icons/io5";
import { MdSaveAlt } from "react-icons/md";
import { CurrencyInput } from "./CurrencyInput";

type EditTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function EditTransactionModal({
  isOpen,
  onClose,
}: EditTransactionModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isDeposit, setIsDeposit] = useState(true);

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
                onClick={() => setIsDeposit(!isDeposit)}
              />
              <SelectorButton
                color="red.500"
                icon={BsArrowDownCircle}
                label="Saída"
                isActive={!isDeposit}
                onClick={() => setIsDeposit(!isDeposit)}
              />
            </HStack>
            <Input placeholder="Categoria" bg="#F4F5F6" p="24px" />
          </Stack>
        </ModalBody>

        <ModalFooter gap="8px">
          <Button
            w="50%"
            bg="green.500"
            color="white"
            leftIcon={<MdSaveAlt />}
            p="24px"
            onClick={() => {
              console.log(name);
              console.log(price);
            }}
          >
            Salvar
          </Button>

          <Button
            w="50%"
            bg="red.500"
            color="white"
            leftIcon={<IoTrashOutline />}
            p="24px"
            onClick={() => {
              console.log(name);
              console.log(price);
            }}
          >
            Deletar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
