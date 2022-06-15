import { Flex, Text, Icon, Spacer } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

type SummaryBoxProps = {
  title: string;
  value: number;
  iconColor: string;
  bgColor: string;
  textColor: string;
  icon: IconType;
};

export function SummaryBox({
  title,
  value,
  iconColor,
  bgColor,
  textColor,
  icon,
}: SummaryBoxProps) {
  return (
    <Flex
      flexDir={"column"}
      bg={bgColor}
      w={{ sm: "100%", md: "150px" }}
      h="150px"
      borderRadius="16px"
      padding="8px"
      shadow="xl"
    >
      <Icon as={icon} fontSize="50" color={iconColor} />
      <Spacer />
      <Text fontWeight="light" fontSize="16px" color={textColor}>
        {title}
      </Text>
      <Text fontWeight="semiBold" fontSize="20px" color={textColor}>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value)}
      </Text>
    </Flex>
  );
}
