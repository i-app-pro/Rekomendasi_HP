import { Request, Response } from "express";
import { prisma } from "../lib/db";

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;

        const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            foto: true,
            createdAt: true,},
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
        message: "Internal server error",
        });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;

        const { name, foto } = req.body;

    if (!name && !foto) {
        return res.status(400).json({
            message: "Minimal isi name atau foto",
        });
    }

    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            ...(name && { name }),
            ...(foto && { foto }),
        },
        select: {
            id: true,
            name: true,
            email: true,
            foto: true,
            createdAt: true,
        },
    });

        res.status(200).json({message: "Profile berhasil diperbarui",user,});

    } catch (error) {
        res.status(500).json({message: "Internal server error",});
    }
};

export const deleteProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    
        if (!user) {
            return res.status(404).json({
                message: "User tidak ditemukan",
            });
        }
    
        await prisma.user.delete({
        where: {
            id: userId,
            },
        });

        res.status(200).json({message: "Akun berhasil dihapus",});

    } catch (error) {
        res.status(500).json({message: "Internal server error",});
    }
};