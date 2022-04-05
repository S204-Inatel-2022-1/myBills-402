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

type NewTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function NewTransactionModal({
  isOpen,
  onClose,
}: NewTransactionModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [isDeposit, setIsDeposit] = useState(true);

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
              bg="#F4F5F6"
              p="24px"
              value={name}
              onChange={(e) => setName(e.target.value)}
              _focus={{
                borderBottom: "2px solid #DC1637",
              }}
            />
            <Input
              placeholder="Preço"
              bg="#F4F5F6"
              p="24px"
              value={price ?? ""}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              type="number"
              _focus={{
                borderBottom: "2px solid #DC1637",
              }}
            />
            <HStack w="100%">
              <SelectorButton
                color="#03B252"
                icon={BsArrowUpCircle}
                label="Entrada"
                isActive={isDeposit}
                onClick={() => setIsDeposit(!isDeposit)}
              />
              <SelectorButton
                color="#DC1637"
                icon={BsArrowDownCircle}
                label="Saída"
                isActive={!isDeposit}
                onClick={() => setIsDeposit(!isDeposit)}
              />
            </HStack>
            <Input placeholder="Categoria" bg="#F4F5F6" p="24px" />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            w="100%"
            bg="#DC1637"
            color="white"
            p="24px"
            onClick={() => {
              console.log(name);
              console.log(price);
            }}
          >
            Cadastrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
