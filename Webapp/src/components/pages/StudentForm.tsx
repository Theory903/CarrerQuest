import React, { useState, ChangeEvent, FormEvent} from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Navbar from '../Navbar';
import Footer from '../Footer';

interface FormData {
  name: string;
  email: string;
  phone: string;
  academicRecords: string[];
  interests: string;
  extracurricular: string;
  careerAspirations: string;
  skills: string;
}

const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    academicRecords: ['', '', '', '', ''],
    interests: '',
    extracurricular: '',
    careerAspirations: '',
    skills: '',
  });
  
  const router = useRouter(); // Initialize the router

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAcademicChange = (index: number, value: string) => {
    const newRecords = [...formData.academicRecords];
    newRecords[index] = value;
    setFormData((prev) => ({
      ...prev,
      academicRecords: newRecords,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);

    // Navigate to the dashboard
    router.push('/quiz');
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8 text-white">Student Registration</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Personal Information</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
                required
              />
            </div>
          </div>

          {/* Academic Records Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Academic Records (Past 5 Years)</h3>
            <p className="text-sm text-gray-400 mb-4">Enter Google Drive links for academic results.</p>
            {formData.academicRecords.map((record, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-300">Year {index + 1}</label>
                <input
                  type="text"
                  value={record}
                  onChange={(e) => handleAcademicChange(index, e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                />
              </div>
            ))}
          </div>

          {/* Interests and Skills */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Interests and Skills</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Interests</label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Skills</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
              />
            </div>
          </div>

          {/* Career Aspirations */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Career Aspirations</h3>
            <textarea
              name="careerAspirations"
              value={formData.careerAspirations}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default StudentForm;
