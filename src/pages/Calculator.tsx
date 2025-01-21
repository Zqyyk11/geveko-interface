import { useState } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Product = {
  id: string;
  name: string;
  coverage: number;
  density: number; // kg/m²
};

const products: Product[] = [
  { id: 'viatherm', name: 'ViaTherm®', coverage: 33.3, density: 2.5 },
  { id: 'vialux', name: 'ViaLux®', coverage: 50, density: 3.0 },
  { id: 'viapaint', name: 'ViaPaint®', coverage: 25, density: 1.8 },
];

const Calculator = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [kilometers, setKilometers] = useState<string>('');
  const [history, setHistory] = useState<Array<{ product: string, km: number, squareMeters: number, amount: number }>>([]);

  const calculateAmount = () => {
    const product = products.find(p => p.id === selectedProduct);
    if (!product || !kilometers) return;

    const km = parseFloat(kilometers);
    if (isNaN(km)) return;

    // Convert kilometers to meters and calculate width coverage
    const meters = km * 1000;
    const squareMeters = meters * (product.coverage / 1000); // coverage in millimeters to meters
    const amountNeeded = squareMeters * product.density; // kg = m² * density

    setHistory(prev => [...prev, {
      product: product.name,
      km,
      squareMeters: Math.round(squareMeters * 100) / 100,
      amount: Math.ceil(amountNeeded)
    }]);
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
              <Label htmlFor="kilometers">Distance (km)</Label>
              <Input
                id="kilometers"
                type="number"
                min="0"
                step="0.1"
                value={kilometers}
                onChange={(e) => setKilometers(e.target.value)}
                placeholder="Enter distance in kilometers"
                className="ios-input"
              />
            </div>

            <button
              onClick={calculateAmount}
              className="ios-button w-full py-3"
              disabled={!selectedProduct || !kilometers}
            >
              Calculate
            </button>
          </div>
        </div>

        {history.length > 0 && (
          <div className="mt-6 ios-card p-6">
            <h2 className="text-lg font-medium mb-4">Calculation History</h2>
            <div className="space-y-2">
              {history.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-gray-50/50 rounded-lg backdrop-blur-sm"
                >
                  <p className="text-sm">
                    <span className="font-medium">{item.product}</span>: {item.km} km
                    <br />
                    Area: <span className="font-medium">{item.squareMeters} m²</span>
                    <br />
                    Required: <span className="font-medium">{item.amount} kg</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Calculator;