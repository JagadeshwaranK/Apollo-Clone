import React from 'react';
import styles from './DoctorList.module.css';

const DoctorList = ({ doctors, page, setPage, total, limit }) => {
  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleBooking = (doctor, mode) => {
    alert(`Booking ${mode} consultation with ${doctor.name}`);
  };

  return (
    <section className={styles.doctorList}>
      <h2>Doctor Listings</h2>
      {doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <ul className={styles.list}>
          {doctors.map((doctor) => (
            <li key={doctor._id} className={styles.listItem}>
              <h3>{doctor.name}</h3>
              <p><strong>Specialty:</strong> {doctor.specialty}</p>
              <p><strong>Qualifications:</strong> {doctor.qualifications?.join(', ') || 'N/A'}</p>
              <p><strong>Experience:</strong> {doctor.experience} years</p>
              <p><strong>Location:</strong> {doctor.location}</p>
              <p><strong>Consultation Fees:</strong> ₹{doctor.fees}</p>
              <p><strong>Rating:</strong> {doctor.rating} / 5</p>
              <p><strong>Availability:</strong> {doctor.availability?.join(', ') || 'N/A'}</p>
              <p><strong>Languages:</strong> {doctor.languages?.join(', ') || 'N/A'}</p>
              <div>
                {doctor.consultationMode?.includes('hospital') && (
                  <button className={styles.bookingButton} onClick={() => handleBooking(doctor, 'Hospital Visit')}>
                    Book Hospital Visit
                  </button>
                )}
                {doctor.consultationMode?.includes('online') && (
                  <button className={styles.bookingButton} onClick={() => handleBooking(doctor, 'Online')}>
                    Book Online Consultation
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </section>
  );
};

export default DoctorList;
