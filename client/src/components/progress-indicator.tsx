"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
  onStepClick?: (step: number) => void
  completedSteps: number[]
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  stepLabels,
  onStepClick,
  completedSteps,
}: ProgressIndicatorProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = completedSteps.includes(stepNumber)
          const isCurrent = stepNumber === currentStep
          const isClickable = isCompleted && onStepClick

          return (
            <div key={stepNumber} className="flex items-center">
              <motion.div
                className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isCurrent
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-gray-300 text-gray-500"
                } ${isClickable ? "cursor-pointer hover:scale-105" : ""}`}
                onClick={() => isClickable && onStepClick(stepNumber)}
                whileHover={isClickable ? { scale: 1.05 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{stepNumber}</span>
                )}
              </motion.div>

              <div className="ml-3 text-left">
                <p
                  className={`text-sm font-medium ${
                    isCurrent ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  Step {stepNumber}
                </p>
                <p
                  className={`text-xs ${
                    isCurrent ? "text-blue-500" : isCompleted ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  {stepLabels[index]}
                </p>
              </div>

              {index < totalSteps - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    completedSteps.includes(stepNumber + 1) || completedSteps.includes(stepNumber)
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
