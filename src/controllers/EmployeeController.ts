import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Employee from '../models/Employee';

const secretKey = 'yourSecretKey';

export const register = async (req: Request, res: Response) => {
    const { name, email, password, assignedShiftHours, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const employee = await Employee.create({
            name,
            email,
            password: hashedPassword,
            assignedShiftHours,
            role,
        });
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ message: (error instanceof Error) ? error.message : 'Unknown error' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const employee = await Employee.findOne({ where: { email } });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: employee.id, role: employee.role }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: (error instanceof Error) ? error.message : 'Unknown error' });
    }
};
