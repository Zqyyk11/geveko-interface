import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, X, Divide, Equal } from 'lucide-react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    const fullEquation = equation + display;
    try {
      const result = eval(fullEquation);
      setHistory(prev => [...prev, `${fullEquation} = ${result}`]);
      setDisplay(result.toString());
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const Button = ({ children, onClick, className = '' }: any) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`h-14 rounded-lg text-lg font-medium transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 px-4"
    >
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div className="bg-gray-50 rounded-xl p-4 h-24 flex flex-col items-end justify-between">
            <div className="text-gray-500 text-sm">{equation}</div>
            <div className="text-3xl font-medium">{display}</div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Button onClick={clear} className="bg-soft-pink text-gray-700">
              C
            </Button>
            <Button onClick={() => handleOperator('/')} className="bg-soft-purple">
              <Divide size={20} />
            </Button>
            <Button onClick={() => handleOperator('*')} className="bg-soft-purple">
              <X size={20} />
            </Button>
            <Button onClick={() => handleOperator('-')} className="bg-soft-purple">
              <Minus size={20} />
            </Button>

            {[7, 8, 9].map(num => (
              <Button
                key={num}
                onClick={() => handleNumber(num.toString())}
                className="bg-gray-100 hover:bg-gray-200"
              >
                {num}
              </Button>
            ))}
            <Button onClick={() => handleOperator('+')} className="bg-soft-purple">
              <Plus size={20} />
            </Button>

            {[4, 5, 6].map(num => (
              <Button
                key={num}
                onClick={() => handleNumber(num.toString())}
                className="bg-gray-100 hover:bg-gray-200"
              >
                {num}
              </Button>
            ))}
            <Button onClick={calculate} className="bg-soft-purple row-span-2">
              <Equal size={20} />
            </Button>

            {[1, 2, 3].map(num => (
              <Button
                key={num}
                onClick={() => handleNumber(num.toString())}
                className="bg-gray-100 hover:bg-gray-200"
              >
                {num}
              </Button>
            ))}

            <Button
              onClick={() => handleNumber('0')}
              className="bg-gray-100 hover:bg-gray-200 col-span-2"
            >
              0
            </Button>
            <Button
              onClick={() => handleNumber('.')}
              className="bg-gray-100 hover:bg-gray-200"
            >
              .
            </Button>
          </div>
        </div>

        {history.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4">History</h3>
            <div className="space-y-2">
              {history.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-2 bg-gray-50 rounded-lg"
                >
                  {item}
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