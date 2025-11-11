import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import Header from '@/components/sections/Header';
import HomeSection from '@/components/sections/HomeSection';
import CatalogSection from '@/components/sections/CatalogSection';
import ContentSections from '@/components/sections/ContentSections';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  composition: string;
  image: string;
}

const categories = [
  { id: 'meat', name: 'Мясо', icon: 'Beef' },
  { id: 'sausages', name: 'Колбасы', icon: 'Ham' },
  { id: 'wieners', name: 'Сардельки, сосиски', icon: 'Sandwich' },
  { id: 'semifinished', name: 'Полуфабрикаты', icon: 'Package' },
  { id: 'smoked', name: 'Копчености', icon: 'Flame' },
  { id: 'canned', name: 'Консервы', icon: 'Container' },
  { id: 'dairy', name: 'Молочная продукция', icon: 'Milk' },
  { id: 'cakes', name: 'Торты', icon: 'Cake' },
  { id: 'bread', name: 'Хлеб', icon: 'Wheat' },
  { id: 'pies', name: 'Пироги', icon: 'Cookie' }
];

const products: Product[] = [
  { id: 1, name: 'Говядина премиум', category: 'meat', price: 890, composition: 'Мраморная говядина, 100% натуральное мясо', image: '/placeholder.svg' },
  { id: 2, name: 'Свинина отборная', category: 'meat', price: 650, composition: 'Свежая свинина, без добавок', image: '/placeholder.svg' },
  { id: 16, name: 'Шея свиная с костью', category: 'meat', price: 550, composition: 'Свежая свиная шея, с костью', image: 'https://cdn.poehali.dev/files/20ec70ce-6b98-4d0d-b3a1-5ab7e25d4efa.jpg' },
  { id: 3, name: 'Пельмени домашние', category: 'semifinished', price: 320, composition: 'Говядина, свинина, тесто, специи', image: '/placeholder.svg' },
  { id: 4, name: 'Котлеты куриные', category: 'semifinished', price: 280, composition: 'Филе курицы, лук, специи', image: '/placeholder.svg' },
  { id: 5, name: 'Грудинка восточная в/к в обсыпке', category: 'smoked', price: 745, composition: 'Свиная грудинка в восточной обсыпке, варено-копченая', image: 'https://cdn.poehali.dev/files/6ab8730a-9938-437a-b32f-052ed63ef43f.JPG' },
  { id: 68, name: 'Грудинка купеческая в/к', category: 'smoked', price: 770, composition: 'Свиная грудинка купеческая, варено-копченая', image: 'https://cdn.poehali.dev/files/bc5182bb-8563-4ac8-b151-314af4cef298.JPG' },
  { id: 6, name: 'Грудинка любительская в/к', category: 'smoked', price: 755, composition: 'Свиная грудинка любительская, варено-копченая', image: 'https://cdn.poehali.dev/files/87d0fda3-8869-4d27-b600-4c1c0d34be34.JPG' },
  { id: 7, name: 'Грудинка по-домашнему в/к', category: 'smoked', price: 985, composition: 'Свиная грудинка по-домашнему, варено-копченая', image: 'https://cdn.poehali.dev/files/94026618-54aa-4339-965b-3c6d19acfa12.JPG' },
  { id: 8, name: 'Индейка грудка в/к', category: 'smoked', price: 910, composition: 'Грудка индейки, варено-копченая', image: 'https://cdn.poehali.dev/files/65746c5c-40a3-490c-8d0b-131e933c8fbf.jpg' },
  { id: 9, name: 'Куриная грудка в/к', category: 'smoked', price: 620, composition: 'Грудка куриная, варено-копченая', image: 'https://cdn.poehali.dev/files/1c5117bf-d891-43f8-beb2-0b4c170a0423.jpg' },
  { id: 10, name: 'Куриная голень в/к', category: 'smoked', price: 540, composition: 'Голень куриная, варено-копченая', image: 'https://cdn.poehali.dev/files/5a6566e1-d05f-4d9f-af14-63a6562a57fc.jpg' },
  { id: 11, name: 'Куриное бедро в/к', category: 'smoked', price: 540, composition: 'Бедро куриное, варено-копченое', image: 'https://cdn.poehali.dev/files/dc1e7a5c-eec2-4d99-8d54-94656fec08b2.JPG' },
  { id: 12, name: 'Куриный окорочок в/к', category: 'smoked', price: 540, composition: 'Окорочок куриный, варено-копченый', image: 'https://cdn.poehali.dev/files/72d901d4-52d2-44b2-96cd-c257de66d0ea.JPG' },
  { id: 13, name: 'Ребра свиные в/к', category: 'smoked', price: 520, composition: 'Ребра свиные, варено-копченые', image: 'https://cdn.poehali.dev/files/ba8bd2d7-4918-48a6-ad39-7b940cffb6ad.jpeg' },
  { id: 14, name: 'Рулет куриный в/к', category: 'smoked', price: 800, composition: 'Рулет куриный, варено-копченый', image: 'https://cdn.poehali.dev/files/be2cef10-67ca-475b-9e8c-8ebcd1a36d5a.JPG' },
  { id: 15, name: 'Сало белорусское', category: 'smoked', price: 860, composition: 'Сало белорусское с прослойкой, специи', image: 'https://cdn.poehali.dev/files/84dafda9-6ede-4f2d-ac68-15c4dfcabf65.JPG' },
  { id: 17, name: 'Свинина в/к в д/обсыпке', category: 'smoked', price: 890, composition: 'Свинина варено-копченая в обсыпке', image: 'https://cdn.poehali.dev/files/3e8e522c-d468-4a47-810f-355f1e673791.JPG' },
  { id: 18, name: 'Свинина в/к', category: 'smoked', price: 875, composition: 'Свинина варено-копченая', image: 'https://cdn.poehali.dev/files/de348111-621a-42b1-bb8e-dd1f61d63138.JPG' },
  { id: 19, name: 'Уши свиные в/к', category: 'smoked', price: 380, composition: 'Уши свиные, варено-копченые', image: 'https://cdn.poehali.dev/files/13e4f9b3-58d9-4e0e-8981-83c959e13b0d.JPG' },
  { id: 20, name: 'Шпик по-домашнему в/к', category: 'smoked', price: 710, composition: 'Шпик по-домашнему, варено-копченый', image: 'https://cdn.poehali.dev/files/bf961d27-301e-45e2-8bf4-794980a8f00b.JPG' },
  { id: 21, name: 'Шпик свиной 4+см соленый в паприке', category: 'smoked', price: 700, composition: 'Шпик свиной соленый с паприкой', image: 'https://cdn.poehali.dev/files/0e03753e-2270-41b6-8a5e-8d127bd37ae6.JPG' },
  { id: 65, name: 'Шпик свиной 4+см соленый в перце', category: 'smoked', price: 700, composition: 'Шпик свиной соленый с перцем', image: 'https://cdn.poehali.dev/files/f0b13f2d-dc90-4a1f-a264-8385a1efc99a.JPG' },
  { id: 66, name: 'Шпик свиной 4+см соленый с чесноком', category: 'smoked', price: 700, composition: 'Шпик свиной соленый с чесноком', image: 'https://cdn.poehali.dev/files/6c320c3c-a376-4a18-943b-e4c49dc02aec.JPG' },
  { id: 67, name: 'Щековина свиная в/к', category: 'smoked', price: 440, composition: 'Щековина свиная, варено-копченая', image: 'https://cdn.poehali.dev/files/2794589e-fc44-4fa3-9e56-b4ea230781af.jpg' },
  { id: 69, name: 'Филей свиной гранд с/к', category: 'smoked', price: 1850, composition: 'Филей свиной, сырокопченый', image: 'https://cdn.poehali.dev/files/a2db5fa1-14e2-4627-a024-d08cb41eec3e.JPG' },
  { id: 70, name: 'Ассорти из субпродуктов 500 г', category: 'canned', price: 350, composition: 'Состав: Сердце свиное, печень свиная, свинина, лук, морковь, перец черный, желатин. Пищевая ценность (100г): белки 13г, жиры 14г. Калорийность 213 ккал. ГОСТ Р 52428. Срок годности не более 3 лет при температуре от 0 до +20°C и влажности 75%', image: 'https://cdn.poehali.dev/files/c637f21d-18e2-4e1f-9a0f-2103d2543ba6.png' },
  { id: 71, name: 'Говядина тушеная в/с 500 г', category: 'canned', price: 530, composition: 'Состав: говядина, соль, лавровый лист, перец черный. Пищевая ценность (100г): белки 15г, жиры 17г. Калорийность 213 ккал. ГОСТ 32125-2013. Срок годности не более 3 лет при температуре от 0 до +20°C и влажности 75%', image: 'https://cdn.poehali.dev/files/ada8cd27-12ae-4004-b19b-5488b40c24d0.png' },
  { id: 72, name: 'Индейка в собственном соку 600 г', category: 'canned', price: 550, composition: 'Состав: индейка, соль, лавровый лист, перец черный. Пищевая ценность (100г): белки 16г, жиры 18г. Калорийность 208 ккал. ГОСТ 32125-2013. Срок годности не более 3 лет при температуре от 0 до +20°C и влажности 75%', image: 'https://cdn.poehali.dev/files/53034230-e365-4114-bc94-7322b91c5061.png' },
  { id: 73, name: 'Каша перловая с говядиной', category: 'canned', price: 350, composition: 'Состав: крупа перловая, говядина, лук, соль, лавровый лист, перец черный. Пищевая ценность (100г): белки 6г, жиры 22г, углеводы 12г. Калорийность 270 ккал. ГОСТ 8286-90. Срок годности 24 месяца при температуре от 0 до +20°C и влажности 75%', image: 'https://cdn.poehali.dev/files/065cf15f-6129-4ed6-b9e2-511502b7e359.png' },
  { id: 74, name: 'Курица в собственном соку 600 г', category: 'canned', price: 375, composition: 'Состав: цыпленок охлажденный, соль, лук, паприка сладкая. Пищевая ценность (100г): белки 15г, жиры 16г. Калорийность 200 ккал. ГОСТ 28589-2014. Срок годности не более 3 лет при температуре от 0 до +20°C и влажности 75%', image: 'https://cdn.poehali.dev/files/7b64bc69-f79d-478a-9146-5cc19cd51b84.png' },
  { id: 75, name: 'Свинина тушеная в/с 500 г', category: 'canned', price: 420, composition: 'Состав: свинина, соль, лавровый лист, перец черный. Пищевая ценность (100г): белки 16г, жиры 18г. Калорийность 213 ккал. ГОСТ 32125-2013. Срок годности не более 3 лет при температуре от 0 до +20°C и влажности 75%', image: 'https://cdn.poehali.dev/files/6e44a7db-ee49-40a1-9d5e-3940a79cee2d.png' },
  { id: 76, name: 'Язык свиной в желе 500 г', category: 'canned', price: 650, composition: 'Состав: язык свиной, лавровый лист, перец черный, желатин. Пищевая ценность (100г): белки 13г, жиры 14г. Калорийность 213 ккал. ГОСТ Р 52428. Срок годности не более 3 лет при температуре от 0 до +20°C и влажности 75%', image: 'https://cdn.poehali.dev/files/a3a1c36a-24ad-41a3-97e6-1351ef25aea6.png' },
  { id: 77, name: 'Язык говяжий в желе 500 г', category: 'canned', price: 750, composition: 'Состав: язык говяжий, лавровый лист, перец черный, желатин. Пищевая ценность (100г): белки 13г, жиры 14г. Калорийность 213 ккал. ГОСТ Р 52428. Срок годности не более 3 лет при температуре от 0 до +20°C и влажности 75%', image: 'https://cdn.poehali.dev/files/54e87092-edcf-4f4e-8b17-a95e583badb4.png' },
  { id: 22, name: 'Варёная к завтраку', category: 'sausages', price: 750, composition: 'Состав: говядина 42%, свинина 29%, мясо куриное 29%, молоко, яйцо, специи (базилик, чеснок, перец белый, мускатный орех, перец черный). Пищевая ценность (100г): белки 14г, жиры 30г, углеводы 3,5г. Калорийность 340 ккал. Срок годности не более 30 суток при температуре от 0 до +6°C и относительной влажности воздуха 75%', image: 'https://cdn.poehali.dev/files/7f8d5b4d-d87c-4c90-92ff-1d8cead74dc8.jpg' },
  { id: 23, name: 'Варёная докторская', category: 'sausages', price: 650, composition: 'Состав: свинина 70%, говядина 25%, яйцо 3%, молоко 2%, соль, сахар. ГОСТ Р 52196-2011. Пищевая ценность (100г): белки не менее 13г, жиры не более 22г. Калорийность 250 ккал. Срок годности при температуре от 0 до +6°C не более 30 суток', image: 'https://cdn.poehali.dev/files/8b1d44b4-3c82-488e-bb99-e3afb4b39ff7.JPG' },
  { id: 24, name: 'Варёная Останкинская', category: 'sausages', price: 650, composition: 'Состав: говядина, свинина, шпик, молоко, соль, сахар, специи (мускатный орех). Пищевая ценность (100г): белки не менее 12,5г, жиры не более 13г. Калорийность 234 ккал. Срок годности при +2-6°C не более 25 суток', image: 'https://cdn.poehali.dev/files/a4c86f8e-a853-4ec5-ba30-4b1e7be64e41.JPG' },
  { id: 25, name: 'Варёная Ветчинная', category: 'sausages', price: 850, composition: 'Состав: свинина 98%, соль, специи. Пищевая ценность (100г): белки не менее 16г, жиры не более 18г. Калорийность 230 ккал. Срок годности при температуре от 0 до +6°C не более 30 суток', image: 'https://cdn.poehali.dev/files/b8cb5c34-1e15-4e82-b2e0-fde914a2eeef.JPG' },
  { id: 26, name: 'Варёная вкусная', category: 'sausages', price: 800, composition: 'Состав: говядина, свинина, шпик, соль, сахар, специи. Пищевая ценность (100г): белки 13г, жиры 30г. Калорийность 320 ккал. Срок годности не более 15 суток при температуре от 0 до +6°C и относительной влажности воздуха 75%', image: 'https://cdn.poehali.dev/files/f7cf7e6f-c9cd-4b71-b74d-0c9df9c6db6c.JPG' },
  { id: 27, name: 'Варёная городская', category: 'sausages', price: 750, composition: 'Состав: говядина 40%, свинина 30%, шпик 25%, специи. Пищевая ценность (100г): белки 13г, жиры не более 28г. Калорийность 300 ккал. Срок годности при +2-6°C 30 суток', image: 'https://cdn.poehali.dev/files/a00cf1d7-6fba-479c-bae7-6d7e49281c05.JPG' },
  { id: 28, name: 'Варёная летняя', category: 'sausages', price: 650, composition: 'Состав: говядина, свинина, шпик, вода, соль, сахар, чеснок. Пищевая ценность (100г): белки 37г, жиры 30г. Калорийность 310 ккал. Срок годности при +2-6°C не более 30 суток', image: 'https://cdn.poehali.dev/files/e8d1fb4c-a656-45f5-9e3b-f27066326cca.JPG' },
  { id: 29, name: 'Варёная любительская', category: 'sausages', price: 800, composition: 'Состав: свинина 75%, шпик 25%, специи (мускатный орех, перец чёрный). Пищевая ценность (100г): белки не менее 12г, жиры не более 28г. Калорийность 300 ккал. Срок годности не более 30 суток при температуре от 0 до +6°C и относительной влажности воздуха 75%', image: 'https://cdn.poehali.dev/files/84989290-eab3-4918-98cd-484a7382da26.JPG' },
  { id: 30, name: 'Варёная русская', category: 'sausages', price: 880, composition: 'Состав: говядина, свинина, шпик, вода, соль, чеснок, перец чёрный, перец белый, мускатный орех. Пищевая ценность (100г): белки 10г, жиры не более 30г. Калорийность 310 ккал. Срок годности при температуре от 0 до +6°C не более 30 суток', image: 'https://cdn.poehali.dev/files/259add01-0a54-4aff-8e76-859d0ac5aa2e.JPG' },
  { id: 31, name: 'Варёная русская ЭКО', category: 'sausages', price: 950, composition: 'Состав: говядина 50%, свинина 25%, шпик 25%, соль поваренная, сахар-песок, натуральные вкусо-ароматические добавки, краситель натуральный (фруктовые и овощные концентраты), специи. ГОСТ Р 52196-2011. Пищевая ценность (100г): белки 10г, жиры не более 30г. Калорийность 310 ккал. Срок годности при температуре от 0 до +6°C и относительной влажности воздуха 30 суток', image: 'https://cdn.poehali.dev/files/e36e3baf-de17-4b2d-a3bf-8d09eb3038b9.JPG' },
  { id: 32, name: 'Варёная докторская ЭКО', category: 'sausages', price: 950, composition: 'Состав: говядина 27%, свинина 73%, соль поваренная, молоко, яйцо, сахар-песок, натуральные вкусо-ароматические добавки, краситель натуральный (фруктовые и овощные концентраты), специи. Пищевая ценность (100г): белки 12г, жиры не более 20,2г. Калорийность 228 ккал. Срок годности при температуре от 0 до +6°C и относительной влажности воздуха 30 суток', image: 'https://cdn.poehali.dev/files/440629f0-6ee7-4de1-935b-46ecb5714fd7.JPG' },
  { id: 33, name: 'Варёная молочная', category: 'sausages', price: 800, composition: 'Состав: говядина, свинина, вода, молоко коровье цельное, соль, сахар, яйцо куриное, специи. ГОСТ Р 52196-2011. Пищевая ценность (100г): белки не менее 11г, жиры не более 22г. Калорийность 242 ккал. Срок годности при температуре от +2 до +6°C 30 суток', image: 'https://cdn.poehali.dev/files/392bb93f-a0d6-45ca-b57c-2417fa76a629.jpg' },
  { id: 34, name: 'Варёная ливерная', category: 'sausages', price: 450, composition: 'Состав: свинина, говядина, щековина, печень, бульон, лук, соль, сахар, специи. ГОСТ 54646-2011. Пищевая ценность (100г): белки 11г, жиры 44г, углеводы 1,0г. Калорийность 444 ккал. Срок годности не более 15 суток при температуре от 0 до +6°C и относительной влажности воздуха 75%', image: 'https://cdn.poehali.dev/files/39bcc60c-818a-4c6f-a088-aa3f9a6a966e.jpg' },
  { id: 35, name: 'П/К говяжья', category: 'sausages', price: 1200, composition: 'Состав: говядина, свинина, вода, соль, чеснок, перец черный, мускатный орех. Пищевая ценность (100г): белки 15г, жиры 49г. Калорийность 501 ккал. Срок годности при +2-6°C 15 суток, упакованных под вакуумом 25 суток', image: 'https://cdn.poehali.dev/files/be42a7c2-0515-448c-a487-4911a3491d10.JPG' },
  { id: 36, name: 'П/К деревенская', category: 'sausages', price: 850, composition: 'Состав: свинина п/ж, соль, специи. Пищевая ценность (100г): белки 14г, жиры 45г, углеводы 0г. Калорийность 470 ккал. Срок годности при +2-6°C упакованных под вакуумом 25 суток', image: 'https://cdn.poehali.dev/files/0786db05-2f3e-48d1-a603-522fc5fb42e3.JPG' },
  { id: 37, name: 'П/К свиная', category: 'sausages', price: 850, composition: 'Состав: свинина, соль, вода, мускатный орех, перец душистый, перец черный, чеснок. ТУ10.13.14-006. Пищевая ценность (100г): белки 14г, жиры 45г, углеводы 0г. Калорийность 461 ккал. Срок годности при +2-4°C 15 суток, в вакуумной упаковке 25 суток', image: 'https://cdn.poehali.dev/files/5b7576bc-4983-43f4-8fdc-e59fa3f29021.JPG' },
  { id: 38, name: 'П/К заволжская', category: 'sausages', price: 850, composition: 'Состав: свинина 50%, говядина 30%, шпик 20%, сахар, специи. Пищевая ценность (100г): белки не менее 14г, жиры не более 45г. Калорийность 481 ккал. Срок годности при +2-4°C 15 суток, упакованных под вакуумом 25 суток', image: 'https://cdn.poehali.dev/files/5a8ad43f-115c-4644-b6b2-4aab54bb13bd.JPG' },
  { id: 39, name: 'П/К куриная', category: 'sausages', price: 750, composition: 'Состав: мясо кур, вода, крахмал, соль, специи (перец, чеснок). Пищевая ценность (100г): белки 23,5г, жиры 20,5г, углеводы 0,9г. Калорийность 282 ккал. Срок годности при +2-6°C упакованных под вакуумом 30 суток', image: 'https://cdn.poehali.dev/files/034fee87-9ebd-4aa1-8ebc-02c2cbc87881.JPG' },
  { id: 40, name: 'П/К городецкая', category: 'sausages', price: 880, composition: 'Состав: свинина, говядина, шпик хребтовой, чеснок, перец черный, перец белый, перец зеленый. Пищевая ценность (100г): белки 19г, жиры 41г. Калорийность 458 ккал. Срок годности при +2-6°C 15 суток, упакованных под вакуумом 30 суток', image: 'https://cdn.poehali.dev/files/1801fc5e-f826-4edc-9121-5aa9fd83e428.JPG' },
  { id: 41, name: 'П/К куриная с сердцем', category: 'sausages', price: 750, composition: 'Состав: мясо кур, сердце свинное, шпик, вода, крахмал, соль, специи. Пищевая ценность (100г): белки 24г, жиры 19,5г, углеводы 1,2г. Калорийность 453 ккал. Срок годности при +2-6°C не более 15 суток', image: 'https://cdn.poehali.dev/files/f7a075f2-55fc-4f7b-9012-9e9649f96a72.JPG' },
  { id: 42, name: 'П/К домашняя', category: 'sausages', price: 850, composition: 'Состав: свинина, говядина, вода, соль, сахар, специи (базилик, чеснок, перец белый, мускатный орех, перец черный). Пищевая ценность (100г): белки 14г, жиры 30г, углеводы 3,5г. Калорийность 340 ккал. Срок годности при +2-6°C 15 суток, упакованных под вакуумом 25 суток', image: 'https://cdn.poehali.dev/files/f7261822-8340-4159-8beb-b450a53a37f9.JPG' },
  { id: 43, name: 'П/К дары леса', category: 'sausages', price: 1350, composition: 'Состав: свинина, говядина, вода, соль, сахар, специи (базилик, чеснок, перец белый, мускатный орех, перец черный). Пищевая ценность (100г): белки 14г, жиры 30г, углеводы 3,5г. Калорийность 340 ккал. Срок годности при +2-6°C 15 суток, упакованных под вакуумом 25 суток', image: 'https://cdn.poehali.dev/files/7e9bc21a-2995-4a3a-b42c-1cd551f8239e.JPG' },
  { id: 44, name: 'П/К салями', category: 'sausages', price: 950, composition: 'Состав: говядина, свинина, шпик, соль, перец белый, перец чёрный, чеснок, сахар, усилитель вкуса Е621, антиокислитель. Пищевая ценность (100г): белки 12г, жиры 42г. Калорийность 426 ккал. Срок годности при температуре до +6°C и влажности 75% 15 суток, упакованной под вакуумом 25 суток', image: 'https://cdn.poehali.dev/files/03280dc8-332f-43dc-94ed-050c84c23aa3.JPG' },
  { id: 45, name: 'П/К сервелат элитный', category: 'sausages', price: 1100, composition: 'Состав: говядина, шпик, соль, сахар, перец черный, мускатный орех. Пищевая ценность (100г): белки 15г, жиры 42г, углеводы 3,3г. Калорийность 410 ккал. Срок годности при +2-6°C не более 25 суток', image: 'https://cdn.poehali.dev/files/58d83540-4204-4bf0-a43a-3de331620dd7.JPG' },
  { id: 46, name: 'П/К сервелат особый', category: 'sausages', price: 1100, composition: 'Состав: говядина, шпик, соль, перец черный. Пищевая ценность (100г): белки 9г, жиры 37г, углеводы 5г. Калорийность 453 ккал. Срок годности при +2-6°C не более 25 суток', image: 'https://cdn.poehali.dev/files/8b2313c6-60dd-48ff-b9c8-e23d432a2c9b.JPG' },
  { id: 47, name: 'П/К нижегородская', category: 'sausages', price: 1100, composition: 'Состав: говядина, шпик, соль, сахар, специи. Пищевая ценность (100г): белки не менее 19,1г, жиры не более 36,6г. Калорийность 406 ккал. Срок годности не более 15 суток при температуре до +6°C и влажности 75%, в вакуумной упаковке 25 суток. Упаковано под вакуумом', image: 'https://cdn.poehali.dev/files/18ea2d7c-edd4-425f-913a-f7db368a1770.JPG' },
  { id: 48, name: 'П/К балахнинская', category: 'sausages', price: 880, composition: 'Состав: говядина, свинина, шпик, соль, вода, специи. Пищевая ценность (100г): белки не менее 14г, жиры не более 40,5г. Калорийность 461 ккал. Срок годности не более 15 суток при температуре до +6°C и влажности 75%, в вакуумной упаковке 25 суток. Упаковано под вакуумом', image: 'https://cdn.poehali.dev/files/6308f489-5852-44bd-b21f-65a79356be62.JPG' },
  { id: 49, name: 'П/К сервелат польский', category: 'sausages', price: 850, composition: 'Состав: свинина, соль, перец черный. Пищевая ценность (100г): белки 17г, жиры 35г, углеводы 3,3г. Калорийность 360 ккал. Срок годности при +2-6°C не более 25 суток', image: 'https://cdn.poehali.dev/files/4e49339d-d1d2-484d-98c1-8c86ee67b820.jpg' },
  { id: 50, name: 'П/К шварцвальдская', category: 'sausages', price: 1100, composition: 'Состав: свинина, говядина, шпик, соль, специи (перец зеленый). Пищевая ценность (100г): белки 12г, жиры 46г. Калорийность 462 ккал. Срок годности при +2-6°C 15 суток, в вакуумной упаковке 25 суток. Упаковано под вакуумом', image: 'https://cdn.poehali.dev/files/1ad6cf38-8245-4eed-b218-ca5118827ab8.JPG' },
  { id: 51, name: 'П/К охотничьи', category: 'sausages', price: 850, composition: 'Состав: свинина, говядина, соль, специи. Пищевая ценность (100г): белки 14г, жиры 46г, углеводы 2,4г. Калорийность 455 ккал. Срок годности: при -18°C 6 мес., при -12°C 4 мес., при -10°C 3 мес.', image: 'https://cdn.poehali.dev/files/c15182a7-967a-4032-857e-42ce0f8af290.JPG' },
  { id: 21, name: 'Ветчина куриная', category: 'smoked', price: 620, composition: 'Ветчина из куриного мяса', image: 'https://cdn.poehali.dev/files/7f4e4ddf-5a83-4e70-b6d7-be6a346e88fa.jpg' },
  { id: 52, name: 'Рулет свиной с овощами', category: 'semifinished', price: 540, composition: 'Состав: свинина, овощи, специи. Пищевая ценность (100г): белки 13г, жиры 25г, углеводы 5г. Калорийность 298 ккал. Срок годности при +2-6°C не более 7 суток', image: 'https://cdn.poehali.dev/files/d9ea30fe-e8b2-4eea-abd7-6f48f7f00e74.JPG' },
  { id: 53, name: 'Рулет свиной с грибами', category: 'semifinished', price: 540, composition: 'Состав: свинина, грибы, специи. Пищевая ценность (100г): белки 14г, жиры 23г, углеводы 4г. Калорийность 283 ккал. Срок годности при +2-6°C не более 7 суток', image: 'https://cdn.poehali.dev/files/6c97a33f-6ff7-484a-b3e6-f10e94ac1cb6.JPG' },
  { id: 54, name: 'Рулет из индейки с сыром', category: 'semifinished', price: 700, composition: 'Состав: индейка, сыр, специи. Пищевая ценность (100г): белки 16г, жиры 20г, углеводы 2г. Калорийность 258 ккал. Срок годности при +2-6°C не более 7 суток', image: 'https://cdn.poehali.dev/files/b30fe0f2-2a05-4bfa-95a2-e2c1b5b77a35.JPG' },
  { id: 55, name: 'Сардельки домашние', category: 'wieners', price: 650, composition: 'Состав: свинина, говядина, вода, соль, чеснок, специи. Пищевая ценность (100г): белки 12г, жиры 28г. Калорийность 304 ккал. Срок годности при +2-6°C не более 10 суток, упакованных под вакуумом 15 суток', image: 'https://cdn.poehali.dev/files/ec1f84d6-0e8d-4a78-be3f-7bb66cc25584.JPG' },
  { id: 56, name: 'Сардельки говяжьи', category: 'wieners', price: 650, composition: 'Состав: говядина, вода, соль, специи. Пищевая ценность (100г): белки 13,5г, жиры 20,5г. Калорийность 252 ккал. Срок годности при +2-6°C не более 10 суток, упакованных под вакуумом 15 суток', image: 'https://cdn.poehali.dev/files/2bdd2511-1f6e-482e-a1bf-e35a1ad5b6e7.JPG' },
  { id: 57, name: 'Сардельки свиные', category: 'wieners', price: 750, composition: 'Состав: свинина, шпик, вода, сахар, соль, специи. Пищевая ценность (100г): белки 11г, жиры 20г. Калорийность 244 ккал. Срок годности при +2-6°C не более 10 суток, упакованных под вакуумом 15 суток', image: 'https://cdn.poehali.dev/files/6964441f-02fb-4f33-a93a-4083cc088c64.JPG' },
  { id: 61, name: 'Сардельки сочные', category: 'wieners', price: 450, composition: 'Состав: свинина, шпик, вода, сахар, соль, специи. Пищевая ценность (100г): белки 11г, жиры 20г. Калорийность 244 ккал. Срок годности при +2-6°C не более 10 суток, упакованных под вакуумом 15 суток', image: 'https://cdn.poehali.dev/files/0ed8e054-4cf7-4d61-92ee-7b56b7131d0f.jpg' },
  { id: 58, name: 'Сосиски малютка', category: 'wieners', price: 750, composition: 'Состав: говядина, свинина, курица, шпик, молоко, сливки, яйцо, специи. Пищевая ценность (100г): белки 11г, жиры 25г, углеводы 0,11г. Калорийность 273 ккал. Срок годности при +2-6°C не более 15 суток, упакованных под вакуумом 25 суток', image: 'https://cdn.poehali.dev/files/276003c6-e0de-4477-8727-cd20b6e772c5.JPG' },
  { id: 59, name: 'Сосиски молочные', category: 'wieners', price: 750, composition: 'Состав: говядина, свинина, яйцо, молоко, соль, сахар, специи (перец черный, перец душистый). Пищевая ценность (100г): белки 11г, жиры 28г. Калорийность 269 ккал. Срок годности при +2-6°C не более 15 суток, упакованных под вакуумом 25 суток', image: 'https://cdn.poehali.dev/files/c64b681a-df23-4091-97b1-c27a841a04bc.JPG' },
  { id: 60, name: 'Сосиски сливочные', category: 'wieners', price: 700, composition: 'Состав: говядина, свинина, сливки, вода, соль, сахар. Пищевая ценность (100г): белки 10г, жиры 19г, углеводы 0г. Калорийность 211 ккал. Срок годности при +2-6°C не более 15 суток, упакованных под вакуумом 25 суток', image: 'https://cdn.poehali.dev/files/f682d6d1-0cbc-493a-b1a5-2236e1b08082.JPG' },
  { id: 62, name: 'Сосиски ветчинные куриные', category: 'wieners', price: 650, composition: 'Состав: мясо домашней курицы, вода, соль, чеснок, перец черный, специи. Пищевая ценность (100г): белки 14,2г, жиры 23г, углеводы 0,9г. Калорийность 270 ккал. Срок годности при +2-6°C не более 6 суток, упакованных под вакуумом 15 суток', image: 'https://cdn.poehali.dev/files/b2258414-eb83-4856-b41f-62f184f4f671.jpg' },
  { id: 63, name: 'Сосиски свиные', category: 'wieners', price: 350, composition: 'Состав: свинина, шпик, молоко, яйцо, специи. Пищевая ценность (100г): белки 11г, жиры 25г, углеводы 0,11г. Калорийность 273 ккал. Срок годности при +2-6°C не более 15 суток, упакованных под вакуумом 25 суток', image: 'https://cdn.poehali.dev/files/6f4d3e80-9753-42d9-9a90-8cb87cf7bbe9.jpg' },
  { id: 64, name: 'Шпикачки куриные', category: 'wieners', price: 650, composition: 'Состав: мясо птицы, вода, соль, специи. Пищевая ценность (100г): белки 10,5г, жиры 33,4г. Калорийность 350 ккал. Срок годности при +2-6°C не более 6 суток, упакованных под вакуумом не более 15 суток', image: 'https://cdn.poehali.dev/files/4e9ce517-cf4a-4309-9111-83ed0aa5c7ff.JPG' },
  { id: 7, name: 'Торт "Наполеон"', category: 'cakes', price: 1200, composition: 'Слоеное тесто, заварной крем, сливочное масло', image: '/placeholder.svg' },
  { id: 8, name: 'Торт "Прага"', category: 'cakes', price: 1350, composition: 'Шоколадные коржи, сливки, какао', image: '/placeholder.svg' },
  { id: 9, name: 'Бородинский хлеб', category: 'bread', price: 85, composition: 'Ржаная мука, солод, кориандр', image: '/placeholder.svg' },
  { id: 10, name: 'Багет французский', category: 'bread', price: 95, composition: 'Пшеничная мука, вода, соль, дрожжи', image: '/placeholder.svg' },
  { id: 11, name: 'Пирог с капустой', category: 'pies', price: 180, composition: 'Дрожжевое тесто, капуста, яйца', image: '/placeholder.svg' },
  { id: 12, name: 'Пирог с яблоками', category: 'pies', price: 220, composition: 'Песочное тесто, яблоки, корица, сахар', image: '/placeholder.svg' },
  { id: 17, name: 'Молоко "Вологжанка" 1,5%', category: 'dairy', price: 85, composition: 'Натуральное молоко, 1.5% жирности', image: 'https://cdn.poehali.dev/files/047e7ba0-05f7-4a67-9600-fa056df13b94.jpg' },
  { id: 18, name: 'Творог фермерский', category: 'dairy', price: 280, composition: 'Творог из цельного молока, 9% жирности', image: '/placeholder.svg' },
  { id: 19, name: 'Сметана домашняя', category: 'dairy', price: 150, composition: 'Натуральная сметана, 20% жирности', image: '/placeholder.svg' },
  { id: 20, name: 'Масло сливочное', category: 'dairy', price: 380, composition: 'Сливочное масло, 82.5% жирности', image: '/placeholder.svg' }
];

