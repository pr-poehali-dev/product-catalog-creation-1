import { useState } from 'react';
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
  { id: 'semifinished', name: 'Полуфабрикаты', icon: 'Package' },
  { id: 'smoked', name: 'Копчености', icon: 'Flame' },
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
  { id: 5, name: 'Грудинка копченая', category: 'smoked', price: 720, composition: 'Свиная грудинка, соль, дым ольховый', image: '/placeholder.svg' },
  { id: 21, name: 'Ветчина куриная', category: 'sausages', price: 850, composition: 'Состав: мясо кур, вода, крахмал, специи. Пищевая ценность (100г): белки 14,5г, жиры 20,2г, углеводы 0,9г. Калорийность 263 ккал. Срок годности при +2-6°C не более 30 суток', image: 'https://cdn.poehali.dev/files/2795d88f-4436-43b0-bc8b-1fde32973422.JPG' },
  { id: 22, name: 'Варёная к завтраку', category: 'sausages', price: 750, composition: 'Состав: говядина 42%, свинина 29%, мясо куриное 29%, молоко, нитритно-посолочная смесь, яйцо куриное, специи (перец чёрный, мускатный орех). Пищевая ценность (100г): белки не менее 12,5г, жиры не более 22,2г, углеводы не более 0,9г. Калорийность 253 ккал. Срок годности при +2-6°C 30 суток', image: 'https://cdn.poehali.dev/files/7fcc9743-4eec-49fd-8206-b61677248d11.JPG' },
  { id: 23, name: 'Варёная говяжья', category: 'sausages', price: 1200, composition: 'Состав: говядина, вода, соль, сахар, яйцо куриное, специи. Пищевая ценность (100г): белки 13г, жиры 15г. Калорийность 501 ккал. Срок годности при +2-6°C 30 суток', image: 'https://cdn.poehali.dev/files/72134cd0-b336-4106-b60c-d24d5912b47c.JPG' },
  { id: 24, name: 'Варёная докторская', category: 'sausages', price: 880, composition: 'Состав: свинина полужирная 73%, говядина 1 сорт 27%, молоко, яйцо куриное, специи. Пищевая ценность (100г): белки 12г, жиры 20г. Калорийность 228 ккал. Срок годности при +2-6°C 30 суток', image: 'https://cdn.poehali.dev/files/5ea88040-313d-4c23-8504-0c4af7dfd672.JPG' },
  { id: 25, name: 'Варёная окрошечная', category: 'sausages', price: 650, composition: 'Состав: свинина, шпик, яйцо, специи, соль, сахар, чеснок. Пищевая ценность (100г): белки 11,7г, жиры 39г, углеводы 0,2г. Калорийность 299 ккал. Срок годности не более 30 суток при температуре от 0 до +6°C и относительной влажности воздуха 75%', image: 'https://cdn.poehali.dev/files/7dd7c585-1de3-4fff-b90f-6ef07158089a.JPG' },
  { id: 26, name: 'Варёная ветчинная', category: 'sausages', price: 850, composition: 'Состав: говядина, свинина, вода, яйцо, молоко, крахмал, соль, сахар, мускатный орех. Пищевая ценность (100г): белки 12г, жиры 20г. Калорийность 222 ккал. Срок годности при температуре от 0°C до +6°C и относительной влажности воздуха 75% - 30 суток', image: 'https://cdn.poehali.dev/files/214a69db-b68f-4452-8b2c-1b5fe213428e.JPG' },
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

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/bc00e618-2da4-4ea8-bf3e-5ac10f1d3b12.jpg" alt="Наш Продукт" className="h-12" />
            <span className="text-xl font-bold text-foreground">Наш продукт</span>
          </div>
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
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all animate-fade-in hover-scale" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm">{product.composition}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                  </CardContent>
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
    </div>
  );
}