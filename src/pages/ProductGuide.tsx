
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products } from "@/utils/calculatorUtils";

type Question = {
  id: number;
  text: string;
  options: {
    text: string;
    nextQuestion: number | null;
    products?: string[];
  }[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "What type of application are you looking for?",
    options: [
      { text: "Road marking", nextQuestion: 2 },
      { text: "Anti-skid treatment", nextQuestion: 3 },
      { text: "Spot marking and symbols", nextQuestion: null, products: ['plastiroutespotline'] }
    ]
  },
  {
    id: 2,
    text: "How will the product be applied?",
    options: [
      { text: "Spray application", nextQuestion: 4 },
      { text: "Manual application with rollers", nextQuestion: null, products: ['plastirouterp'] },
      { text: "Machine application", nextQuestion: null, products: ['plastiroutefp'] }
    ]
  },
  {
    id: 3,
    text: "How do you want to apply the anti-skid treatment?",
    options: [
      { text: "Manual application", nextQuestion: null, products: ['plastirouterollgrip'] },
      { text: "Spray application", nextQuestion: null, products: ['plastiroutespraygrip'] }
    ]
  },
  {
    id: 4,
    text: "What is your primary requirement?",
    options: [
      { text: "Maximum durability", nextQuestion: null, products: ['plastiroutecsp'] },
      { text: "Large scale application", nextQuestion: null, products: ['plastiroutesprayplast'] }
    ]
  }
];

const ProductGuide = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [recommendedProducts, setRecommendedProducts] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleOptionClick = (option: { nextQuestion: number | null; products?: string[] }) => {
    if (option.products) {
      setRecommendedProducts(option.products);
      setShowResults(true);
    } else if (option.nextQuestion) {
      setCurrentQuestion(option.nextQuestion);
    }
  };

  const resetGuide = () => {
    setCurrentQuestion(1);
    setRecommendedProducts([]);
    setShowResults(false);
  };

  const getProductName = (id: string) => {
    return products.find(p => p.id === id)?.name || id;
  };

  const currentQuestionData = questions.find(q => q.id === currentQuestion);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Product Finder</h1>
          
          {!showResults ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {currentQuestionData?.text}
              </h2>
              <div className="grid gap-4">
                {currentQuestionData?.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto py-4 px-6"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recommended Products
              </h2>
              <div className="space-y-4">
                {recommendedProducts.map((productId) => (
                  <div
                    key={productId}
                    className="border rounded-lg p-6 bg-gray-50"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {getProductName(productId)}
                    </h3>
                    <p className="text-gray-600">
                      {productId === 'plastiroutecsp' && "Cold spray plastic for road marking with excellent durability."}
                      {productId === 'plastirouterp' && "Reactive plastic system for manual application with rollers."}
                      {productId === 'plastiroutefp' && "Flow-able cold plastic system for automated machine application."}
                      {productId === 'plastiroutespotline' && "Specialized for spot marking and symbol applications."}
                      {productId === 'plastirouterollplast' && "Cold plastic for manual application with excellent skid resistance."}
                      {productId === 'plastirouterollgrip' && "Anti-skid surface treatment for critical areas."}
                      {productId === 'plastiroutesprayplast' && "Sprayable cold plastic for large-scale road marking."}
                      {productId === 'plastiroutespraygrip' && "Spray-applied anti-skid treatment for various surfaces."}
                    </p>
                  </div>
                ))}
              </div>
              <Button 
                onClick={resetGuide}
                className="mt-6"
              >
                Start Over
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductGuide;
