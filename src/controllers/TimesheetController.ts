import { Request, Response } from 'express';
import Timesheet from '../models/Timesheet';

export const createTimesheet = async (req: Request, res: Response) => {
    if (!req.user || typeof req.user === 'string') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { shiftId, projectName, taskName, fromDate, toDate } = req.body;
    const employeeId = req.user.id;

    try {
        const timesheet = await Timesheet.create({
            employeeId,
            shiftId,
            projectName,
            taskName,
            fromDate,
            toDate,
        });
        res.status(201).json(timesheet);
    } catch (error) {
        res.status(500).json({ message: (error instanceof Error) ? error.message : 'Unknown error' });
    }
};
