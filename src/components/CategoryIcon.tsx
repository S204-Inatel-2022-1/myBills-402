import { FcDebt, } from 'react-icons/fc';
import { MdFastfood, MdSportsBar, MdEmojiTransportation, MdCancel, } from 'react-icons/md';
import { GiClothes, } from 'react-icons/gi';
import { FaPills, } from 'react-icons/fa';
import { BsFillHouseFill, BsThreeDots } from 'react-icons/bs';
import { IoMdSchool, } from 'react-icons/io';
import { Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';


export function CategoryIcon({ category }: { category: string }) {
    function BaseIcon({ icon }: { icon: IconType }) {
        return (
            <Icon fontSize="24"  as={icon} />
        )
    }

    switch (category) {
        case "food":
            return <BaseIcon icon={MdFastfood} />;
        case "debt":
            return <BaseIcon icon={FcDebt} />;
        case "clothing":
            return <BaseIcon icon={GiClothes} />;
        case "entertainment":
            return <BaseIcon icon={MdSportsBar} />;
        case "health":
            return <BaseIcon icon={FaPills} />;
        case "house":
            return <BaseIcon icon={BsFillHouseFill} />;
        case "transport":
            return <BaseIcon icon={MdEmojiTransportation} />;
        case "education":
            return <BaseIcon icon={IoMdSchool} />;
        case "other":
            return <BaseIcon icon={BsThreeDots} />;
    }

    return <MdCancel />;
}