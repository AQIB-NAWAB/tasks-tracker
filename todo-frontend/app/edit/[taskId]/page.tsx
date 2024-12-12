'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AiOutlineLeft } from 'react-icons/ai'
import { TASK_COLORS } from '@/lib/constants'

export default function EditTaskPage() {
  const router = useRouter()
  const pathname = usePathname()
  const taskId = pathname?.split('/').pop() 

  const [title, setTitle] = useState('')
  const [selectedColor, setSelectedColor] = useState(TASK_COLORS[0].value)

  useEffect(() => {
    if (!taskId) return

    const fetchTaskData = async () => {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`)
      const data = await response.json()
      
      if (data) {
        setTitle(data.title)
        setSelectedColor(data.color)
      }
    }

    fetchTaskData()
  }, [taskId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        color: selectedColor,
      }),
    })

    const updatedTask = await response.json()

    if (updatedTask) {
      router.push('/')
    }
  }

  return (
    <section className="bg-black">
      <div className="min-h-screen p-6 w-[50%] mx-auto">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white transition-colors mb-8"
        >
          <AiOutlineLeft className="w-6 h-6" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-gray-400 text-sm">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex. Brush your teeth"
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-400 text-sm">
              Color
            </label>
            <div className="flex flex-wrap gap-3">
              {TASK_COLORS.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-10 h-10 rounded-full transition-transform ${
                    selectedColor === color.value
                      ? 'scale-110 ring-2 ring-blue-500 ring-offset-2 ring-offset-black'
                      : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2196F3] hover:bg-[#1E88E5] text-white rounded-lg py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!title.trim()}
          >
            Update Task
          </button>
        </form>
      </div>
    </section>
  )
}
