import { Request, Response } from "express";
import { prisma } from "../lib/db";

// 1. menampilkan data pembicara
export const getPembicara = async (req: Request, res: Response) => {

    try {

        const pembicara = await prisma.pembicara.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        res.status(200).json(pembicara);

    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data pembicara",
            error
        });
    }
};

// 2. menyimpan data pembicara
export const createPembicara = async (req: Request, res: Response) => {

    const { name, role, image } = req.body;

    if (!name || !role || !image) {
        return res.status(400).json({
            message: "Nama, role, dan image wajib diisi"
        });
    }

    try {

        const newPembicara = await prisma.pembicara.create({
            data: {
                name,
                role,
                image
            }
        });

        res.status(201).json({
            message: "Pembicara berhasil disimpan",
            pembicara: newPembicara
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal menyimpan pembicara",
            error
        });
    }
};

// 3. menampilkan data pembicara berdasarkan id
export const showPembicara = async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    try {

        const pembicara = await prisma.pembicara.findUnique({
            where: { id }
        });

        if (!pembicara) {
            return res.status(404).json({
                message: "Pembicara tidak ditemukan"
            });
        }

        res.status(200).json(pembicara);

    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil pembicara",
            error
        });
    }
};

// 4. mengubah data pembicara berdasarkan id
export const updatePembicara = async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const { name, role, image } = req.body;

    try {

        const updatedPembicara = await prisma.pembicara.update({
            where: { id },
            data: {
                name,
                role,
                image
            }
        });

        res.status(200).json({
            message: "Pembicara berhasil diupdate",
            pembicara: updatedPembicara
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal update pembicara",
            error
        });
    }
};

// 5. menghapus pembicara berdasarkan id
export const deletePembicara = async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    try {

        const deletedPembicara = await prisma.pembicara.delete({
            where: { id }
        });

        res.status(200).json({
            message: "Pembicara berhasil dihapus",
            pembicara: deletedPembicara
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus pembicara",
            error
        });
    }
};