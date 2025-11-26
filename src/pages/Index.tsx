import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
  { id: 'frozen', name: 'Пельмени и манты', icon: 'Snowflake' },
  { id: 'vareniki', name: 'Вареники', icon: 'Cookie' },
  { id: 'chebureki', name: 'Чебуреки и сырники', icon: 'Pizza' },
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
  { id: 3, name: 'Котлеты куриные', category: 'semifinished', price: 280, composition: 'Филе курицы, лук, специи', image: '/placeholder.svg' },
  { id: 101, name: 'Пельмени куриные', category: 'frozen', price: 620, composition: '', image: 'https://cdn.poehali.dev/files/b90574d1-43e5-4fd5-bab8-2212d48ea7b6.JPG' },
  { id: 102, name: 'Пельмени рыбные', category: 'frozen', price: 665, composition: '', image: 'https://cdn.poehali.dev/files/b74b98ea-4500-4615-a597-3e227773be6b.JPG' },
  { id: 103, name: 'Пельмени с бараниной', category: 'frozen', price: 850, composition: '', image: 'https://cdn.poehali.dev/files/88a2854e-e9aa-4176-8922-8b1a577b5d7a.JPG' },
  { id: 104, name: 'Пельмени с индейкой', category: 'frozen', price: 710, composition: '', image: 'https://cdn.poehali.dev/files/d846f587-f657-4960-87e2-3dc20f01e182.JPG' },
  { id: 105, name: 'Манты с говядиной', category: 'frozen', price: 725, composition: '', image: 'https://cdn.poehali.dev/files/fb5e7fc9-5e3e-43a2-8ee5-184a81655d8b.JPG' },
  { id: 106, name: 'Пельмени телячьи', category: 'frozen', price: 800, composition: '', image: 'https://cdn.poehali.dev/files/a49eecec-8d19-4aa7-b87a-1761cb370a4a.JPG' },
  { id: 107, name: 'Пельмени с грибами', category: 'frozen', price: 620, composition: '', image: 'https://cdn.poehali.dev/files/2f602009-b5a2-4656-8291-7d0df54f11e8.JPG' },
  { id: 108, name: 'Пельмени по-домашнему', category: 'frozen', price: 645, composition: '', image: 'https://cdn.poehali.dev/files/ec652e2e-5329-4d77-890e-43237f73fdd8.JPG' },
  { id: 109, name: 'Манты с бараниной', category: 'frozen', price: 725, composition: '', image: 'https://cdn.poehali.dev/files/432fcb87-46ad-4ef7-a050-f3cd2ee2c466.JPG' },
  { id: 110, name: 'Пельмени элитные', category: 'frozen', price: 800, composition: '', image: 'https://cdn.poehali.dev/files/1d2939e3-97fb-4adc-bf34-6047f419190c.JPG' },
  { id: 111, name: 'Пельмени нежные из домашней курицы', category: 'frozen', price: 645, composition: '', image: 'https://cdn.poehali.dev/files/2db39d30-e57b-4b7c-959d-85be6f780866.JPG' },
  { id: 201, name: 'Вареники с вишней', category: 'vareniki', price: 590, composition: '', image: 'https://cdn.poehali.dev/files/37a353a2-e7d2-4163-b36f-2e54bf41fab5.JPG' },
  { id: 202, name: 'Вареники с грибами', category: 'vareniki', price: 640, composition: '', image: 'https://cdn.poehali.dev/files/f3034af2-a542-4bed-af4f-31e8b1eb9768.JPG' },
  { id: 203, name: 'Вареники с капустой и грибами', category: 'vareniki', price: 650, composition: '', image: 'https://cdn.poehali.dev/files/ad142323-4507-4f63-ba88-9398c56e1c89.JPG' },
  { id: 204, name: 'Вареники с капустой', category: 'vareniki', price: 630, composition: '', image: 'https://cdn.poehali.dev/files/d9ba3058-98f8-4338-b553-255197b0dc85.JPG' },
  { id: 205, name: 'Вареники с картофелем и грибами', category: 'vareniki', price: 655, composition: '', image: 'https://cdn.poehali.dev/files/feec1dcd-c66c-4ab3-89da-b07d696e088e.JPG' },
  { id: 206, name: 'Вареники с картофелем и луком', category: 'vareniki', price: 620, composition: '', image: 'https://cdn.poehali.dev/files/9d1cefb3-14ae-44c4-bbba-8c448b2f64a9.JPG' },
  { id: 207, name: 'Вареники с ливером', category: 'vareniki', price: 670, composition: '', image: 'https://cdn.poehali.dev/files/d9425a79-b7cb-41cc-9b23-0d6125d7bd9f.JPG' },
  { id: 208, name: 'Вареники с творогом и вишней', category: 'vareniki', price: 600, composition: '', image: 'https://cdn.poehali.dev/files/8c71f599-f3cb-4f3a-a7f4-f2f29ead0aa4.JPG' },
  { id: 209, name: 'Вареники с творогом', category: 'vareniki', price: 580, composition: '', image: 'https://cdn.poehali.dev/files/719d9be9-f983-40cc-89d2-56661ee43fee.JPG' },
  { id: 210, name: 'Сырники', category: 'chebureki', price: 450, composition: '', image: 'https://cdn.poehali.dev/files/de276f54-f1d6-4690-93d9-5d2294effcaf.JPG' },
  { id: 211, name: 'Чебуреки с картофелем', category: 'chebureki', price: 380, composition: '', image: 'https://cdn.poehali.dev/files/ee0e161b-5708-4172-92ff-e81a280ce612.JPG' },
  { id: 212, name: 'Чебуреки с курицей', category: 'chebureki', price: 420, composition: '', image: 'https://cdn.poehali.dev/files/4de39178-fb3e-4ff9-ac69-e5179dbb0607.JPG' },
  { id: 213, name: 'Чебуреки с мясом', category: 'chebureki', price: 450, composition: '', image: 'https://cdn.poehali.dev/files/b36c57c6-6180-48de-a14e-e3395faa1e11.JPG' },
  { id: 214, name: 'Чебуреки с рисом и грибами', category: 'chebureki', price: 390, composition: '', image: 'https://cdn.poehali.dev/files/426e1215-b999-4cb7-848c-0d7e4bc19b38.JPG' },
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
  { id: 22, name: 'Варёная к завтраку', category: 'sausages', price: 750, composition: 'Состав: говядина 42%, свинина 29%, мясо куриное 29%, молоко, нитритно-посолочная смесь, яйцо куриное, специи (перец чёрный, мускатный орех). Пищевая ценность (100г): белки не менее 12,5г, жиры не более 22,2г, углеводы не более 0,9г. Калорийность 253 ккал. Срок годности при +2-6°C 30 суток', image: 'https://cdn.poehali.dev/files/7fcc9743-4eec-49fd-8206-b61677248d11.JPG' },
  { id: 23, name: 'Варёная говяжья', category: 'sausages', price: 1200, composition: 'Состав: говядина, вода, соль, сахар, яйцо куриное, специи. Пищевая ценность (100г): белки 13г, жиры 15г. Калорийность 501 ккал. Срок годности при +2-6°C 30 суток', image: 'https://cdn.poehali.dev/files/72134cd0-b336-4106-b60c-d24d5912b47c.JPG' },
  { id: 24, name: 'Варёная докторская', category: 'sausages', price: 880, composition: 'Состав: свинина полужирная 73%, говядина 1 сорт 27%, молоко, яйцо куриное, специи. Пищевая ценность (100г): белки 12г, жиры 20г. Калорийность 228 ккал. Срок годности при +2-6°C 30 суток', image: 'https://cdn.poehali.dev/files/5ea88040-313d-4c23-8504-0c4af7dfd672.JPG' },
  { id: 25, name: 'Варёная окрошечная', category: 'sausages', price: 650, composition: 'Состав: свинина, шпик, яйцо, специи, соль, сахар, чеснок. Пищевая ценность (100г): белки 11,7г, жиры 39г, углеводы 0,2г. Калорийность 299 ккал. Срок годности не более 30 суток при температуре от 0 до +6°C и относительной влажности воздуха 75%', image: 'https://cdn.poehali.dev/files/7dd7c585-1de3-4fff-b90f-6ef07158089a.JPG' },
  { id: 26, name: 'Варёная ветчинная', category: 'sausages', price: 850, composition: 'Состав: говядина, свинина, вода, яйцо, молоко, крахмал, соль, сахар, мускатный орех. Пищевая ценность (100г): белки 12г, жиры 20г. Калорийность 222 ккал. Срок годности при температуре от 0°C до +6°C и относительной влажности воздуха 75% - 30 суток', image: 'https://cdn.poehali.dev/files/214a69db-b68f-4452-8b2c-1b5fe213428e.JPG' },
  { id: 27, name: 'Варёная чайная', category: 'sausages', price: 650, composition: 'Состав: говядина, шпик, соль, сахар, перец чёрный, мускатный орех. Пищевая ценность (100г): белки 15г, жиры 42г, углеводы 3,3г. Калорийность 410 ккал. Срок годности при +2-6°C не более 25 суток', image: 'https://cdn.poehali.dev/files/afd7db2d-672b-4c92-9830-60742659479f.JPG' },
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
  { id: 21, name: 'Ветчина куриная', category: 'sausages', price: 850, composition: 'Состав: мясо кур, вода, крахмал, специи. Пищевая ценность (100г): белки 14,5г, жиры 20,2г, углеводы 0,9г. Калорийность 263 ккал. Срок годности при +2-6°C не более 30 суток', image: 'https://cdn.poehali.dev/files/2795d88f-4436-43b0-bc8b-1fde32973422.JPG' },
  { id: 52, name: 'Ветчина из индейки', category: 'sausages', price: 900, composition: 'Состав: мясо индейки 99%, крахмал 1%, соль, специи. Пищевая ценность (100г): белки 10г, жиры 13,4г, углеводы 15г. Калорийность 260 ккал. Срок годности при +2-6°C не более 5 суток, в вакуумной упаковке не более 15 суток', image: 'https://cdn.poehali.dev/files/f57f6ce9-d84c-42c4-9eed-b3c53d576a58.JPG' },
  { id: 53, name: 'Ветчина имперская', category: 'sausages', price: 1100, composition: 'Состав: свинина, соль, крахмал, сахар, специи. Пищевая ценность (100г): белки 12г, жиры 28г, углеводы 3,5г. Калорийность 314 ккал. Срок годности при +2-6°C не более 5 суток, в вакуумной упаковке не более 15 суток', image: 'https://cdn.poehali.dev/files/ac965f81-1ec3-4880-9c28-14ca46371e08.JPG' },
  { id: 54, name: 'Сардельки говяжьи', category: 'wieners', price: 860, composition: 'Состав: говядина, вода, шпик, соль, чеснок, сахар, специи. Пищевая ценность (100г): белки 11г, жиры 18г, углеводы 0,9г. Калорийность 768 ккал. Срок годности при +2-6°C не более 5 суток, упакованных под вакуумом 15 суток', image: 'https://cdn.poehali.dev/files/f28d30bf-b779-4602-896b-1c63ec16f792.JPG' },
  { id: 55, name: 'Сардельки куриные', category: 'wieners', price: 650, composition: 'Состав: мясо кур, соль, специи. Пищевая ценность (100г): белки 14,2г, жиры 23г, углеводы 0,9г. Калорийность 270 ккал. Срок годности при +2-6°C не более 5 суток, упакованных под вакуумом 15 суток', image: 'https://cdn.poehali.dev/files/004e5ea4-a279-4892-afde-4c2bc63e8f38.JPG' },
  { id: 56, name: 'Сардельки обыкновенные', category: 'wieners', price: 800, composition: 'Состав: говядина, вода, свинина, шпик, сахар, соль, специи. Пищевая ценность (100г): белки 11г, жиры 20г. Калорийность 244 ккал. Срок годности при +2-6°C не более 10 суток, упакованных под вакуумом 15 суток', image: 'https://cdn.poehali.dev/files/e3ceacf7-8d7d-429a-a448-7bb76fe464eb.JPG' },
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
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.composition.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => setActiveSection('home')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="https://cdn.poehali.dev/files/bc00e618-2da4-4ea8-bf3e-5ac10f1d3b12.jpg" alt="Наш Продукт" className="h-12" />
            <span className="text-xl font-bold text-foreground">Наш продукт</span>
          </button>
          <div className="hidden md:flex gap-8">
            {['home', 'catalog', 'about', 'reviews', 'contacts'].map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === section ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {section === 'home' && 'Главная'}
                {section === 'catalog' && 'Каталог'}
                {section === 'about' && 'О нас'}
                {section === 'reviews' && 'Отзывы'}
                {section === 'contacts' && 'Контакты'}
              </button>
            ))}
          </div>
          <Button asChild className="bg-[#25D366] hover:bg-[#22c55e]">
            <a href="https://wa.me/79877418799" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Icon name="MessageCircle" size={18} className="mr-2" />
              WhatsApp
            </a>
          </Button>
        </nav>
      </header>

      {activeSection === 'home' && (
        <main>
          <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/files/b4f22765-d9a1-404a-918b-fef39e295eb8.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Качество на вашем столе
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Свежие продукты от производителя: мясо, выпечка, деликатесы
              </p>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => setActiveSection('catalog')}
              >
                Перейти в каталог
              </Button>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Категории продуктов</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((cat, idx) => (
                  <Card 
                    key={cat.id}
                    className="cursor-pointer hover:shadow-lg transition-all hover-scale animate-fade-in"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveSection('catalog');
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <Icon name={cat.icon} size={48} className="mx-auto mb-4 text-primary" />
                      <p className="font-semibold text-foreground">{cat.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {activeSection === 'catalog' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-foreground">Каталог продуктов</h2>
            
            <div className="mb-6">
              <div className="relative max-w-md">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск по названию или составу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex gap-3 mb-8 flex-wrap">
              <Badge 
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedCategory(null)}
              >
                Все категории
              </Badge>
              {categories.map(cat => (
                <Badge 
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, idx) => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/20 animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden cursor-pointer relative" onClick={() => setLightboxImage(product.image)}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary text-primary-foreground font-bold text-base px-4 py-1.5 shadow-lg">
                        {product.price} ₽
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="space-y-3">
                    <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{product.name}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">{product.composition}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-foreground">О нас</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                🥩 Компания «Наш продукт» — ваш надёжный поставщик натуральных продуктов!
              </p>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                <strong>Направления бизнеса:</strong> мясопереработка, производство полуфабрикатов, колбасных и копченых изделий, выпечка и кондитерские изделия, розничная торговля.
              </p>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                <strong>Наша гордость:</strong> собственное производство, более 1000 наименований продукции, 20 лет на рынке, современное европейское оборудование, строжайший контроль качества.
              </p>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                <strong>Принципы работы:</strong> натуральные ингредиенты, традиционные русские рецепты, открытость производства.
              </p>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                Качество — наш приоритет! На предприятии работают ветеринары, которые следят за здоровьем животных и свежестью продукции.
              </p>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                👨‍💼 Команда профессионалов создаёт вкусную и качественную еду для вас. Мы ценим доверие покупателей и постоянно совершенствуемся!
              </p>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed font-semibold">
                Добро пожаловать в магазины «Наш продукт»! ❤
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Icon name="Award" size={48} className="mx-auto mb-4 text-primary" />
                    <h3 className="font-bold text-xl mb-2">20 лет</h3>
                    <p className="text-muted-foreground">на рынке</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Icon name="Package" size={48} className="mx-auto mb-4 text-primary" />
                    <h3 className="font-bold text-xl mb-2">1000</h3>
                    <p className="text-muted-foreground">наименований продукции</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Icon name="CheckCircle" size={48} className="mx-auto mb-4 text-primary" />
                    <h3 className="font-bold text-xl mb-2">100%</h3>
                    <p className="text-muted-foreground">натуральный продукт</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'reviews' && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-foreground text-center">Отзывы наших клиентов</h2>
            <div className="space-y-6">
              {reviews.map((review, idx) => (
                <Card key={review.id} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{review.name}</h3>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-foreground">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" className="text-primary" />
                    Адрес
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Нижегородская область, Городецкий муниципальный округ, село Смольки, улица Новая, строение 13</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Phone" className="text-primary" />
                    Телефон
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">+7 (987) 741-87-99</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Mail" className="text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">dmitrykozyrev2000@yandex.ru</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Clock" className="text-primary" />
                    Время работы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Пн-Вс: 8:00 - 17:00</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-white border-t-2 border-gray-200 py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="https://cdn.poehali.dev/files/bc00e618-2da4-4ea8-bf3e-5ac10f1d3b12.jpg" alt="Наш Продукт" className="h-16" />
            <span className="text-2xl font-bold text-foreground">Наш продукт</span>
          </div>
          <p className="text-muted-foreground">© 2024 Наш Продукт. Все права защищены.</p>
        </div>
      </footer>

      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <Icon name="X" size={32} />
          </button>
          <img 
            src={lightboxImage} 
            alt="Увеличенное фото" 
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}