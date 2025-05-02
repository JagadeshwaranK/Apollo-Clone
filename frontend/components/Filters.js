import React from 'react';
import styles from './Filters.module.css';

const locationOptions = ['New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Houston'];
const experienceOptions = ['0-2', '3-5', '6-10', '10+'];
const ratingOptions = ['0-2', '2-3', '3-4', '4-5'];
const feesOptions = ['0-200', '201-400', '401-600', '600+'];
const consultationModes = ['hospital', 'online'];
const languagesOptions = ['English', 'Hindi', 'Spanish', 'French', 'German'];
const availabilityOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Filters = ({ filters, onFilterChange }) => {
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    let newValues = filters[name] ? [...filters[name]] : [];
    if (checked) {
      newValues.push(value);
    } else {
      newValues = newValues.filter((v) => v !== value);
    }
    onFilterChange({ [name]: newValues });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <aside className={styles.filters}>
      <h3>Filters</h3>

      <div className={styles.filterGroup}>
        <label>Location:</label>
        <div>
          {locationOptions.map((loc) => (
            <label key={loc} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="location"
                value={loc}
                checked={filters.location?.includes(loc) || false}
                onChange={handleCheckboxChange}
              />
              {loc}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label>Experience Range:</label>
        <div>
          {experienceOptions.map((range) => (
            <label key={range} className={styles.radioLabel}>
              <input
                type="radio"
                name="experienceRange"
                value={range}
                checked={filters.experienceRange === range}
                onChange={handleRadioChange}
              />
              {range} years
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label>Rating Range:</label>
        <div>
          {ratingOptions.map((range) => (
            <label key={range} className={styles.radioLabel}>
              <input
                type="radio"
                name="ratingRange"
                value={range}
                checked={filters.ratingRange === range}
                onChange={handleRadioChange}
              />
              {range}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label>Consultation Mode:</label>
        <div>
          {consultationModes.map((mode) => (
            <label key={mode} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="consultationMode"
                value={mode}
                checked={filters.consultationMode?.includes(mode) || false}
                onChange={handleCheckboxChange}
              />
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label>Fees Range:</label>
        <div>
          {feesOptions.map((range) => (
            <label key={range} className={styles.radioLabel}>
              <input
                type="radio"
                name="feesRange"
                value={range}
                checked={filters.feesRange === range}
                onChange={handleRadioChange}
              />
              {range}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label>Languages:</label>
        <div>
          {languagesOptions.map((lang) => (
            <label key={lang} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="languages"
                value={lang}
                checked={filters.languages?.includes(lang) || false}
                onChange={handleCheckboxChange}
              />
              {lang}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label>Availability:</label>
        <div>
          {availabilityOptions.map((day) => (
            <label key={day} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="availability"
                value={day}
                checked={filters.availability?.includes(day) || false}
                onChange={handleCheckboxChange}
              />
              {day}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filters;
