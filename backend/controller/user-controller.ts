import {Request, Response} from "express";
import User from "../model/user"; // adjust path
import Target from "../model/target"; // adjust path

export const createSaleRepresentative = async (req: Request, res: Response) => {
    try {
        const {name, email, region, hire_date, targets} = req.body;

        if (!name || !email || !region || !hire_date) {
            return res.status(400).json({
                success: false,
                message: "Name, email, region, and hire_date are required",
            });
        }

        // 1️⃣ Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Sales Representative with this email already exists",
            });
        }

        // 2️⃣ Create user
        const user = await User.create({
            name,
            email,
            region,
            hire_date,
        });

        // 3️⃣ Create targets if provided
        if (targets && Array.isArray(targets)) {
            const targetDocs = targets.map((t: any) => ({
                user_id: user._id,
                month: t.month,
                year: t.year,
                target_amount: t.target_amount,
            }));

            await Target.insertMany(targetDocs);
        }

        return res.status(201).json({
            success: true,
            message: "Sales Representative created successfully",
            data: user,
        });
    } catch (error: any) {
        console.error("❌ Error creating sales representative:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to create sales representative",
        });
    }
};
export const getSaleRepresentative = (req: Request, res: Response) => {
    console.log("run")
}

export const getCommission = (req: Request, res: Response) => {
    console.log("run")
}

export const updateSaleRepresentative = async (req: Request, res: Response) => {
    try {
        const {id} = req.query; // id comes from query ?id=123
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "Sales Representative not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sales Representative updated successfully",
            data: updatedUser,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};