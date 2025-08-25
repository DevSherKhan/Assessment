import {Request, Response, NextFunction} from "express";
import ErrorHandler from "../utils/errorHandler";

interface CustomError extends Error {
    statusCode?: number;
    errors?: { [key: string]: { message: string } };
    stack?: string;
    name?: string;
}

export default function errorMiddleware(
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    let error: CustomError = {...err};

    error.statusCode = err?.statusCode ?? 500;
    error.message = err?.message ?? "Internal Server Error";

    // Handle validation errors (e.g., from Mongoose)
    if (err.name === "ValidationError" && err.errors) {
        const message = Object.values(err.errors).map((value) => value.message);
        error = new ErrorHandler(message.join(", "), 400);
    }

    res.status(error.statusCode).json({
        success: false,
        error: {
            message: error.message,
            statusCode: error.statusCode,
        },
        description: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
}