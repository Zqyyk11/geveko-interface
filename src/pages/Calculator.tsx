import { useState } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products, canCalculateFullLine } from '@/utils/calculatorUtils';

const Calculator = () => {
  // Full Line Calculator state
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [density, setDensity] = useState<string>('');
  const [thickness, setThickness] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [calculatedWeight, setCalculatedWeight] = useState<string>('');

  // Agglomerate Calculator state
  const [selectedAggloProduct, setSelectedAggloProduct] = useState<string>('');
  const [aggloDensity, setAggloDensity] = useState<string>('');
  const [aggloArea, setAggloArea] = useState<string>('');
  const [aggloWeight, setAggloWeight] = useState<string>('');

  // Calculate Weight for Full Line
  const handleFullLineCalculate = () => {
    const weight = parseFloat(density) * parseFloat(thickness) * parseFloat(area);
    setCalculatedWeight(weight.toFixed(2)); // Round to 2 decimal places
  };

  // Calculate Weight for Agglomerate
  const handleAgglomerateCalculate = () => {
    const result = parseFloat(aggloDensity) * parseFloat(aggloArea);
    setAggloWeight(result.toFixed(2));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 px-4"
    >
      <div className="max-w-md mx-auto">
        <Tabs defaultValue="fullLine" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fullLine">Full Line Calculator</TabsTrigger>
            <TabsTrigger value="agglomerate">Agglomerate Calculator</TabsTrigger>
          </TabsList>

          {/* Full Line Calculator */}
          <TabsContent value="fullLine">
            <div className="ios-card p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Full Line Calculator</h1>
              
              <div className="space-y-4">
                {/* Product Selector */}
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

                {/* Density Input */}
                <div className="space-y-2">
                  <Label htmlFor="density">Density (kg/m³)</Label>
                  <Input
                    id="density"
                    type="number"
                    min="0"
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                    placeholder="Enter density"
                    className="ios-input"
                  />
                </div>

                {/* Thickness Input */}
                <div className="space-y-2">
                  <Label htmlFor="thickness">Thickness (mm)</Label>
                  <Input
                    id="thickness"
                    type="number"
                    min="0"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    placeholder="Enter thickness"
                    className="ios-input"
                  />
                </div>

                {/* Area Input */}
                <div className="space-y-2">
                  <Label htmlFor="area">Area (m²)</Label>
                  <Input
                    id="area"
                    type="number"
                    min="0"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Enter area"
                    className="ios-input"
                  />
                </div>

                {/* Calculated Weight Output */}
                <div className="space-y-2">
                  <Label htmlFor="calculatedWeight">Calculated Weight (kg)</Label>
                  <Input
                    id="calculatedWeight"
                    type="text"
                    readOnly
                    value={calculatedWeight}
                    className="ios-input bg-gray-50"
                  />
                </div>
              </div>

              <Button
                onClick={handleFullLineCalculate}
                disabled={!canCalculateFullLine([density, thickness, area])}
                className="w-full mt-6"
                size="lg"
              >
                Calculate
              </Button>
            </div>
          </TabsContent>

          {/* Agglomerate Calculator */}
          <TabsContent value="agglomerate">
            <div className="ios-card p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Agglomerate Calculator</h1>
              
              <div className="space-y-4">
                {/* Product Selector */}
                <div className="space-y-2">
                  <Label htmlFor="aggloProduct">Select Product</Label>
                  <Select value={selectedAggloProduct} onValueChange={setSelectedAggloProduct}>
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
                  <Label htmlFor="aggloDensity">Density (kg/m³)</Label>
                  <Input
                    id="aggloDensity"
                    type="number"
                    min="0"
                    value={aggloDensity}
                    onChange={(e) => setAggloDensity(e.target.value)}
                    placeholder="Enter density"
                    className="ios-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aggloArea">Area (m²)</Label>
                  <Input
                    id="aggloArea"
                    type="number"
                    min="0"
                    value={aggloArea}
                    onChange={(e) => setAggloArea(e.target.value)}
                    placeholder="Enter area"
                    className="ios-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aggloWeight">Weight (kg)</Label>
                  <Input
                    id="aggloWeight"
                    type="number"
                    value={aggloWeight}
                    readOnly
                    className="ios-input bg-gray-50"
                  />
                </div>
              </div>

              <Button
                onClick={handleAgglomerateCalculate}
                disabled={!aggloDensity || !aggloArea}
                className="w-full mt-6"
                size="lg"
              >
                Calculate
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Calculator;
