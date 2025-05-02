import { useRouter } from 'next/router';
import styles from '../components/DoctorList.module.css';

const HomePage = () => {
  const router = useRouter();

  return (
    <main style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Apollo247 Clone</h1>
      <p>Please visit the destination page for General Physician:</p>
      <button className={styles.bookingButton} onClick={() => router.push('/specialties/general-physician-internal-medicine')}>
        General Physician - Apollo247 Clone
      </button>
      <button className={styles.bookingButton} onClick={() => router.push('/add-doctor')}>
        Add Doctor
      </button>
    </main>
  );
};

export default HomePage;
