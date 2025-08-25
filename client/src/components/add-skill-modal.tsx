"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface AddSkillModalProps {
  isOpen: boolean
  onClose: () => void
  onAddSkill: (skill: { skill: string; level: number; verified: boolean }) => void
}

export function AddSkillModal({ isOpen, onClose, onAddSkill }: AddSkillModalProps) {
  const [skillName, setSkillName] = useState("")
  const [proficiency, setProficiency] = useState("50")
  const [isVerified, setIsVerified] = useState(false)

  const handleSubmit = () => {
    if (skillName.trim()) {
      onAddSkill({
        skill: skillName.trim(),
        level: Number.parseInt(proficiency),
        verified: isVerified,
      })
      setSkillName("")
      setProficiency("50")
      setIsVerified(false)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Skill</DialogTitle>
          <DialogDescription>Add a new skill to your profile. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skillName" className="text-right">
              Skill
            </Label>
            <Input
              id="skillName"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., React, Python"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="proficiency" className="text-right">
              Proficiency
            </Label>
            <Select value={proficiency} onValueChange={setProficiency}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select proficiency" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    {level}%
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isVerified" className="text-right">
              Verified
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Checkbox
                id="isVerified"
                checked={isVerified}
                onCheckedChange={(checked) => setIsVerified(checked as boolean)}
              />
              <Label htmlFor="isVerified" className="text-sm">
                This skill is verified
              </Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Skill</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
