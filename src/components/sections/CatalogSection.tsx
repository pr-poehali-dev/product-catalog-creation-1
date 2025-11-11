import Icon from '@/components/ui/icon';
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

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CatalogSectionProps {
  categories: Category[];
  filteredProducts: Product[];
  searchQuery: string;
  selectedCategory: string | null;
  onSearchChange: (query: string) => void;
  onCategorySelect: (categoryId: string | null) => void;
  onImageClick: (image: string) => void;
}

export default function CatalogSection({ 
  categories, 
  filteredProducts, 
  searchQuery, 
  selectedCategory, 
  onSearchChange, 
  onCategorySelect,
  onImageClick 
}: CatalogSectionProps) {
  return (
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
              onChange={(e) => {
                onSearchChange(e.target.value);
                onCategorySelect(null);
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          <Badge 
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer px-4 py-2"
            onClick={() => onCategorySelect(null)}
          >
            Все категории
          </Badge>
          {categories.map(cat => (
            <Badge 
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              className="cursor-pointer px-4 py-2"
              onClick={() => onCategorySelect(cat.id)}
            >
              {cat.name}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all animate-fade-in hover-scale" style={{ animationDelay: `${idx * 0.05}s` }}>
              <div className="aspect-square bg-muted overflow-hidden cursor-pointer" onClick={() => onImageClick(product.image)}>
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
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
  );
}
