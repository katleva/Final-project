import express from 'express';
import hostsData from '../data/hosts.json' with { type: 'json' };

const router = express.Router();

let hosts = hostsData.hosts;

// GET all hosts or GET to return a host with a specific name (e.g. John Doe)
router.get('/', (req, res) => {
  const name = req.query.name;

  if (name) {
    const host = hosts.find(h => h.name.toLowerCase() === name.toLowerCase());
    if (!host) {
      return res.status(404).json({ message: `Host with name '${name}' not found` });
    }
    return res.json(host);
  }
  res.json(hosts);
});

// GET one host by ID
router.get('/:id', (req, res) => {
  const host = hosts.find(h => h.id === req.params.id);
  if (!host) return res.status(404).json({ message: 'Host not found' });
  res.json(host);
});

// POST create a new host
router.post('/', (req, res) => {
  const newHost = { id: Date.now().toString(), ...req.body };
  hosts.push(newHost);
  res.status(201).json(newHost);
});

// PUT update a host by ID
router.put('/:id', (req, res) => {
  const index = hosts.findIndex(h => h.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Host not found' });

  hosts[index] = { ...hosts[index], ...req.body };
  res.json(hosts[index]);
});

// DELETE a host by ID
router.delete('/:id', (req, res) => {
  const index = hosts.findIndex(h => h.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Host not found' });

  hosts.splice(index, 1);
  res.json({ message: 'Host deleted' });
});

export default router;
