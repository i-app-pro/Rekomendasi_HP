import { Request, Response } from "express";
import { prisma } from "../lib/db";

// 1. menampilkan data event
export const getEvent = async (req: Request, res: Response) => {

    try {

        const events = await prisma.event.findMany({
            include: {
                category: true,
                pembicara: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        res.status(200).json(events);

    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data event",
            error
        });
    }
};

// 2. menyimpan data event
export const createEvent = async (req: Request, res: Response) => {

    const {
        name,
        categoryId,
        pembicaraId,
        location,
        dateEvent,
        description
    } = req.body;

    if (
        !name ||
        !categoryId ||
        !pembicaraId ||
        !location ||
        !dateEvent
    ) {
        return res.status(400).json({
            message: "Data event wajib lengkap"
        });
    }

    try {

        const newEvent = await prisma.event.create({
            data: {
                name,
                categoryId: Number(categoryId),
                pembicaraId: Number(pembicaraId),
                location,
                dateEvent: new Date(dateEvent),
                description
            }
        });

        res.status(201).json({
            message: "Event berhasil disimpan",
            event: newEvent
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal menyimpan event",
            error
        });
    }
};

// 3. menampilkan data event berdasarkan id
export const showEvent = async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    try {

        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                category: true,
                pembicara: true
            }
        });

        if (!event) {
            return res.status(404).json({
                message: "Event tidak ditemukan"
            });
        }

        res.status(200).json(event);

    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil event",
            error
        });
    }
};

// 4. mengubah data event berdasarkan id
export const updateEvent = async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const {
        name,
        categoryId,
        pembicaraId,
        location,
        dateEvent,
        description
    } = req.body;

    try {

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                name,
                categoryId: Number(categoryId),
                pembicaraId: Number(pembicaraId),
                location,
                dateEvent: new Date(dateEvent),
                description
            }
        });

        res.status(200).json({
            message: "Event berhasil diupdate",
            event: updatedEvent
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal update event",
            error
        });
    }
};

// 5. menghapus event berdasarkan id
export const deleteEvent = async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    try {

        const deletedEvent = await prisma.event.delete({
            where: { id }
        });

        res.status(200).json({
            message: "Event berhasil dihapus",
            event: deletedEvent
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus event",
            error
        });
    }
};