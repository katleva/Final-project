import express from 'express';
import bookingsData from '../data/bookings.json' with { type: 'json' };

const router = express.Router();

let bookings = bookingsData.bookings;

//Returns all bookings (and Returns information about booking made by user a1234567-89ab-cdef-0123-456789abcdef)
router.get('/', (req, res) => {
  const { userId } = req.query;

  let results = bookings;

  if (userId) {
    results = results.filter(b => b.userId === userId);
  }

  res.json(results);
});

//Returns all bookings
router.get('/:id', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
});

//Creates a new booking
router.post('/', (req, res) => {
  const newBooking = { id: Date.now().toString(), ...req.body };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

//Updates booking
router.put('/:id', (req, res) => {
  const index = bookings.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Booking not found' });

  bookings[index] = { ...bookings[index], ...req.body };
  res.json(bookings[index]);
});

//Deletes booking
router.delete('/:id', (req, res) => {
  const index = bookings.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Booking not found' });

  bookings.splice(index, 1);
  res.json({ message: 'Booking deleted' });
});

export default router;
