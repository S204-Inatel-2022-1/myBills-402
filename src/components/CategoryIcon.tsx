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

function BaseIcon({
  icon,
  fontSize = "24",
}: {
  icon: IconType;
  fontSize?: string;
}) {
  return <Icon fontSize={fontSize} color="red.500" as={icon} />;
}

export function CategoryIcon({
  category,
  fontSize,
}: {
  category: string;
  fontSize?: string;
}) {
  switch (category) {
    case "food":
      return <BaseIcon fontSize={fontSize} icon={MdFastfood} />;
    case "debt":
      return <BaseIcon fontSize={fontSize} icon={GiTakeMyMoney} />;
    case "clothing":
      return <BaseIcon fontSize={fontSize} icon={GiClothes} />;
    case "entertainment":
      return <BaseIcon fontSize={fontSize} icon={MdSportsBar} />;
    case "health":
      return <BaseIcon fontSize={fontSize} icon={FaPills} />;
    case "house":
      return <BaseIcon fontSize={fontSize} icon={BsFillHouseFill} />;
    case "transport":
      return <BaseIcon fontSize={fontSize} icon={MdEmojiTransportation} />;
    case "education":
      return <BaseIcon fontSize={fontSize} icon={IoMdSchool} />;
    case "other":
      return <BaseIcon fontSize={fontSize} icon={BsThreeDots} />;
  }

  return <MdCancel />;
}
