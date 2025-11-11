import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Header({ activeSection, onSectionChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button onClick={() => onSectionChange('home')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="https://cdn.poehali.dev/files/bc00e618-2da4-4ea8-bf3e-5ac10f1d3b12.jpg" alt="Наш Продукт" className="h-12" />
          <span className="text-xl font-bold text-foreground">Наш продукт</span>
        </button>
        <div className="hidden md:flex gap-8">
          {['home', 'catalog', 'about', 'reviews', 'contacts'].map(section => (
            <button
              key={section}
              onClick={() => onSectionChange(section)}
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
  );
}
