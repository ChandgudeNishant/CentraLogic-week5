import { Request, Response } from 'express';
import Shift from '../models/Shift';

export const startShift = async (req: Request, res: Response) => {
    if (!req.user || typeof req.user === 'string') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const employeeId = req.user.id;

    try {
        const shift = await Shift.create({ employeeId, startTime: new Date() });
        res.status(201).json(shift);
    } catch (error) {
        res.status(500).json({ message: (error instanceof Error) ? error.message : 'Unknown error' });
    }
};

export const endShift = async (req: Request, res: Response) => {
    // Check if user is authenticated
    if (!req.user || typeof req.user === 'string') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const employeeId = req.user.id;
    const { shiftId } = req.body;

    // Check if shiftId is provided
    if (!shiftId) {
        return res.status(400).json({ message: 'Shift ID is required' });
    }

    try {
        // Find the shift record
        const shift = await Shift.findOne({ where: { id: shiftId, employeeId } });
        if (!shift) {
            return res.status(404).json({ message: 'Shift not found' });
        }

        // Update end time and actual hours
        shift.endTime = new Date();
        shift.actualHours = (shift.endTime.getTime() - shift.startTime.getTime()) / 3600000;
        await shift.save();

        res.json(shift);
    } catch (error) {
        res.status(500).json({ message: (error instanceof Error) ? error.message : 'Unknown error' });
    }
};
