
import { useState } from "react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/utils/calculatorUtils";

const Calculator = () => {
  // Full Line Calculator state
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [density, setDensity] = useState<string>("");
  const [thickness, setThickness] = useState<string>("");
  const [area, setArea] = useState<string>("");

  // Agglomerate Calculator state
  const [selectedAggloProduct, setSelectedAggloProduct] = useState<string>("");
  const [consumption, setConsumption] = useState<string>("");
  const [aggloArea, setAggloArea] = useState<string>("");
  const [aggloWeight, setAggloWeight] = useState<string>("");

  // Calculate Weight for Full Line
  const handleFullLineCalculate = () => {
    const weightNum = parseFloat(weight);
    const densityNum = parseFloat(density);
    const thicknessNum = parseFloat(thickness);
    const areaNum = parseFloat(area);

    // Determine which value to calculate
    if (!weight && density && thickness && area) {
      setWeight((densityNum * thicknessNum * areaNum).toFixed(2));
    } else if (weight && !density && thickness && area) {
      setDensity((weightNum / (thicknessNum * areaNum)).toFixed(2));
    } else if (weight && density && !thickness && area) {
      setThickness((weightNum / (densityNum * areaNum)).toFixed(2));
    } else if (weight && density && thickness && !area) {
      setArea((weightNum / (densityNum * thicknessNum)).toFixed(2));
    }
  };

  // Clear inputs for Full Line Calculator
  const handleClearInputs = () => {
    setWeight("");
    setDensity("");
    setThickness("");
    setArea("");
    setSelectedProduct("");
  };

  // Calculate Weight for Agglomerate
  const handleAgglomerateCalculate = () => {
    const consumptionNum = parseFloat(consumption);
    const aggloAreaNum = parseFloat(aggloArea);

    if (consumptionNum && aggloAreaNum) {
      setAggloWeight((consumptionNum * aggloAreaNum).toFixed(2));
    }
  };

  // Clear inputs for Agglomerate Calculator
  const handleAggloClearInputs = () => {
    setConsumption("");
    setAggloArea("");
    setAggloWeight("");
    setSelectedAggloProduct("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 px-4"
    >
      <div className="max-w-md mx-auto space-y-6">
        {/* Product Guide */}
        <div className="ios-card p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Guide</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">Cold Plastics</h3>
              <div className="space-y-2">
                <p className="text-sm"><span className="font-medium">PlastiRoute® CSP:</span> Cold spray plastic for road marking with excellent durability.</p>
                <p className="text-sm"><span className="font-medium">PlastiRoute® RP:</span> Reactive plastic system for manual application with rollers.</p>
                <p className="text-sm"><span className="font-medium">PlastiRoute® FP:</span> Flow-able cold plastic system for automated machine application.</p>
              </div>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">Specialty Products</h3>
              <div className="space-y-2">
                <p className="text-sm"><span className="font-medium">PlastiRoute® SpotLine:</span> Specialized for spot marking and symbol applications.</p>
                <p className="text-sm"><span className="font-medium">PlastiRoute® RollPlast:</span> Cold plastic for manual application with excellent skid resistance.</p>
                <p className="text-sm"><span className="font-medium">PlastiRoute® RollGrip:</span> Anti-skid surface treatment for critical areas.</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Spray Applications</h3>
              <div className="space-y-2">
                <p className="text-sm"><span className="font-medium">PlastiRoute® SprayPlast:</span> Sprayable cold plastic for large-scale road marking.</p>
                <p className="text-sm"><span className="font-medium">PlastiRoute® SprayGrip:</span> Spray-applied anti-skid treatment for various surfaces.</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="fullLine" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fullLine">Full Line Calculator</TabsTrigger>
            <TabsTrigger value="agglomerate">Agglomerate Calculator</TabsTrigger>
          </TabsList>

          {/* Full Line Calculator */}
          <TabsContent value="fullLine">
            <div className="ios-card p-6 relative">
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Full Line Calculator</h1>

              {/* Clear Button */}
              <Button
                onClick={handleClearInputs}
                className="absolute top-4 right-4 bg-red-500 text-white hover:bg-red-600"
              >
                Clear
              </Button>

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

                {/* Inputs */}
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    min="0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter weight or leave blank to calculate"
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
                    placeholder="Enter density or leave blank to calculate"
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
                    placeholder="Enter thickness or leave blank to calculate"
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
                    placeholder="Enter area or leave blank to calculate"
                    className="ios-input"
                  />
                </div>
              </div>

              <Button
                onClick={handleFullLineCalculate}
                disabled={
                  !(
                    (weight && density && thickness) ||
                    (weight && density && area) ||
                    (weight && thickness && area) ||
                    (density && thickness && area)
                  )
                }
                className="w-full mt-6"
                size="lg"
              >
                Calculate
              </Button>
            </div>
          </TabsContent>

          {/* Agglomerate Calculator */}
          <TabsContent value="agglomerate">
            <div className="ios-card p-6 relative">
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Agglomerate Calculator</h1>

              {/* Clear Button */}
              <Button
                onClick={handleAggloClearInputs}
                className="absolute top-4 right-4 bg-red-500 text-white hover:bg-red-600"
              >
                Clear
              </Button>

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

                {/* Inputs */}
                <div className="space-y-2">
                  <Label htmlFor="consumption">Consumption (kg/m²)</Label>
                  <Input
                    id="consumption"
                    type="number"
                    min="0"
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                    placeholder="Enter consumption"
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
                disabled={!consumption || !aggloArea}
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
