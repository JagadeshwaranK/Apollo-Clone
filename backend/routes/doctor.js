const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');

// POST /api/doctors/add-doctor
router.post('/add-doctor', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ message: 'Doctor added successfully', doctor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/doctors/list-doctor-with-filter
router.get('/list-doctor-with-filter', async (req, res) => {
  try {
    const {
      specialty,
      location,
      minExperience,
      maxExperience,
      minRating,
      maxRating,
      consultationMode,
      minFees,
      maxFees,
      languages,
      availability,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};
    if (specialty) filter.specialty = specialty;
    if (location) filter.location = { $in: location.split(',') };
    if (minExperience) filter.experience = { ...filter.experience, $gte: Number(minExperience) };
    if (maxExperience) filter.experience = { ...filter.experience, $lte: Number(maxExperience) };
    if (minRating) filter.rating = { ...filter.rating, $gte: Number(minRating) };
    if (maxRating) filter.rating = { ...filter.rating, $lte: Number(maxRating) };
    if (consultationMode) filter.consultationMode = { $in: consultationMode.split(',') };
    if (minFees) filter.fees = { ...filter.fees, $gte: Number(minFees) };
    if (maxFees) filter.fees = { ...filter.fees, $lte: Number(maxFees) };
    if (languages) filter.languages = { $in: languages.split(',') };
    if (availability) filter.availability = { $in: availability.split(',') };

    const skip = (page - 1) * limit;
    const doctors = await Doctor.find(filter).skip(skip).limit(Number(limit));

    const total = await Doctor.countDocuments(filter);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      doctors,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
