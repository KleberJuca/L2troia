import { ShopItem } from '../types/shop';

export const items: ShopItem[] = [
  {
    id: '1',
    name: 'Dark Crystal Sword',
    category: 'weapons',
    price: 100,
    image: '/images/items/dark-crystal-sword.jpg',
    description: 'Uma poderosa espada feita de cristal negro',
    stats: 'P.Atk: 232 | M.Atk: 132',
  },
  {
    id: '2',
    name: 'Blue Wolf Armor',
    category: 'armor',
    price: 150,
    image: '/images/items/blue-wolf-armor.jpg',
    description: 'Armadura lendária do Lobo Azul',
    stats: 'P.Def: 198 | M.Def: 98',
  },
  {
    id: '3',
    name: 'Black Ore Ring',
    category: 'accessories',
    price: 80,
    image: '/images/items/black-ore-ring.jpg',
    description: 'Anel forjado com minério negro raro',
    stats: 'M.Def: 48 | MP: +21',
  },
  {
    id: '4',
    name: 'Greater Healing Potion',
    category: 'consumables',
    price: 5,
    image: '/images/items/healing-potion.jpg',
    description: 'Restaura uma grande quantidade de HP',
    stats: 'Recupera 500 HP',
  },
  {
    id: '5',
    name: 'Baby Dragon',
    category: 'pets',
    price: 300,
    image: '/images/items/baby-dragon.jpg',
    description: 'Um filhote de dragão leal e poderoso',
    stats: 'P.Atk: 100 | M.Atk: 100',
  },
];