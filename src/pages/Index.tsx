import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type StorageType = 'personal' | 'furniture' | 'equipment' | 'other';
type ContainerSize = 'S' | 'M' | 'L' | 'XL';

interface OrderData {
  storageType: StorageType | null;
  containerSize: ContainerSize | null;
  needsGazelle: boolean;
  needsLoaders: boolean;
  name: string;
  phone: string;
}

const storageTypes = [
  { id: 'personal' as StorageType, emoji: '👜', title: 'Личные вещи', desc: 'Одежда, документы, книги' },
  { id: 'furniture' as StorageType, emoji: '🛋️', title: 'Мебель', desc: 'Диваны, шкафы, столы' },
  { id: 'equipment' as StorageType, emoji: '🔧', title: 'Оборудование', desc: 'Инструменты, техника' },
  { id: 'other' as StorageType, emoji: '📦', title: 'Другое', desc: 'Остальные вещи' }
];

const containerSizes = [
  { id: 'S' as ContainerSize, size: '2м³', price: 1500, dimensions: '1×1×2м' },
  { id: 'M' as ContainerSize, size: '5м³', price: 2500, dimensions: '1.5×1.5×2м' },
  { id: 'L' as ContainerSize, size: '10м³', price: 4000, dimensions: '2×2×2.5м' },
  { id: 'XL' as ContainerSize, size: '20м³', price: 7000, dimensions: '2.5×2.5×3м' }
];

const Index = () => {
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState<OrderData>({
    storageType: null,
    containerSize: null,
    needsGazelle: false,
    needsLoaders: false,
    name: '',
    phone: ''
  });

  const gazellePrice = 2000;
  const loadersPrice = 1500;

  const calculateTotal = () => {
    let total = 0;
    if (order.containerSize) {
      const container = containerSizes.find(c => c.id === order.containerSize);
      total += container?.price || 0;
    }
    if (order.needsGazelle) total += gazellePrice;
    if (order.needsLoaders) total += loadersPrice;
    return total;
  };

  const handleNext = () => {
    if (step === 1 && !order.storageType) {
      toast.error('Выберите тип имущества');
      return;
    }
    if (step === 2 && !order.containerSize) {
      toast.error('Выберите размер контейнера');
      return;
    }
    if (step < 4) setStep(step + 1);
  };

  const handleSubmit = () => {
    if (!order.name || !order.phone) {
      toast.error('Заполните все поля');
      return;
    }
    toast.success('Заказ оформлен! Мы свяжемся с вами в течение 15 минут');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            📦 Умный склад
          </h1>
          <p className="text-gray-600 text-lg">Аренда контейнеров в Челябинске и области</p>
        </div>

        <div className="flex justify-center mb-8 gap-2 animate-slide-up">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step ? 'w-12 bg-gradient-to-r from-purple-600 to-pink-600' : 
                s < step ? 'w-8 bg-purple-400' : 'w-8 bg-gray-300'
              }`}
            />
          ))}
        </div>

        <Card className="p-8 shadow-xl border-2 animate-scale-in">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center mb-6">Что будете хранить?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {storageTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setOrder({ ...order, storageType: type.id })}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      order.storageType === type.id
                        ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300 bg-white'
                    }`}
                  >
                    <div className="text-5xl mb-3">{type.emoji}</div>
                    <h3 className="text-xl font-bold mb-1">{type.title}</h3>
                    <p className="text-gray-500 text-sm">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center mb-6">Выберите размер контейнера</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {containerSizes.map((container) => (
                  <button
                    key={container.id}
                    onClick={() => setOrder({ ...order, containerSize: container.id })}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      order.containerSize === container.id
                        ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl font-bold text-purple-600">{container.id}</span>
                      <span className="text-2xl font-bold text-orange-600">{container.price}₽</span>
                    </div>
                    <div className="text-left space-y-1">
                      <p className="text-lg font-semibold">{container.size}</p>
                      <p className="text-gray-500 text-sm">{container.dimensions}</p>
                      <p className="text-gray-400 text-xs">в месяц</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center mb-6">Дополнительные услуги</h2>
              <div className="space-y-4">
                <Card className="p-6 border-2 border-gray-200 hover:border-purple-300 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">🚚</div>
                      <div>
                        <h3 className="text-xl font-bold">Газель с водителем</h3>
                        <p className="text-gray-500">Доставка ваших вещей на склад</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-orange-600">{gazellePrice}₽</span>
                      <Checkbox
                        checked={order.needsGazelle}
                        onCheckedChange={(checked) => 
                          setOrder({ ...order, needsGazelle: checked as boolean })
                        }
                        className="w-6 h-6"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-gray-200 hover:border-purple-300 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">💪</div>
                      <div>
                        <h3 className="text-xl font-bold">Грузчики (2 человека)</h3>
                        <p className="text-gray-500">Помощь в погрузке и разгрузке</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-orange-600">{loadersPrice}₽</span>
                      <Checkbox
                        checked={order.needsLoaders}
                        onCheckedChange={(checked) => 
                          setOrder({ ...order, needsLoaders: checked as boolean })
                        }
                        className="w-6 h-6"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center mb-6">Оформление заказа</h2>
              
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <h3 className="text-lg font-bold mb-4">Ваш заказ:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Тип имущества:</span>
                    <span className="font-semibold">
                      {storageTypes.find(t => t.id === order.storageType)?.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Контейнер:</span>
                    <span className="font-semibold">
                      {order.containerSize} ({containerSizes.find(c => c.id === order.containerSize)?.size})
                    </span>
                  </div>
                  {order.needsGazelle && (
                    <div className="flex justify-between text-purple-700">
                      <span>🚚 Газель с водителем</span>
                      <span className="font-semibold">{gazellePrice}₽</span>
                    </div>
                  )}
                  {order.needsLoaders && (
                    <div className="flex justify-between text-purple-700">
                      <span>💪 Грузчики</span>
                      <span className="font-semibold">{loadersPrice}₽</span>
                    </div>
                  )}
                  <div className="border-t-2 border-purple-300 pt-2 mt-2 flex justify-between text-xl font-bold text-purple-900">
                    <span>Итого:</span>
                    <span>{calculateTotal()}₽</span>
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-base font-semibold">Ваше имя</Label>
                  <Input
                    id="name"
                    placeholder="Иван Иванов"
                    value={order.name}
                    onChange={(e) => setOrder({ ...order, name: e.target.value })}
                    className="mt-2 h-12 text-base"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-base font-semibold">Телефон</Label>
                  <Input
                    id="phone"
                    placeholder="+7 (900) 123-45-67"
                    value={order.phone}
                    onChange={(e) => setOrder({ ...order, phone: e.target.value })}
                    className="mt-2 h-12 text-base"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button
                onClick={() => setStep(step - 1)}
                variant="outline"
                size="lg"
                className="flex-1 h-14 text-base"
              >
                <Icon name="ChevronLeft" className="mr-2" size={20} />
                Назад
              </Button>
            )}
            {step < 4 ? (
              <Button
                onClick={handleNext}
                size="lg"
                className="flex-1 h-14 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Далее
                <Icon name="ChevronRight" className="ml-2" size={20} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                size="lg"
                className="flex-1 h-14 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Icon name="CreditCard" className="mr-2" size={20} />
                Оплатить {calculateTotal()}₽
              </Button>
            )}
          </div>
        </Card>

        <div className="text-center mt-8 text-sm text-gray-500 animate-fade-in">
          <p>🔒 Безопасная оплата • 📞 Поддержка 24/7 • ✅ Гарантия сохранности</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
