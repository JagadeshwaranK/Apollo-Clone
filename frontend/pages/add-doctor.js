import React, { useState } from 'react';
import Head from 'next/head';
import styles from './add-doctor.module.css';

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    qualifications: '',
    experience: '',
    location: '',
    fees: '',
    rating: '',
    availability: '',
    consultationMode: [],
    languages: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      let newValues = formData.consultationMode ? [...formData.consultationMode] : [];
      if (checked) {
        newValues.push(value);
      } else {
        newValues = newValues.filter((v) => v !== value);
      }
      setFormData({ ...formData, consultationMode: newValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare data
    const dataToSend = {
      ...formData,
      qualifications: formData.qualifications.split(',').map(q => q.trim()),
      availability: formData.availability.split(',').map(a => a.trim()),
      languages: formData.languages.split(',').map(l => l.trim()),
      experience: Number(formData.experience),
      fees: Number(formData.fees),
      rating: Number(formData.rating),
    };

    try {
      const res = await fetch('http://localhost:5000/api/doctors/add-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage('Doctor added successfully!');
        setFormData({
          name: '',
          specialty: '',
          qualifications: '',
          experience: '',
          location: '',
          fees: '',
          rating: '',
          availability: '',
          consultationMode: [],
          languages: '',
        });
      } else {
        setMessage('Error: ' + result.error);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Add Doctor - Apollo247 Clone</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.h1}>Add Doctor</h1>
        {message && <p className={styles.message}>{message}</p>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Specialty:
            <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} required />
          </label>
          <label>
            Qualifications (comma separated):
            <input type="text" name="qualifications" value={formData.qualifications} onChange={handleChange} />
          </label>
          <label>
            Experience (years):
            <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
          </label>
          <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </label>
          <label>
            Fees:
            <input type="number" name="fees" value={formData.fees} onChange={handleChange} required />
          </label>
          <label>
            Rating (0-5):
            <input type="number" step="0.1" min="0" max="5" name="rating" value={formData.rating} onChange={handleChange} required />
          </label>
          <label>
            Availability (comma separated days):
            <input type="text" name="availability" value={formData.availability} onChange={handleChange} />
          </label>
          <fieldset className={styles.fieldset}>
            <legend>Consultation Mode:</legend>
            <label>
              <input
                type="checkbox"
                name="consultationMode"
                value="hospital"
                checked={formData.consultationMode.includes('hospital')}
                onChange={handleChange}
              />
              Hospital Visit
            </label>
            <label>
              <input
                type="checkbox"
                name="consultationMode"
                value="online"
                checked={formData.consultationMode.includes('online')}
                onChange={handleChange}
              />
              Online
            </label>
          </fieldset>
          <label>
            Languages (comma separated):
            <input type="text" name="languages" value={formData.languages} onChange={handleChange} />
          </label>
          <button type="submit">Add Doctor</button>
        </form>
      </main>
    </>
  );
};

export default AddDoctor;
