"use client";

import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface NumberSorterProps {
  numbers: number[];
  onSubmit: (sortedNumbers: number[]) => void;
}

export function NumberSorter({ numbers, onSubmit }: NumberSorterProps) {
  const [items, setItems] = useState(numbers);

  return (
    <div className="space-y-8">
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="space-y-4"
      >
        {items.map((number) => (
          <Reorder.Item
            key={number}
            value={number}
            className="cursor-grab active:cursor-grabbing"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-white rounded-lg shadow-md text-xl font-bold
                text-center border-2 border-blue-200 hover:border-blue-400
                transition-colors duration-200"
            >
              {number}
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <div className="flex justify-center">
        <Button
          onClick={() => onSubmit(items)}
          className="px-8 py-3 text-lg"
        >
          Check Order
        </Button>
      </div>
    </div>
  );
}