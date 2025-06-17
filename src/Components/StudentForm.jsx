import { useState } from 'react';

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const StudentForm = () => {
  const [formData, setFormData] = useState({ name: "", dob: "", address: "", branch: "", age: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === 'dob' && value ? { age: calculateAge(value) } : {}),
    });
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z ]+$/;

    if (!formData.name || !nameRegex.test(formData.name)) newErrors.name = 'Enter a valid name (alphabets only)';
    if (!formData.dob || new Date(formData.dob) >= new Date()) newErrors.dob = 'Enter a valid past date';
    if (!formData.address || formData.address.length < 10) newErrors.address = 'Address must be at least 10 characters';
    if (!formData.branch) newErrors.branch = 'Please select a branch';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    if (validate()) setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Student Registration</h1>

      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full border p-2 rounded-xl" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Date of Birth</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="mt-1 w-full border p-2 rounded-xl" />
        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Address</label>
        <textarea name="address" value={formData.address} onChange={handleChange} className="mt-1 w-full border p-2 rounded-xl" />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Branch</label>
        <select name="branch" value={formData.branch} onChange={handleChange} className="mt-1 w-full border p-2 rounded-xl">
          <option value="">-- Select Branch --</option>
          <option value="CS">CS</option>
          <option value="IT">IT</option>
          <option value="E&TC">E&TC</option>
          <option value="Mechanical">Mechanical</option>
        </select>
        {errors.branch && <p className="text-red-500 text-sm">{errors.branch}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Age</label>
        <input type="text" name="age" value={formData.age} readOnly className="mt-1 w-full border p-2 rounded-xl bg-gray-100" />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700">Submit</button>

      {success && <p className="text-green-600 font-medium text-center mt-2">Form submitted successfully!</p>}
    </form>
  );
};

export default StudentForm;