const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Returns all properties
async function getAllProperties() {
  return prisma.property.findMany({
    include: {
      host: true,
      bookings: true,
      reviews: true
    }
  });
}

// Create a new property
async function getPropertyById(id) {
  return prisma.property.findUnique({
    where: { id: Number(id) },
    include: {
      host: true,
      bookings: true,
      reviews: true
    }
  });
}

// Returns a single property, updates it, or deletes it. id is the property's id.
async function createProperty(data) {
  return prisma.property.create({
    data
  });
}

async function updateProperty(id, data) {
  return prisma.property.update({
    where: { id: Number(id) },
    data
  });
}

async function deleteProperty(id) {
  return prisma.property.delete({
    where: { id: Number(id) }
  });
}

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
};

//Shows properties in Malibu, California

//Shows properties with a pricePerNight of 310.25

//Shows properties in Malibu, California with a pricePerNight of 310.25