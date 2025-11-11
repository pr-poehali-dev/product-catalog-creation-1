import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface HomeSectionProps {
  categories: Category[];
  onCatalogClick: () => void;
  onCategorySelect: (categoryId: string) => void;
}

export default function HomeSection({ categories, onCatalogClick, onCategorySelect }: HomeSectionProps) {
  return (
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
            onClick={onCatalogClick}
          >
            Смотреть каталог
          </Button>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Наши категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat, idx) => (
              <Card 
                key={cat.id} 
                className="cursor-pointer hover:shadow-xl transition-all hover-scale animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => {
                  onCategorySelect(cat.id);
                  onCatalogClick();
                }}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 h-32">
                  <Icon name={cat.icon} size={48} className="mx-auto mb-4 text-primary" />
                  <p className="font-semibold text-foreground">{cat.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
