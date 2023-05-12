'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';


import Container from "../Container";
import CategoryBox from '../CategoryBox';

export const categories = [
    {
      label: '沙滩',
      icon: TbBeach,
      description: 'This property is close to the beach!',
    },
    {
      label: '乡野',
      icon: TbMountain,
      description: 'This property is in the countryside!'
    },
    {
      label: '岛屿',
      icon: GiIsland,
      description: 'This property is on an island!'
    },
    {
      label: '湖泊',
      icon: GiBoatFishing,
      description: 'This property is near a lake!'
    },
    {
      label: '滑雪',
      icon: FaSkiing,
      description: 'This property has skiing activies!'
    },
    {
      label: '城堡',
      icon: GiCastle,
      description: 'This property is an ancient castle!'
    },
    {
      label: '洞穴',
      icon: GiCaveEntrance,
      description: 'This property is in a spooky cave!'
    },
    {
      label: '露营',
      icon: GiForestCamp,
      description: 'This property offers camping activities!'
    },
    {
      label: '冰雪',
      icon: BsSnow,
      description: 'This property is in arctic environment!'
    },
    {
      label: '沙漠',
      icon: GiCactus,
      description: 'This property is in the desert!'
    }
  ]
  
const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathName = usePathname();

    const isMainPage = pathName === "/";
    if (! isMainPage){
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {
                    categories.map((itme)=>(
                        <CategoryBox key={itme.label} label={itme.label} selected={category===itme.label} icon={itme.icon} />
                    ))
                }
            </div>
        </Container>
    );
}

export default Categories;