import express from 'express';
import propertiesData from '../data/properties.json' with { type: 'json' };

const router = express.Router();

let properties = propertiesData.properties;

// Returns all properties (with optional filters)
router.get('/', (req, res) => {
  const { location, pricePerNight } = req.query;

  let results = properties;

  //Shows properties in Malibu, California with a pricePerNight of 310.25
  if (location) {
    results = results.filter(p => p.location === location);
  }

  if (pricePerNight) {
    const price = parseFloat(pricePerNight);
    results = results.filter(p => p.pricePerNight === price);
  }

  res.json(results);
});

// Create a new property 
router.post('/', (req, res) => {
  const newProperty = { id: Date.now().toString(), ...req.body };
  properties.push(newProperty);
  res.status(201).json(newProperty);
});

// Returns a new property. id is the property's id
router.get('/:id', (req, res) => {
  const property = properties.find(p => p.id === req.params.id);
  if (!property) return res.status(404).json({ message: 'Property not found' });
  res.json(property);
});


// Updates a single property
router.put('/:id', (req, res) => {
  const index = properties.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Property not found' });

  properties[index] = { ...properties[index], ...req.body };
  res.json(properties[index]);
});

// Delete a property
router.delete('/:id', (req, res) => {
  const index = properties.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Property not found' });

  properties.splice(index, 1);
  res.json({ message: 'Property deleted' });
});

export default router;