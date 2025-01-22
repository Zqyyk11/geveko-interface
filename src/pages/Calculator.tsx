import { useState } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Product } from '@/types/calculator';
import { products, calculateMissing, canCalculate } from '@/utils/calculatorUtils';

const Calculator = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [density, setDensity] = useState<string>('');
  const [thickness, setThickness] = useState<string>('');
  const [area, setArea] = useState<string>('');

  const handleCalculate = () => {
    const result = calculateMissing(weight, density, thickness, area);
    setWeight(result.weight);
    setDensity(result.density);
    setThickness(result.thickness);
    setArea(result.area);
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
                className="ios-input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                className="ios-input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                className="ios-input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                className="ios-input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            disabled={!canCalculate([weight, density, thickness, area])}
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