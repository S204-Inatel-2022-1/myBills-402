import { Button, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { hex2rgba } from "../utils/hex2rgba";

type SelectorButtonProps = {
  label: string;
  color: string;
  icon: IconType;
  isActive: boolean;
  onClick: () => void;
};

export function SelectorButton({
  color,
  label,
  isActive,
  icon,
  onClick,
}: SelectorButtonProps) {
  return (
    <Button
      flex="1"
      onClick={onClick}
      borderColor={isActive ? color : '#a1a9c1'}
      borderWidth="1px"
      bg={isActive ? hex2rgba(color, 0.1) : "#F4F5F6"}
      p="24px"
      gap="8px"
    >
      <Icon as={icon} color={isActive ? color: '#a1a9c1'} />
      <Text fontSize={14} color={isActive ? color : "#a1a9c1"}>
        {label}
      </Text>
    </Button>
  );
}
