'use client'

import { TASK_COLORS } from '@/lib/constants'

interface ColorPickerProps {
  selectedColor: string
  onColorSelect: (color: string) => void
}

export function ColorPicker({ selectedColor, onColorSelect }: ColorPickerProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {TASK_COLORS.map((color) => (
        <button
          key={color.id}
          className={`w-8 h-8 rounded-full transition-transform 
            ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-blue-500 ring-offset-background scale-110' : ''}`}
          style={{ backgroundColor: color.value }}
          onClick={() => onColorSelect(color.value)}
          aria-label={`Select color ${color.id}`}
        />
      ))}
    </div>
  )
}
