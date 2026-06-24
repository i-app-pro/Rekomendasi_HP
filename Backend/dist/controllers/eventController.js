"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.showEvent = exports.createEvent = exports.getEvent = void 0;
const db_1 = require("../lib/db");
// 1. menampilkan data event
const getEvent = async (req, res) => {
    try {
        const events = await db_1.prisma.event.findMany({
            include: {
                category: true,
                pembicara: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data event",
            error
        });
    }
};
exports.getEvent = getEvent;
// 2. menyimpan data event
const createEvent = async (req, res) => {
    const { name, categoryId, pembicaraId, location, dateEvent, description } = req.body;
    if (!name ||
        !categoryId ||
        !pembicaraId ||
        !location ||
        !dateEvent) {
        return res.status(400).json({
            message: "Data event wajib lengkap"
        });
    }
    try {
        const newEvent = await db_1.prisma.event.create({
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
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal menyimpan event",
            error
        });
    }
};
exports.createEvent = createEvent;
// 3. menampilkan data event berdasarkan id
const showEvent = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const event = await db_1.prisma.event.findUnique({
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
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal mengambil event",
            error
        });
    }
};
exports.showEvent = showEvent;
// 4. mengubah data event berdasarkan id
const updateEvent = async (req, res) => {
    const id = Number(req.params.id);
    const { name, categoryId, pembicaraId, location, dateEvent, description } = req.body;
    try {
        const updatedEvent = await db_1.prisma.event.update({
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
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal update event",
            error
        });
    }
};
exports.updateEvent = updateEvent;
// 5. menghapus event berdasarkan id
const deleteEvent = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const deletedEvent = await db_1.prisma.event.delete({
            where: { id }
        });
        res.status(200).json({
            message: "Event berhasil dihapus",
            event: deletedEvent
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal menghapus event",
            error
        });
    }
};
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=eventController.js.map