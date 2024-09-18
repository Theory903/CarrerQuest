import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Phone, BookOpen, Star, Briefcase, CheckCircle, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FormData {
  name: string;
  email: string;
  phone: string;
  academicRecords: string[];
  interests: string;
  skills: string;
  careerAspirations: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  academicRecords: ['', '', '', '', ''],
  interests: '',
  skills: '',
  careerAspirations: '',
};

const sections = [
  { title: "Personal Information", icon: <User className="text-blue-400" /> },
  { title: "Academic Records", icon: <BookOpen className="text-green-400" /> },
  { title: "Interests and Skills", icon: <Star className="text-yellow-400" /> },
  { title: "Career Aspirations", icon: <Briefcase className="text-purple-400" /> },
];

const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAcademicChange = (index: number, value: string) => {
    const newRecords = [...formData.academicRecords];
    newRecords[index] = value;
    setFormData((prev) => ({ ...prev, academicRecords: newRecords }));
  };

  const validateSection = (section: number): boolean => {
    const newErrors: Partial<FormData> = {};
    switch (section) {
      case 0:
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.phone.trim()) newErrors.phone = "Phone is required";
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
        break;
      case 1:
        // Validate academic records if needed
        break;
      case 2:
        if (!formData.interests.trim()) newErrors.interests = "Interests are required";
        if (!formData.skills.trim()) newErrors.skills = "Skills are required";
        break;
      case 3:
        if (!formData.careerAspirations.trim()) newErrors.careerAspirations = "Career aspirations are required";
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection(currentSection)) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => prev - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateSection(currentSection)) {
      return;
    }
    
    setIsSubmitting(true);
    setGeneralError(null);
    
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(formData);
      setSubmitSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/quiz');
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
      setGeneralError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = (section: number) => {
    switch (section) {
      case 0:
        return (
          <>
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              icon={<User size={18} />}
              error={errors.name}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              icon={<Mail size={18} />}
              error={errors.email}
            />
            <InputField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              icon={<Phone size={18} />}
              error={errors.phone}
            />
          </>
        );
      case 1:
        return (
          <>
            <p className="text-sm text-gray-400 mb-2">Enter Google Drive links for academic results.</p>
            {formData.academicRecords.map((record, index) => (
              <InputField
                key={index}
                label={`Year ${index + 1}`}
                value={record}
                onChange={(e) => handleAcademicChange(index, e.target.value)}
              />
            ))}
          </>
        );
      case 2:
        return (
          <>
            <TextAreaField
              label="Interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              error={errors.interests}
            />
            <TextAreaField
              label="Skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              error={errors.skills}
            />
          </>
        );
      case 3:
        return (
          <TextAreaField
            label="Career Aspirations"
            name="careerAspirations"
            value={formData.careerAspirations}
            onChange={handleChange}
            error={errors.careerAspirations}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-between">
      <div className="container mx-auto p-6 flex justify-center">
        <div className="w-full max-w-2xl">
          <motion.h2
            className="text-3xl font-bold mb-8 text-white text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Student Registration
          </motion.h2>

          <div className="mb-6 flex justify-between">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${
                  index <= currentSection ? 'text-blue-400' : 'text-gray-500'
                }`}
              >
                {section.icon}
                <span className="text-xs mt-1">{section.title}</span>
              </div>
            ))}
          </div>

          {generalError && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{generalError}</AlertDescription>
            </Alert>
          )}

          {submitSuccess && (
            <Alert className="mb-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Registration successful! Redirecting to quiz...</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-white">
                {sections[currentSection].title}
              </h3>
              {renderSection(currentSection)}
            </motion.div>

            <div className="flex justify-between mt-6">
              {currentSection > 0 && (
                <motion.button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Previous
                </motion.button>
              )}
              {currentSection < sections.length - 1 ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField: React.FC<{
  label: string;
  name?: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  error?: string;
}> = ({ label, name, type = "text", value, onChange, icon, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          icon ? 'pl-10' : ''
        } ${error ? 'border-red-500' : ''}`}
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const TextAreaField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}> = ({ label, name, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        error ? 'border-red-500' : ''
      }`}
      rows={4}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default StudentForm;