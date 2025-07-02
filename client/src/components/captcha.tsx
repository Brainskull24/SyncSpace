"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface CaptchaProps {
  onVerify: (isValid: boolean) => void
  show: boolean
}

export function Captcha({ onVerify, show }: CaptchaProps) {
  const [captchaText, setCaptchaText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [isVerified, setIsVerified] = useState(false)

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaText(result)
    setUserInput("")
    setIsVerified(false)
  }

  useEffect(() => {
    if (show) {
      generateCaptcha()
    }
  }, [show])

  useEffect(() => {
    const verified = userInput.toLowerCase() === captchaText.toLowerCase() && userInput.length > 0
    setIsVerified(verified)
    onVerify(verified)
  }, [userInput, captchaText, onVerify])

  if (!show) return null

  return (
    <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Security Verification</span>
        <Button type="button" variant="ghost" size="sm" onClick={generateCaptcha} className="h-8 w-8 p-0">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-3">
        <div className="bg-white border border-gray-300 rounded px-3 py-2 font-mono text-lg tracking-wider select-none">
          {captchaText}
        </div>
        <input
          type="text"
          placeholder="Enter code"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {userInput && (
        <div className={`text-sm ${isVerified ? "text-green-600" : "text-red-600"}`}>
          {isVerified ? "✓ Verification successful" : "✗ Code does not match"}
        </div>
      )}
    </div>
  )
}
