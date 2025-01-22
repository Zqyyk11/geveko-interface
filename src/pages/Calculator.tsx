import { useState } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const calculateMissing = () => {
    const w = parseFloat(weight);
    const d = parseFloat(density);
    const t = parseFloat(thickness);
    const a = parseFloat(area);

    // Determine which value is missing and calculate it
    if (!isNaN(d) && !isNaN(t) && !isNaN(a)) {
      setWeight(((d * a * t) / 1000).toFixed(2));
    } else if (!isNaN(w) && !isNaN(t) && !isNaN(a)) {
      setDensity(((w * 1000) / (a * t)).toFixed(2));
    } else if (!isNaN(w) && !isNaN(d) && !isNaN(a)) {
      setThickness(((w * 1000) / (d * a)).toFixed(2));
    } else if (!isNaN(w) && !isNaN(d) && !isNaN(t)) {
      setArea(((w * 1000) / (d * t)).toFixed(2));
    }
  };

  // Check if exactly three inputs are filled
  const canCalculate = () => {
    const filledInputs = [weight, density, thickness, area].filter(value => value !== '').length;
    return filledInputs === 3;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 px-4"
    >
      <div className="max-w-md mx-auto">
        <div className="ios-card p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Product Calculator</h1>
          
          <ScrollArea className="h-[400px] pr-4">
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
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight"
                  className="ios-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="density">Density (kg/m³)</Label>
                <Input
                  id="density"
                  type="number"
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                  placeholder="Enter density"
                  className="ios-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thickness">Thickness (mm)</Label>
                <Input
                  id="thickness"
                  type="number"
                  value={thickness}
                  onChange={(e) => setThickness(e.target.value)}
                  placeholder="Enter thickness"
                  className="ios-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Area (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Enter area"
                  className="ios-input"
                />
              </div>
            </div>
          </ScrollArea>

          <Button
            onClick={calculateMissing}
            disabled={!canCalculate()}
            className="w-full mt-6"
            size="lg"
          >
            Calculate
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Calculator;