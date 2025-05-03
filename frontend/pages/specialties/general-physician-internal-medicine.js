import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Filters from '../../components/Filters';
import DoctorList from '../../components/DoctorList';

const DestinationPage = () => {
  const [filters, setFilters] = useState({
    specialty: 'General Physician',
    location: [],
    minExperience: '',
    maxExperience: '',
    minRating: '',
    maxRating: '',
    consultationMode: [],
    minFees: '',
    maxFees: '',
    languages: [],
    availability: [],
    feesRange: '', 
  });
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const parseFeesRange = (range) => {
    if (!range) return { minFees: '', maxFees: '' };
    if (range === '600+') return { minFees: 600, maxFees: '' };
    const [min, max] = range.split('-').map(Number);
    return { minFees: min, maxFees: max };
  };

  const fetchDoctors = async () => {
    const { feesRange, ...restFilters } = filters;
    const { minFees, maxFees } = parseFeesRange(feesRange);

    const queryObj = {
      ...restFilters,
      minFees,
      maxFees,
      page,
      limit,
    };

    Object.keys(queryObj).forEach((key) => {
      if (Array.isArray(queryObj[key])) {
        queryObj[key] = queryObj[key].join(',');
      }
    });

    const query = new URLSearchParams(queryObj);
    const res = await fetch(`http://localhost:5000/api/doctors/list-doctor-with-filter?${query.toString()}`);
    const data = await res.json();
    setDoctors(data.doctors);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchDoctors();
  }, [filters, page]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Apollo247 Clone - General Physician",
    "description": "Find the best General Physicians and Internal Medicine specialists near you.",
    "url": "http://localhost:3000/specialties/general-physician-internal-medicine",
    "logo": "http://localhost:3000/logo.png",
    "sameAs": [
      "https://www.facebook.com/apollo247",
      "https://twitter.com/apollo247",
      "https://www.linkedin.com/company/apollo247"
    ],
    "medicalSpecialty": "General Practice",
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Doctor Consultation",
      "itemListElement": doctors.map(doctor => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Physician",
          "name": doctor.name,
          "medicalSpecialty": doctor.specialty,
          "availableService": doctor.consultationMode,
          "availableLanguage": doctor.languages,
          "description": `Experience: ${doctor.experience} years, Fees: ₹${doctor.fees}`
        },
        "price": doctor.fees,
        "priceCurrency": "INR",
        "availability": doctor.availability
      }))
    }
  };

  return (
    <>
      <Head>
        <title>General Physician - Apollo247 Clone</title>
        <meta name="description" content="Find the best General Physicians and Internal Medicine specialists near you." />
        <meta name="keywords" content="General Physician, Internal Medicine, Doctors, Apollo247 Clone" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="General Physician - Apollo247 Clone" />
        <meta property="og:description" content="Find the best General Physicians and Internal Medicine specialists near you." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:3000/specialties/general-physician-internal-medicine" />
        <meta property="og:image" content="http://localhost:3000/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Header />
      <main style={{ padding: '20px' }}>
        <section style={{ marginBottom: '20px' }}>
          <h1>Book an Appointment with General Physicians</h1>
          <p>
            General medicine is a medical specialty focused on the prevention, diagnosis, and treatment of a wide range of common illnesses and conditions. General physicians play a crucial role in managing overall health and coordinating care.
          </p>
          <p>
            Common conditions treated by general physicians include infections, chronic diseases like diabetes and hypertension, respiratory illnesses, and minor injuries.
          </p>
        </section>
        <div style={{ display: 'flex' }}>
          <Filters filters={filters} onFilterChange={handleFilterChange} />
          <DoctorList doctors={doctors} page={page} setPage={setPage} total={total} limit={limit} />
        </div>
      </main>
    </>
  );
};

export default DestinationPage;
