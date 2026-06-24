"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePembicara = exports.updatePembicara = exports.showPembicara = exports.createPembicara = exports.getPembicara = void 0;
const db_1 = require("../lib/db");
// 1. menampilkan data pembicara
const getPembicara = async (req, res) => {
    try {
        const pembicara = await db_1.prisma.pembicara.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        res.status(200).json(pembicara);
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data pembicara",
            error
        });
    }
};
exports.getPembicara = getPembicara;
// 2. menyimpan data pembicara
const createPembicara = async (req, res) => {
    const { name, role, image } = req.body;
    if (!name || !role || !image) {
        return res.status(400).json({
            message: "Nama, role, dan image wajib diisi"
        });
    }
    try {
        const newPembicara = await db_1.prisma.pembicara.create({
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
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal menyimpan pembicara",
            error
        });
    }
};
exports.createPembicara = createPembicara;
// 3. menampilkan data pembicara berdasarkan id
const showPembicara = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const pembicara = await db_1.prisma.pembicara.findUnique({
            where: { id }
        });
        if (!pembicara) {
            return res.status(404).json({
                message: "Pembicara tidak ditemukan"
            });
        }
        res.status(200).json(pembicara);
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal mengambil pembicara",
            error
        });
    }
};
exports.showPembicara = showPembicara;
// 4. mengubah data pembicara berdasarkan id
const updatePembicara = async (req, res) => {
    const id = Number(req.params.id);
    const { name, role, image } = req.body;
    try {
        const updatedPembicara = await db_1.prisma.pembicara.update({
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
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal update pembicara",
            error
        });
    }
};
exports.updatePembicara = updatePembicara;
// 5. menghapus pembicara berdasarkan id
const deletePembicara = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const deletedPembicara = await db_1.prisma.pembicara.delete({
            where: { id }
        });
        res.status(200).json({
            message: "Pembicara berhasil dihapus",
            pembicara: deletedPembicara
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal menghapus pembicara",
            error
        });
    }
};
exports.deletePembicara = deletePembicara;
//# sourceMappingURL=pembicaraController.js.map