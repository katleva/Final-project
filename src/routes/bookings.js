import { Router } from 'express';
import getAllBookings from '../services/bookings/getAllBookings.js';
import getBookingById from '../services/bookings/getBookingById.js';
import getBookingByUser from '../services/bookings/getBookingByUser.js';
import createBooking from '../services/bookings/createBooking.js';
import { updateBooking } from '../services/bookings/updateBooking.js';
import { deleteBooking } from '../services/bookings/deleteBooking.js';

const router = Router();

// GET all bookings or filter by userId
router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (userId) {
      const bookings = await getBookingByUser(userId);
      return res.json(bookings);
    }
    const bookings = await getAllBookings();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

// GET booking by ID
router.get('/:id', async (req, res, next) => {
  try {
    const booking = await getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

// POST new booking
router.post('/', async (req, res, next) => {
  try {
    const newBooking = await createBooking(req.body);
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message }); // handle validation errors
  }
});

// PUT update booking
router.put('/:id', async (req, res, next) => {
  try {
    const updatedBooking = await updateBooking(req.params.id, req.body);
    if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.json(updatedBooking);
  } catch (err) {
    next(err);
  }
});

// DELETE booking
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedBooking = await deleteBooking(req.params.id);
    if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