const reviews = [
  { id: 1, name: 'Елена Иванова', rating: 5, text: 'Отличное качество мяса! Всегда свежее и вкусное. Заказываем постоянно.' },
  { id: 2, name: 'Дмитрий Петров', rating: 5, text: 'Торты просто восхитительные! "Наполеон" - лучший, что я пробовал.' },
  { id: 3, name: 'Ольга Смирнова', rating: 5, text: 'Копчености выше всяких похвал. Грудинка - объедение!' }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const normalizedQuery = searchQuery.toLowerCase().replace(/[\\\/]/g, '');
      filtered = filtered.filter(p => {
        const normalizedName = p.name.toLowerCase().replace(/[\\\/]/g, '');
        const normalizedComposition = p.composition.toLowerCase().replace(/[\\\/]/g, '');
        return normalizedName.includes(normalizedQuery) || normalizedComposition.includes(normalizedQuery);
      });
      
      filtered.sort((a, b) => {
        const aName = a.name.toLowerCase().replace(/[\\\/]/g, '');
        const bName = b.name.toLowerCase().replace(/[\\\/]/g, '');
        const aComp = a.composition.toLowerCase().replace(/[\\\/]/g, '');
        const bComp = b.composition.toLowerCase().replace(/[\\\/]/g, '');
        
        const aNameIndex = aName.indexOf(normalizedQuery);
        const bNameIndex = bName.indexOf(normalizedQuery);
        const aCompIndex = aComp.indexOf(normalizedQuery);
        const bCompIndex = bComp.indexOf(normalizedQuery);
        
        const aInName = aNameIndex !== -1;
        const bInName = bNameIndex !== -1;
        
        if (aInName && !bInName) return -1;
        if (!aInName && bInName) return 1;
        
        if (aInName && bInName) {
          return aNameIndex - bNameIndex;
        }
        
        if (aCompIndex !== -1 && bCompIndex !== -1) {
          return aCompIndex - bCompIndex;
        }
        
        return 0;
      });
    }
    
    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      {activeSection === 'home' && (
        <HomeSection 
          categories={categories}
          onCatalogClick={() => setActiveSection('catalog')}
          onCategorySelect={(categoryId) => setSelectedCategory(categoryId)}
        />
      )}

      {activeSection === 'catalog' && (
        <CatalogSection 
          categories={categories}
          filteredProducts={filteredProducts}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchQuery}
          onCategorySelect={setSelectedCategory}
          onImageClick={setLightboxImage}
        />
      )}

      {(activeSection === 'about' || activeSection === 'reviews' || activeSection === 'contacts') && (
        <ContentSections 
          activeSection={activeSection}
          reviews={reviews}
        />
      )}

      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxImage(null)}>
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setLightboxImage(null)}
          >
            <Icon name="X" size={32} />
          </button>
          <img src={lightboxImage} alt="Увеличенное изображение" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </div>
  );
}
