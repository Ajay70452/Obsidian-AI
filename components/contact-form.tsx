"use client"; // Keep this if using App Router

import type React from "react";

import { useEffect, useState } from "react"; // Keep useState for API message and success/error state
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";


// Import hooks from react-hook-form
import { useForm, useWatch, Controller } from "react-hook-form";
// Define the form data structure - this is what react-hook-form will give us
type FormData = {
  name: string;
  email: string;
  companyName: string;
  role: string;
  otherRole: string; // This will only be relevant if role is 'Other'
  purposes: string[];
  rating: number;
  // Fields required by Web3Forms (often added as hidden inputs)
  access_key: string; // Your Web3Forms access key
  subject?: string; // Dynamic subject line
  from_name?: string; // Optional sender name
  botcheck?: boolean; // Honeypot bot detection
};

const purposesOptions = [ // Renamed to avoid conflict with internal state name
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
];

// >>> Replace 'YOUR_PUBLIC_ACCESS_KEY_HERE' with your actual Web3Forms key <<<
const WEB3FORMS_ACCESS_KEY = "446f13bf-e941-4427-a8be-06f643405712";

export default function ContactForm() {
  // --- React Hook Form Initialization ---
  const {
    register,
    handleSubmit,
    setValue, // To manually set values for custom components (Select, Checkbox, Rating)
    watch, // To read values for rendering custom components
    control, // Needed for useWatch
    reset, // To clear the form after submission
    formState: { errors, isSubmitting, isSubmitSuccessful }, // Get errors and submission state
  } = useForm<FormData>({
    mode: "onTouched", // Validate fields when they are blurred
    defaultValues: { // Optional: Set initial values
      name: "",
      email: "",
      companyName: "",
      role: "",
      otherRole: "",
      purposes: [],
      rating: 0,
      access_key: WEB3FORMS_ACCESS_KEY, // Set the access key here or in hidden input
      from_name: "Website Contact Form", // Optional: Set a default sender name
    },
  });

  // --- State for API Response ---
  const [apiMessage, setApiMessage] = useState("");
  const [isApiSuccess, setIsApiSuccess] = useState(false);

  // --- Watch fields needed for conditional logic or dynamic values ---
  const watchRole = watch("role"); // Watch the role field for conditional rendering
  const watchPurposes = watch("purposes"); // Watch purposes for checkbox checked state
  const watchRating = watch("rating"); // Watch rating for star fill state

  // Use useWatch for specific performance needs or if watching many fields
  const userName = useWatch({ control, name: "name", defaultValue: "Someone" });

  // --- Effect to set the subject line dynamically (like in the sample) ---
  useEffect(() => {
      setValue('subject', `${userName} - Demo Request from Website`);
  }, [userName, setValue]);


  // --- Submission Handler ---
  // This function is called by react-hook-form's handleSubmit *after* validation passes
  const onSubmit = async (data: FormData) => {
    console.log("Form data before sending:", data); // Log data being sent

    // Prepare data for Web3Forms - often their API accepts the structure from react-hook-form directly
    // But we should handle the 'Other' role case and potentially format complex fields
    const dataToSend = {
        ...data, // Include all data from the form, including hidden fields
        role: data.role === 'Other' ? data.otherRole : data.role, // Send the 'otherRole' value if 'Role' is 'Other'
        purposes: data.purposes.join(', '), // Join purposes array into a string
        // No need to manually add access_key, subject, etc. if they are registered hidden inputs
    };


    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(dataToSend, null, 2), // Send the prepared data
      });

      const json = await response.json();

      if (json.success) {
        setIsApiSuccess(true);
        setApiMessage(json.message);
        // Note: isSubmitSuccessful from useForm becomes true automatically after submission attempt
        reset(); // Reset the form fields on success
      } else {
        setIsApiSuccess(false);
        setApiMessage(json.message || "An unknown error occurred."); // Use message from API or fallback
        console.error("Web3Forms Error:", json);
        // Don't reset form on error so user can fix issues
      }
    } catch (error) {
      setIsApiSuccess(false);
      setApiMessage("Failed to connect to the server. Please try again.");
      console.error("Network or fetch error:", error);
    }
    // react-hook-form automatically sets isSubmitting to false and isSubmitSuccessful to true/false
  };


  // --- Render Logic ---
  return (
    <div className="w-full max-w-3xl mx-auto bg-pureWhite rounded-2xl shadow-card border border-lightGray p-8 md:p-10">
      {/* Show result message or form based on isSubmitSuccessful state from react-hook-form */}
      {isSubmitSuccessful ? (
        <div className="text-center py-10">
          {isApiSuccess ? (
            <>
              {/* Success Icon */}
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
                 {apiMessage || "Your request has been submitted successfully. Our team will get back to you shortly."}
              </p>
              {/* Use reset() to clear fields and hide the success message (isSubmitSuccessful becomes false) */}
              <Button
                onClick={() => reset()}
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-lg shadow-button transition-all duration-300 hover:translate-y-[-2px]"
              >
                Submit Another Request
              </Button>
            </>
          ) : (
             <>
              {/* Error Icon */}
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                   className="w-10 h-10 text-red-500"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-darkGray mb-4">Submission Failed</h2>
              <p className="text-mediumGray mb-8">
                 {apiMessage || "An error occurred while submitting your form. Please try again."}
              </p>
               {/* Use reset() to clear fields and hide the error message, showing the form again */}
              <Button
                onClick={() => reset()}
                 className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg shadow-button transition-all duration-300 hover:translate-y-[-2px]"
              >
                Try Again
              </Button>
             </>
          )}
        </div>
      ) : (
        // --- Form Display ---
        <>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-darkGray mb-4">Request a Demo</h2>
            <p className="text-mediumGray">Fill out the form below and our team will get in touch with you shortly.</p>
          </div>

          {/* Use handleSubmit from react-hook-form to wrap your onSubmit function */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* --- Hidden Fields Required by Web3Forms Sample --- */}
             <input type="hidden" value={WEB3FORMS_ACCESS_KEY} {...register("access_key")} />
             <input type="hidden" {...register("subject")} /> {/* Value set by useEffect */}
             <input type="hidden" value="Website Contact Form" {...register("from_name")} /> {/* Optional sender name */}
             <input
                type="checkbox" // Keep type as checkbox for honeypot logic
                id="botcheck" // Add ID for label association if needed elsewhere, though hidden
                className="hidden" // Keep hidden
                style={{ display: "none" }} // Ensure hidden
                {...register("botcheck")} // Register the botcheck field
             />


            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-darkGray font-medium block mb-1.5">
                  Name <span className="text-primary-500">*</span>
                </Label>
                {/* Use register for the input */}
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className={cn(
                    "bg-warmWhite border-lightGray text-darkGray h-12 focus:border-primary-500 focus:ring-primary-500/20",
                    errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                  )}
                  {...register("name", { required: "Name is required" })} // Add validation rules
                />
                {/* Display error message from react-hook-form errors object */}
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="text-darkGray font-medium block mb-1.5">
                  Email <span className="text-primary-500">*</span>
                </Label>
                {/* Use register for the input */}
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your work email"
                  className={cn(
                    "bg-warmWhite border-lightGray text-darkGray h-12 focus:border-primary-500 focus:ring-primary-500/20",
                    errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                  )}
                   {...register("email", {
                       required: "Email is required",
                       pattern: {
                           value: /\S+@\S+\.\S+/, // Use a slightly more robust email pattern
                           message: "Email is invalid"
                       }
                    })} // Add validation rules
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="companyName" className="text-darkGray font-medium block mb-1.5">
                  Company Name <span className="text-primary-500">*</span>
                </Label>
                {/* Use register for the input */}
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  className={cn(
                    "bg-warmWhite border-lightGray text-darkGray h-12 focus:border-primary-500 focus:ring-primary-500/20",
                    errors.companyName && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                  )}
                   {...register("companyName", { required: "Company name is required" })} // Add validation rules
                />
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
              </div>

              <div>
                <Label htmlFor="role" className="text-darkGray font-medium block mb-1.5">
                  Your Role <span className="text-primary-500">*</span>
                </Label>
                {/* Use setValue and watch for the custom Select component */}
                <Select
                   value={watchRole} // Use watch to get current value for rendering
                   onValueChange={(value) => setValue("role", value, { shouldValidate: true, shouldDirty: true })} // Update form state and trigger validation
                >
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
                 {/* Manual validation message display as Select isn't directly registered */}
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                {/* We also need to register the role field so its value is included in the data object */}
                 <input type="hidden" {...register("role", { required: "Role is required" })} /> {/* Hidden input for validation */}

              </div>

               {/* Conditional rendering based on watched role value */}
              {watchRole === "Other" && (
                <div>
                  <Label htmlFor="otherRole" className="text-darkGray font-medium block mb-1.5">
                    Please specify your role <span className="text-primary-500">*</span>
                  </Label>
                   {/* Use register for the input */}
                  <Input
                    id="otherRole"
                    placeholder="Enter your role"
                    className={cn(
                      "bg-warmWhite border-lightGray text-darkGray h-12 focus:border-primary-500 focus:ring-primary-500/20",
                      errors.otherRole && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                    )}
                    {...register("otherRole", { required: watchRole === 'Other' ? "Please specify your role" : false })} // Required only if Role is 'Other'
                  />
                  {errors.otherRole && <p className="text-red-500 text-sm mt-1">{errors.otherRole.message}</p>}
                </div>
              )}

<div>
  <Label className="text-darkGray font-medium block mb-3">
    What's your primary purpose for using Obsidian AI?{" "}
    <span className="text-primary-500">*</span>
  </Label>

  {/* --- Start of Controller for Purposes --- */}
  <Controller
    name="purposes" // Name of the field
    control={control} // The control object from useForm
    rules={{
      // Validation rules for this field
      validate: (value) =>
        (value && value.length > 0) || "Please select at least one purpose", // Custom validation checks if array has items
    }}
    render={({ field, fieldState }) => (
      // field object contains { onChange, onBlur, value, name, ref }
      // fieldState contains { invalid, isTouched, isDirty, error }
      <div className="space-y-3">
        {purposesOptions.map((purpose) => (
          <div key={purpose.id} className="flex items-start">
            <Checkbox
              id={purpose.id}
              // Use field.value to determine if this checkbox is checked
              checked={field.value?.includes(purpose.id)}
              // Use field.onChange to update the array value in react-hook-form state
              onCheckedChange={(checked) => {
                const currentPurposes = field.value || []; // Get current value from field
                const newPurposes = checked
                  ? [...currentPurposes, purpose.id]
                  : currentPurposes.filter((p) => p !== purpose.id);
                field.onChange(newPurposes); // Pass the new array to onChange
              }}
              className="mt-1 border-lightGray text-primary-500 focus:ring-primary-500/20"
            />
            <Label
              htmlFor={purpose.id}
              className="ml-3 text-mediumGray font-normal cursor-pointer"
            >
              {purpose.label}
            </Label>
          </div>
        ))}
        {/* Display error message using fieldState.error */}
        {fieldState.error && (
          <p className="text-red-500 text-sm mt-1">
            {fieldState.error.message}
          </p>
        )}
      </div>
    )}
  />
  {/* --- End of Controller for Purposes --- */}

</div>

              <div>
                <Label className="text-darkGray font-medium block mb-3">
                  How likely are you to recommend Obsidian AI to a Friend or Colleague?{" "}
                  <span className="text-primary-500">*</span>
                </Label>
                 {/* Use setValue and watch for the custom Star rating */}
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button" // Important: type="button" to prevent accidental form submission
                      onClick={() => setValue("rating", star, { shouldValidate: true, shouldDirty: true })} // Update form state and trigger validation
                      className="p-1 focus:outline-none focus:ring-0"
                    >
                      <Star
                        className={cn(
                          "w-8 h-8 transition-colors duration-200",
                          watchRating >= star // Use watch to get current value for rendering
                            ? "fill-primary-500 text-primary-500"
                            : "fill-transparent text-lightGray",
                        )}
                      />
                    </button>
                  ))}
                </div>
                 {/* Manual validation message display */}
                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
                 {/* Hidden input to register the rating field */}
                 <input type="hidden" {...register("rating", { validate: value => value > 0 || "Please provide a rating" })} /> {/* Validation rule */}
              </div>
            </div>

             {/* Use isSubmitting from react-hook-form for button state */}
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
       {/* Optional: Add Web3Forms branding if required by their terms */}
       {isSubmitSuccessful && ( // Only show branding after submission attempt
            <p className="text-center text-sm mt-4">
              <a href="https://web3forms.com/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">
                 Forms by Web3Forms
              </a>
            </p>
       )}

    </div>
  );
}