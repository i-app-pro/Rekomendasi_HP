"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategories = exports.updateCategories = exports.showCategories = exports.createCategories = exports.getCategories = void 0;
const db_1 = require("../lib/db");
// 1. menampilkan data category
const getCategories = async (req, res) => {
    // menggambil data dari database
    try {
        const allEvents = await db_1.prisma.category.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        // tampilkan datanya
        res.json(allEvents);
    }
    catch (error) {
        res.status(500).json({ message: "Gagal mengambil data category", error });
    }
};
exports.getCategories = getCategories;
// 2. menyimpan data category
const createCategories = async (req, res) => {
    const { name } = req.body;
    // jika nama atau name belum diisi
    if (!name) {
        res.status(500).json({ message: "Nama category harus diisi" });
    }
    try {
        const newCategory = await db_1.prisma.category.create({
            data: {
                name
            }
        });
        res.status(201).json({
            message: "Category berhasil disimpan",
            category: newCategory
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal menyimpan category",
            error
        });
    }
};
exports.createCategories = createCategories;
// 3. menampilkan data category berdasarkan id
const showCategories = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const category = await db_1.prisma.category.findUnique({
            where: { id }
        });
        if (!category) {
            return res.status(404).json({
                message: "Category tidak ditemukan"
            });
        }
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal mengambil category",
            error
        });
    }
};
exports.showCategories = showCategories;
// 4. mengubah data category berdasarkan id
const updateCategories = async (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;
    try {
        const updatedCategory = await db_1.prisma.category.update({
            where: { id },
            data: {
                name
            }
        });
        res.status(200).json({
            message: "Category berhasil diupdate",
            category: updatedCategory
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal update category",
            error
        });
    }
};
exports.updateCategories = updateCategories;
// 5. menghapus category berdasarkan id
const deleteCategories = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const deletedCategory = await db_1.prisma.category.delete({
            where: { id }
        });
        res.status(200).json({
            message: "Category berhasil dihapus",
            category: deletedCategory
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal menghapus category",
            error
        });
    }
};
exports.deleteCategories = deleteCategories;
//# sourceMappingURL=categoryController.js.map