"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BlockBuilderProps {
  value: number[];
  onChange: (value: number[]) => void;
  onSubmit: (value: number[]) => void;
  maxDigits: number;
}

export function BlockBuilder({
  value,
  onChange,
  onSubmit,
  maxDigits
}: BlockBuilderProps) {
  const blocks = [100, 10, 1];
  const currentSum = value.reduce((sum, val) => sum + val, 0);

  const handleBlockClick = (blockValue: number) => {
    // Calculate the new sum if we add this block
    const newSum = currentSum + blockValue;
    
    // Check if adding this block would exceed the maximum allowed digits
    if (newSum.toString().length <= maxDigits) {
      onChange([...value, blockValue]);
    }
  };

  const handleRemoveBlock = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  // Count blocks of each value
  const blockCounts = value.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        {blocks.map((blockValue) => (
          <motion.div
            key={blockValue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => handleBlockClick(blockValue)}
              className={cn(
                "w-full h-24 text-2xl font-bold relative",
                "bg-gradient-to-br shadow-lg",
                blockValue === 100 && "from-purple-500 to-purple-600",
                blockValue === 10 && "from-blue-500 to-blue-600",
                blockValue === 1 && "from-green-500 to-green-600"
              )}
              disabled={currentSum.toString().length > maxDigits}
            >
              <span>{blockValue}</span>
              {blockCounts[blockValue] > 0 && (
                <span className="absolute top-2 right-2 text-sm bg-white/20 rounded-full w-6 h-6 flex items-center justify-center">
                  {blockCounts[blockValue]}
                </span>
              )}
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2 max-w-md">
          {value.map((block, index) => (
            <motion.div
              key={`${block}-${index}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <Button
                variant="outline"
                className={cn(
                  "w-16 h-16 text-xl font-bold",
                  block === 100 && "text-purple-600 border-purple-200 hover:border-purple-400",
                  block === 10 && "text-blue-600 border-blue-200 hover:border-blue-400",
                  block === 1 && "text-green-600 border-green-200 hover:border-green-400"
                )}
                onClick={() => handleRemoveBlock(index)}
              >
                {block}
              </Button>
            </motion.div>
          ))}
        </div>
        
        <div className="text-xl font-bold flex items-center gap-2">
          <span>Current Value:</span>
          <span className="text-primary">{currentSum}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => onSubmit(value)}
          className="px-8 py-3 text-lg"
          disabled={value.length === 0}
        >
          Check Answer
        </Button>
      </div>
    </div>
  );
}