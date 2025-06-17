import { useState } from "react";

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const SimpleForm = () => {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    address: "",
    branch: "",
    age: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };

    if (name === "dob") {
      updatedForm.age = calculateAge(value);
    }

    setForm(updatedForm);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Student Registration
        </h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Address
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your address"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Branch
          </label>
          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Branch --</option>
            <option value="CS">CS</option>
            <option value="IT">IT</option>
            <option value="E&TC">E&TC</option>
            <option value="Mechanical">Mechanical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Age
          </label>
          <input
            type="text"
            name="age"
            value={form.age}
            readOnly
            className="w-full mt-1 p-2 bg-gray-100 border border-gray-300 rounded-xl"
            placeholder="Auto-calculated"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
        >
          Submit
        </button>

        {submitted && (
          <p className="text-green-600 text-center font-medium">
            Form submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default SimpleForm;
