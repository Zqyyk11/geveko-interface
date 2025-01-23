import { useState } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from '@/types/calculator';
import { products, calculateFullLine, calculateAgglomerate, canCalculateFullLine, canCalculateAgglomerate } from '@/utils/calculatorUtils';

const Calculator = () => {
  // Full Line Calculator state
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [density, setDensity] = useState<string>('');
  const [thickness, setThickness] = useState<string>('');
  const [area, setArea] = useState<string>('');

  // Agglomerate Calculator state
  const [aggloDensity, setAggloDensity] = useState<string>('');
  const [aggloArea, setAggloArea] = useState<string>('');
  const [kgNeeded, setKgNeeded] = useState<string>('');

  const handleFullLineCalculate = () => {
    const result = calculateFullLine(weight, density, thickness, area);
    setWeight(result.weight);
    setDensity(result.density);
    setThickness(result.thickness);
    setArea(result.area);
  };

  const handleAgglomerateCalculate = () => {
    const result = calculateAgglomerate(aggloDensity, aggloArea);
    setKgNeeded(result);
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

          <TabsContent value="fullLine">
            <div className="ios-card p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Full Line Calculator</h1>
              
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
                    min="0"
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
                    min="0"
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
                    min="0"
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
                    min="0"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Enter area"
                    className="ios-input"
                  />
                </div>
              </div>

              <Button
                onClick={handleFullLineCalculate}
                disabled={!canCalculateFullLine([weight, density, thickness, area])}
                className="w-full mt-6"
                size="lg"
              >
                Calculate
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="agglomerate">
            <div className="ios-card p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Agglomerate Calculator</h1>
              
              <div className="space-y-4">
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
                  <Label htmlFor="kgNeeded">KG Needed</Label>
                  <Input
                    id="kgNeeded"
                    type="number"
                    value={kgNeeded}
                    readOnly
                    className="ios-input bg-gray-50"
                  />
                </div>
              </div>

              <Button
                onClick={handleAgglomerateCalculate}
                disabled={!canCalculateAgglomerate(aggloDensity, aggloArea)}
                className="w-full mt-6"
                size="lg"
              >
                Calculate KG Needed
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Calculator;