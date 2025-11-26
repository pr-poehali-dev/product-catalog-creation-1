import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  name: string;
  image: string;
  weight?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Биточки Неженка",
    image: "https://cdn.poehali.dev/files/eacd1e92-6d70-4719-8a6f-632d1de8f3da.JPG",
    weight: "500 г"
  },
  {
    id: 2,
    name: "Перец фаршированный мясом",
    image: "https://cdn.poehali.dev/files/59f39a73-f6f2-4ebe-a0b9-b2abebd98e66.JPG",
    weight: "300 г"
  },
  {
    id: 3,
    name: "Тефтели",
    image: "https://cdn.poehali.dev/files/4506a029-b174-4426-befd-3578354af945.JPG",
    weight: "400 г"
  },
  {
    id: 4,
    name: "Котлеты Забава",
    image: "https://cdn.poehali.dev/files/07e92a36-3e1f-4057-9ff4-d07e45adf1c7.JPG",
    weight: "500 г"
  },
  {
    id: 5,
    name: "Котлеты Полтавские",
    image: "https://cdn.poehali.dev/files/ed0dfcf4-b06a-4cb1-8bc5-231bd1d889b2.JPG",
    weight: "450 г"
  },
  {
    id: 6,
    name: "Ёжики мясные",
    image: "https://cdn.poehali.dev/files/5bb7d7dc-ee63-47db-9b7a-261875b51343.JPG",
    weight: "400 г"
  },
  {
    id: 7,
    name: "Котлеты домашние",
    image: "https://cdn.poehali.dev/files/fbec11b1-d54e-4b0d-b6a1-03062bb490a1.JPG",
    weight: "500 г"
  },
  {
    id: 8,
    name: "Зразы мясные с грибами",
    image: "https://cdn.poehali.dev/files/ddbb808b-0b51-4b47-a935-d6877e93d7b1.JPG",
    weight: "450 г"
  },
  {
    id: 9,
    name: "Шницель свиной",
    image: "https://cdn.poehali.dev/files/804e3bf1-2e86-4c70-89f8-ce445173e037.JPG",
    weight: "400 г"
  },
  {
    id: 10,
    name: "Фрикадельки",
    image: "https://cdn.poehali.dev/files/1383a0b9-355f-43a8-a453-fd4e622ce282.JPG",
    weight: "350 г"
  },
  {
    id: 11,
    name: "Котлеты особые",
    image: "https://cdn.poehali.dev/files/792c34db-ba5c-487a-a913-e8b7cda22781.JPG",
    weight: "500 г"
  },
  {
    id: 12,
    name: "Котлеты свиные",
    image: "https://cdn.poehali.dev/files/a2fe9c0d-c633-4844-ad4b-e5c36eb9a734.JPG",
    weight: "500 г"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <Icon name="ChefHat" size={40} className="text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Мясные полуфабрикаты
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Домашние котлеты и полуфабрикаты из натурального мяса
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in border-orange-100"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  {product.weight && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Icon name="Weight" size={16} className="text-orange-500" />
                      <span className="text-sm">{product.weight}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block bg-orange-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-orange-900">
                <Icon name="Phone" size={24} className="text-orange-600" />
                <div className="text-left">
                  <p className="font-semibold">Заказать можно по телефону</p>
                  <p className="text-lg font-bold">+7 (XXX) XXX-XX-XX</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
