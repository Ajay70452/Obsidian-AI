"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

type FormData = {
  name: string
  email: string
  companyName: string
  role: string
  otherRole: string
  purposes: string[]
  rating: number
}

const purposes = [
  {
    id: "research-leads",
    label: "To quickly research a list of leads",
  },
  {
    id: "save-time",
    label: "To save time on lead research for personalized outreach",
  },
  {
    id: "generate-hooks",
    label: "To generate compelling outreach hooks",
  },
  {
    id: "understand-initiatives",
    label: "To better understand a company's key initiatives/pain points",
  },
  {
    id: "quick-summary",
    label: "To get a quick summary of a lead's company and background",
  },
]

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    companyName: "",
    role: "",
    otherRole: "",
    purposes: [],
    rating: 0,
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
    // Clear error when user selects
    if (errors.role) {
      setErrors((prev) => ({ ...prev, role: undefined }))
    }
  }

  const handlePurposeChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      purposes: checked ? [...prev.purposes, id] : prev.purposes.filter((p) => p !== id),
    }))
    // Clear error when user checks
    if (errors.purposes) {
      setErrors((prev) => ({ ...prev, purposes: undefined }))
    }
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
    // Clear error when user rates
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required"
    }

    if (!formData.role) {
      newErrors.role = "Role is required"
    } else if (formData.role === "Other" && !formData.otherRole.trim()) {
      newErrors.otherRole = "Please specify your role"
    }

    if (formData.purposes.length === 0) {
      newErrors.purposes = "Please select at least one purpose"
    }

    if (formData.rating === 0) {
      newErrors.rating = "Please provide a rating"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted:", formData)
        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          companyName: "",
          role: "",
          otherRole: "",
          purposes: [],
          rating: 0,
        })
      }, 1500)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-pureWhite rounded-2xl shadow-card border border-lightGray p-8 md:p-10">
      {isSubmitted ? (
        <div className="text-center py-10">
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-darkGray mb-4">Thank You!</h2>
          <p className="text-mediumGray mb-8">
            Your request has been submitted successfully. Our team will get back to you shortly.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-lg shadow-button transition-all duration-300 hover:translate-y-[-2px]"
          >
            Submit Another Request
          </Button>
        </div>
      ) : (
        <>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-darkGray mb-4">Request a Demo</h2>
            <p className="text-mediumGray">Fill out the form below and our team will get in touch with you shortly.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-darkGray font-medium block mb-1.5">
                  Name <span className="text-primary-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className={cn(
                    "bg-warmWhite border-lightGray text-darkGray h-12 focus:border-primary-500 focus:ring-primary-500/20",
                    errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                  )}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="text-darkGray font-medium block mb-1.5">
                  Email <span className="text-primary-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your work email"
                  className={cn(
                    "bg-warmWhite border-lightGray text-darkGray h-12 focus:border-primary-500 focus:ring-primary-500/20",
                    errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                  )}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="companyName" className="text-darkGray font-medium block mb-1.5">
                  Company Name <span className="text-primary-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                  className={cn(
                    "bg-warmWhite border-lightGray text-darkGray h-12 focus:border-primary-500 focus:ring-primary-500/20",
                    errors.companyName && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                  )}
                />
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
              </div>

              <div>
                <Label htmlFor="role" className="text-darkGray font-medium block mb-1.5">
                  Your Role <span className="text-primary-500">*</span>
                </Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger
                    id="role"
                    className={cn(
                      "bg-warmWhite border-lightGray text-darkGray h-12 focus:border-primary-500 focus:ring-primary-500/20",
                      errors.role && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                    )}
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SDR/BDR">SDR/BDR</SelectItem>
                    <SelectItem value="Account Executive">Account Executive</SelectItem>
                    <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                    <SelectItem value="Sales Operations">Sales Operations</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Founder">Founder</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
              </div>

              {formData.role === "Other" && (
                <div>
                  <Label htmlFor="otherRole" className="text-darkGray font-medium block mb-1.5">
                    Please specify your role <span className="text-primary-500">*</span>
                  </Label>
                  <Input
                    id="otherRole"
                    name="otherRole"
                    value={formData.otherRole}
                    onChange={handleInputChange}
                    placeholder="Enter your role"
                    className={cn(
                      "bg-warmWhite border-lightGray text-darkGray h-12 focus:border-primary-500 focus:ring-primary-500/20",
                      errors.otherRole && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                    )}
                  />
                  {errors.otherRole && <p className="text-red-500 text-sm mt-1">{errors.otherRole}</p>}
                </div>
              )}

              <div>
                <Label className="text-darkGray font-medium block mb-3">
                  What's your primary purpose for using Obsidian AI? <span className="text-primary-500">*</span>
                </Label>
                <div className="space-y-3">
                  {purposes.map((purpose) => (
                    <div key={purpose.id} className="flex items-start">
                      <Checkbox
                        id={purpose.id}
                        checked={formData.purposes.includes(purpose.id)}
                        onCheckedChange={(checked) => handlePurposeChange(purpose.id, checked as boolean)}
                        className="mt-1 border-lightGray text-primary-500 focus:ring-primary-500/20"
                      />
                      <Label htmlFor={purpose.id} className="ml-3 text-mediumGray font-normal cursor-pointer">
                        {purpose.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.purposes && <p className="text-red-500 text-sm mt-1">{errors.purposes}</p>}
              </div>

              <div>
                <Label className="text-darkGray font-medium block mb-3">
                  How likely are you to recommend Obsidian AI to a Friend or Colleague?{" "}
                  <span className="text-primary-500">*</span>
                </Label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="p-1 focus:outline-none focus:ring-0"
                    >
                      <Star
                        className={cn(
                          "w-8 h-8 transition-colors duration-200",
                          formData.rating >= star
                            ? "fill-primary-500 text-primary-500"
                            : "fill-transparent text-lightGray",
                        )}
                      />
                    </button>
                  ))}
                </div>
                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium px-8 py-4 rounded-lg text-lg shadow-button transition-all duration-300 hover:translate-y-[-2px] mt-8"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                "Request Demo"
              )}
            </Button>
          </form>
        </>
      )}
    </div>
  )
}
