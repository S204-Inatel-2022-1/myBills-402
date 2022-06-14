import { Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger as OrigPopoverTrigger,
  Select,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { useTransactions } from "../contexts/TransactionsContext";
import { capitalizeFirstLetter } from "../utils/capitalizeFirtsLetter";

const PopoverTrigger: React.FC<{
  children: React.ReactNode;
}> = OrigPopoverTrigger;

export function Header() {
  const { user, handleLogout } = useFirebaseAuth();
  const { handleSelectDate, availableDates } = useTransactions();

  return (
    <Flex
      as="nav"
      padding={5}
      w="100%"
      bg="gray.900"
      justify="space-between"
      color="white"
      shadow="md"
      position="relative"
    >
      <Image
        src="/mybills.svg"
        w={["150px", "250px", "250px"]}
        alt="MyBills"
        mb={5}
        ml="1rem"
      />

      <Select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleSelectDate(e.target.value)
        }
        w="300px"
        justifySelf="center"
        color="white"
        bg="gray.900"
        translateX={10}
      >
        <option value="all" style={{ color: "black" }}>
          Desde o início
        </option>
        {availableDates?.map((date) => (
          <option
            style={{ color: "black" }}
            value={`${date.month}-${date.year}`}
            key={`${date.month}-${date.year}`}
          >
            <>
              {capitalizeFirstLetter(
                new Date(date.year, date.month).toLocaleString("default", {
                  month: "long",
                })
              )}{" "}
              de {date.year}
            </>
          </option>
        ))}
      </Select>
      <Popover>
        <PopoverTrigger>
          <Avatar name={user?.name} cursor="pointer" src={user?.avatar} />
        </PopoverTrigger>
        <PopoverContent
          mr="16px"
          bg="white"
          _focus={{
            outline: "none",
          }}
        >
          <PopoverBody d="flex" flexDir="row" py="1rem">
            <Avatar name={user?.name} src={user?.avatar} />
            <Stack ml="1rem" justifyContent="center">
              <Text fontSize="lg" fontWeight="bold" color="#1B1B1F">
                Olá, {user?.name}
              </Text>
              <Text fontSize="lg" color="#1B1B1F">
                {user?.email}
              </Text>
            </Stack>
          </PopoverBody>
          <PopoverFooter
            cursor="pointer"
            borderBottomRadius="10px"
            bg="red.500"
            onClick={handleLogout}
            d="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
            gap="1rem"
          >
            Sair
            <Icon as={MdLogout} />
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
