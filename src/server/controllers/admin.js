import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: 'user' },
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        registrationDate: true,
        packages: {
          select: {
            trackingCode: true,
            status: true,
            deliveryDate: true
          }
        }
      }
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const updatePackageStatus = async (req, res) => {
  try {
    const { packageId } = req.params;
    const { status, daysRemaining, message } = req.body;

    const updatedPackage = await prisma.package.update({
      where: { id: packageId },
      data: {
        status,
        daysRemaining,
        messages: {
          create: {
            content: message,
            userId: req.user.id
          }
        }
      }
    });

    res.json(updatedPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating package status' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await prisma.user.delete({
      where: { id: userId }
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};