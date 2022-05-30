import {
  MdFastfood,
  MdSportsBar,
  MdEmojiTransportation,
  MdCancel,
} from "react-icons/md";
import { GiClothes, GiTakeMyMoney } from "react-icons/gi";
import { FaPills } from "react-icons/fa";
import { BsFillHouseFill, BsThreeDots } from "react-icons/bs";
import { IoMdSchool } from "react-icons/io";
import { Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

type BaseIconProps = {
  icon: IconType;
  fontSize?: string;
  color?: string;
};

type CategoryIconProps = {
  category: string;
  fontSize?: string;
  color?: string;
};

function BaseIcon({ icon, fontSize = "24", color = "red.500" }: BaseIconProps) {
  return <Icon fontSize={fontSize} color={color} as={icon} />;
}

export function CategoryIcon({ category, fontSize, color }: CategoryIconProps) {
  switch (category) {
    case "food":
      return <BaseIcon fontSize={fontSize} color={color} icon={MdFastfood} />;
    case "debt":
      return (
        <BaseIcon fontSize={fontSize} color={color} icon={GiTakeMyMoney} />
      );
    case "clothing":
      return <BaseIcon fontSize={fontSize} color={color} icon={GiClothes} />;
    case "entertainment":
      return <BaseIcon fontSize={fontSize} color={color} icon={MdSportsBar} />;
    case "health":
      return <BaseIcon fontSize={fontSize} color={color} icon={FaPills} />;
    case "house":
      return (
        <BaseIcon fontSize={fontSize} color={color} icon={BsFillHouseFill} />
      );
    case "transport":
      return (
        <BaseIcon
          fontSize={fontSize}
          color={color}
          icon={MdEmojiTransportation}
        />
      );
    case "education":
      return <BaseIcon fontSize={fontSize} color={color} icon={IoMdSchool} />;
    case "other":
      return <BaseIcon fontSize={fontSize} color={color} icon={BsThreeDots} />;
  }

  return <MdCancel />;
}
