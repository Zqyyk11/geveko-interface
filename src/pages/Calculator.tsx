import { useState } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Product = {
  id: string;
  name: string;
};

const products: Product[] = [
  { id: 'viatherm', name: 'ViaTherm®' },
  { id: 'vialux', name: 'ViaLux®' },
  { id: 'viapaint', name: 'ViaPaint®' },
];

const Calculator = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [density, setDensity] = useState<string>('');
  const [thickness, setThickness] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [calculatingField, setCalculatingField] = useState<string>('');

  const calculateMissing = (field: string) => {
    const w = parseFloat(weight);
    const d = parseFloat(density);
    const t = parseFloat(thickness);
    const a = parseFloat(area);

    setCalculatingField(field);

    switch (field) {
      case 'weight':
        if (!isNaN(d) && !isNaN(t) && !isNaN(a)) {
          setWeight(((d * a * t) / 1000).toFixed(2));
        }
        break;
      case 'density':
        if (!isNaN(w) && !isNaN(t) && !isNaN(a)) {
          setDensity(((w * 1000) / (a * t)).toFixed(2));
        }
        break;
      case 'thickness':
        if (!isNaN(w) && !isNaN(d) && !isNaN(a)) {
          setThickness(((w * 1000) / (d * a)).toFixed(2));
        }
        break;
      case 'area':
        if (!isNaN(w) && !isNaN(d) && !isNaN(t)) {
          setArea(((w * 1000) / (d * t)).toFixed(2));
        }
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 px-4"
    >
      <div className="max-w-md mx-auto">
        <div className="ios-card p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Product Calculator</h1>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product">Select Product</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="ios-input">
                  <SelectValue placeholder="Choose a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <div className="flex gap-2">
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight"
                  className="ios-input flex-1"
                />
                <button
                  onClick={() => calculateMissing('weight')}
                  className="ios-button px-4"
                  disabled={!density || !thickness || !area}
                >
                  Calculate
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="density">Density (kg/m³)</Label>
              <div className="flex gap-2">
                <Input
                  id="density"
                  type="number"
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                  placeholder="Enter density"
                  className="ios-input flex-1"
                />
                <button
                  onClick={() => calculateMissing('density')}
                  className="ios-button px-4"
                  disabled={!weight || !thickness || !area}
                >
                  Calculate
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thickness">Thickness (mm)</Label>
              <div className="flex gap-2">
                <Input
                  id="thickness"
                  type="number"
                  value={thickness}
                  onChange={(e) => setThickness(e.target.value)}
                  placeholder="Enter thickness"
                  className="ios-input flex-1"
                />
                <button
                  onClick={() => calculateMissing('thickness')}
                  className="ios-button px-4"
                  disabled={!weight || !density || !area}
                >
                  Calculate
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area (m²)</Label>
              <div className="flex gap-2">
                <Input
                  id="area"
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Enter area"
                  className="ios-input flex-1"
                />
                <button
                  onClick={() => calculateMissing('area')}
                  className="ios-button px-4"
                  disabled={!weight || !density || !thickness}
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Calculator;