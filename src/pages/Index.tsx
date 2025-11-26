import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: "vareniki" | "chebureki" | "syrniki";
}

const products: Product[] = [
  {
    id: 1,
    name: "Вареники с капустой и грибами",
    description: "Сочная начинка из тушеной капусты с ароматными грибами",
    image: "https://cdn.poehali.dev/files/44032b1f-5897-4fbc-b072-daaa03dec176.JPG",
    category: "vareniki"
  },
  {
    id: 2,
    name: "Вареники с капустой",
    description: "Классические вареники с тушеной капустой",
    image: "https://cdn.poehali.dev/files/02e349a6-4d5a-418d-9cf3-b7265be80111.JPG",
    category: "vareniki"
  },
  {
    id: 3,
    name: "Вареники с картофелем и грибами",
    description: "Нежное картофельное пюре с лесными грибами",
    image: "https://cdn.poehali.dev/files/fe75697d-8cae-46a9-9515-51ec973e15e7.JPG",
    category: "vareniki"
  },
  {
    id: 4,
    name: "Вареники с ливером",
    description: "Питательная начинка из ливера со специями",
    image: "https://cdn.poehali.dev/files/e1fffb4a-068d-4f2e-a229-75f49c4b4102.JPG",
    category: "vareniki"
  },
  {
    id: 5,
    name: "Вареники с картофелем и луком",
    description: "Традиционная домашняя начинка",
    image: "https://cdn.poehali.dev/files/54d61d08-52c7-452e-a9b2-f3fe25adae6e.JPG",
    category: "vareniki"
  },
  {
    id: 6,
    name: "Вареники с творогом",
    description: "Нежный творог с легкой сладостью",
    image: "https://cdn.poehali.dev/files/b2e3f749-b96a-4dbd-a911-267a56a24e1a.JPG",
    category: "vareniki"
  },
  {
    id: 7,
    name: "Вареники с творогом и вишней",
    description: "Сладкие вареники с творогом и сочной вишней",
    image: "https://cdn.poehali.dev/files/33fb6b6b-0eb5-448e-9d51-a9b7e0c98970.JPG",
    category: "vareniki"
  },
  {
    id: 8,
    name: "Сырники",
    description: "Нежные творожные сырники с золотистой корочкой",
    image: "https://cdn.poehali.dev/files/e20df920-8cc1-4d79-b8a4-84581980e7d8.JPG",
    category: "syrniki"
  },
  {
    id: 9,
    name: "Чебуреки с картофелем",
    description: "Хрустящее тесто с картофельной начинкой",
    image: "https://cdn.poehali.dev/files/6730c81b-8f78-4bf8-bb1b-bf92f9ff7756.JPG",
    category: "chebureki"
  },
  {
    id: 10,
    name: "Чебуреки с курицей",
    description: "Сочная куриная начинка в хрустящем тесте",
    image: "https://cdn.poehali.dev/files/237b16b1-931b-476b-92e1-fd438ea68822.JPG",
    category: "chebureki"
  },
  {
    id: 11,
    name: "Чебуреки с мясом",
    description: "Классические чебуреки с мясной начинкой",
    image: "https://cdn.poehali.dev/files/7390e6cf-1fc4-4072-8b66-af08e9e88766.JPG",
    category: "chebureki"
  },
  {
    id: 12,
    name: "Чебуреки с рисом и грибами",
    description: "Легкая постная начинка из риса с грибами",
    image: "https://cdn.poehali.dev/files/50cc1df1-23f4-439f-90e0-019cbe351a9d.JPG",
    category: "chebureki"
  }
];

const categories = [
  { id: "all", label: "Все блюда", icon: "UtensilsCrossed" },
  { id: "vareniki", label: "Вареники", icon: "Cookie" },
  { id: "chebureki", label: "Чебуреки", icon: "Pizza" },
  { id: "syrniki", label: "Сырники", icon: "Cake" }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-amber-900">Домашняя кухня</h1>
              <p className="text-amber-700 mt-1">Вареники, чебуреки и сырники ручной работы</p>
            </div>
            <Icon name="ChefHat" className="text-amber-600" size={48} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              className={`cursor-pointer text-base px-5 py-2 transition-all hover:scale-105 ${
                selectedCategory === cat.id 
                  ? "bg-amber-600 hover:bg-amber-700 text-white" 
                  : "border-amber-300 text-amber-800 hover:bg-amber-100"
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <Icon name={cat.icon as any} size={18} className="mr-2" />
              {cat.label}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-amber-200 group"
            >
              <div className="relative overflow-hidden bg-amber-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-amber-800 border-amber-300">
                    {product.category === "vareniki" && "Вареники"}
                    {product.category === "chebureki" && "Чебуреки"}
                    {product.category === "syrniki" && "Сырники"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-amber-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-amber-700 text-sm">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" size={64} className="mx-auto text-amber-300 mb-4" />
            <p className="text-xl text-amber-700">Ничего не найдено</p>
          </div>
        )}
      </main>

      <footer className="bg-amber-900 text-amber-50 mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Heart" className="text-red-400" size={20} />
            <p className="text-lg font-medium">Сделано с любовью</p>
          </div>
          <p className="text-amber-200">Домашняя кухня © 2024</p>
        </div>
      </footer>
    </div>
  );
}
