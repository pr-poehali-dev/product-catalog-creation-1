import Icon from '@/components/ui/icon';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
}

interface ContentSectionsProps {
  activeSection: string;
  reviews: Review[];
}

export default function ContentSections({ activeSection, reviews }: ContentSectionsProps) {
  if (activeSection === 'about') {
    return (
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
              <strong>Продукция:</strong> более 100 видов мясных изделий: охлажденное мясо, тушенка, колбасы, копчености, полуфабрикаты, сыры, молочные продукты, торты, выпечка, хлеб, пироги.
            </p>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              📍 Торговые точки: 10+ магазинов в Нижегородской и Владимирской областях.
            </p>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              🚚 Доставка: по городу Заволжье, Городец, Нижний Новгород — ежедневно в удобное время!
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Мы гордимся качеством нашей продукции и стремимся сделать здоровое питание доступным каждой семье. Выбирайте свежее, выбирайте «Наш продукт»!
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (activeSection === 'reviews') {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Отзывы наших клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map(review => (
              <Card key={review.id} className="hover:shadow-xl transition-all animate-fade-in">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="font-semibold text-foreground text-base">{review.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (activeSection === 'contacts') {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-foreground">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Phone" size={24} className="text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Телефон</h3>
                </div>
              </CardHeader>
              <CardContent>
                <a href="tel:+79877418799" className="text-lg text-primary hover:underline">+7 (987) 741-87-99</a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Mail" size={24} className="text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Email</h3>
                </div>
              </CardHeader>
              <CardContent>
                <a href="mailto:info@nashproduct.ru" className="text-lg text-primary hover:underline">info@nashproduct.ru</a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="MapPin" size={24} className="text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Адрес</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">г. Заволжье, ул. Промышленная, 15</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Clock" size={24} className="text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Режим работы</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Пн-Вс: 8:00 - 20:00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
