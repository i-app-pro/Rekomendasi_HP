import { Request, Response } from "express";
import { prisma } from "../lib/db";


// 1. menampilkan data category
export const getCategories = async(req:Request, res:Response) => {
    // menggambil data dari database
    try{
        const allEvents = await prisma.category.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        // tampilkan datanya
        res.json(allEvents);
    }catch(error) {
        res.status(500).json({message: "Gagal mengambil data category, Pastikan database terhubung, dan XAMPP dijalankan", error});
    }
};

// 2. menyimpan data category
export const createCategories = async (req:Request, res:Response) => {
    const {name} = req.body;
    
    // jika nama atau name belum diisi
    if(!name) {
        res.status(500).json({message: "Nama category harus diisi"});
    }
    try {

        const newCategory = await prisma.category.create({
            data: {
                name
            }
        });

        res.status(201).json({
            message: "Category berhasil disimpan",
            category: newCategory
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal menyimpan category",
            error
        });
    }
};

// 3. menampilkan data category berdasarkan id
export const showCategories = async (req:Request, res:Response) => {
    const id = Number(req.params.id);

    try {

        const category = await prisma.category.findUnique({
            where: { id }
        });

        if (!category) {
            return res.status(404).json({
                message: "Category tidak ditemukan"
            });
        }

        res.status(200).json(category);

    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil category",
            error
        });
    }
};

// 4. mengubah data category berdasarkan id
export const updateCategories = async (req:Request, res:Response) => {
    const id = Number(req.params.id);

    const { name } = req.body;

    try {
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name
            }
        });

        res.status(200).json({
            message: "Category berhasil diupdate",
            category: updatedCategory
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal update category",
            error
        });
    }
};

// 5. menghapus category berdasarkan id
export const deleteCategories = async (req:Request, res:Response) => {
    const id = Number(req.params.id);

    try {
        const deletedCategory = await prisma.category.delete({
            where: { id }
        });

        res.status(200).json({
            message: "Category berhasil dihapus",
            category: deletedCategory
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus category",
            error
        });
    }
};