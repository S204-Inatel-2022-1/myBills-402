import {
  Flex,
  IconButton,
  Tag,
  TagLabel,
  TagLeftIcon,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { BiEditAlt } from "react-icons/bi";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { getCategory } from "../utils/categories";
import { hex2rgba } from "../utils/hex2rgba";
import { CategoryIcon } from "./CategoryIcon";

type Transaction = {
  id: string;
  authorId: string;
  name: string;
  price: number;
  isDeposit: boolean;
  category: string;
  createdAt: Timestamp;
};

type TransactionItemProps = {
  transaction: Transaction;
  onSelectTransaction: (p: Transaction) => void;
};

export function TransactionItem({
  transaction,
  onSelectTransaction,
}: TransactionItemProps) {
  return (
    <Tr key={transaction.id} boxShadow="md" bgColor="white">
      <Td>
        <Flex align="center">
          <CategoryIcon category={transaction.category}  />
          <Text ml="0.5rem">{getCategory(transaction.category)}</Text>
        </Flex>
      </Td>
      <Td color="gray.300">
        {transaction.createdAt.toDate().toLocaleDateString()}
      </Td>
      <Td>{transaction.name}</Td>
      <Td isNumeric>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(transaction.price)}
      </Td>
      <Td py="0">
        {transaction.isDeposit ? (
          <Tag
            size="lg"
            variant="subtle"
            borderWidth="1px"
            borderColor="green.500"
            bg={hex2rgba("03B252", 0.1)}
            color="green.500"
          >
            <TagLeftIcon boxSize="1rem" as={BsArrowUpCircle} />
            <TagLabel>Depósito</TagLabel>
          </Tag>
        ) : (
          <Tag
            size="lg"
            variant="subtle"
            borderWidth="1px"
            borderColor="red.500"
            bg={hex2rgba("DC1637", 0.1)}
            color="red.500"
          >
            <TagLeftIcon boxSize="12px" as={BsArrowDownCircle} />
            <TagLabel>Retirada</TagLabel>
          </Tag>
        )}
      </Td>
      <Td px="1rem">
        <IconButton
          onClick={() => onSelectTransaction(transaction)}
          borderRadius="50%"
          color="red.500"
          fontSize="1.2rem"
          bg="transparent"
          aria-label="edit transaction"
          icon={<BiEditAlt />}
        />
      </Td>
    </Tr>
  );
}
