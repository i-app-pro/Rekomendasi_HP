import { db } from '../lib/db';
import {
  CreateCriteriaInput,
  UpdateCriteriaInput,
  CreateCriteriaValueInput,
  UpdateCriteriaValueInput,
} from '../types/criteria';

export class CriteriaError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

const validAtribut = ['cost', 'benefit'];

// ==== Criteria ====

export const getAllCriteria = async () => {
  return db.criteria.findMany({ include: { criteria_value: true } });
};

export const getCriteriaById = async (id: number) => {
  const criteria = await db.criteria.findUnique({
    where: { id },
    include: { criteria_value: true },
  });
  if (!criteria) throw new CriteriaError(404, 'Criteria tidak ditemukan');
  return criteria;
};

export const createCriteria = async (input: CreateCriteriaInput) => {
  if (!validAtribut.includes(input.atribut)) {
    throw new CriteriaError(400, "atribut harus 'cost' atau 'benefit'");
  }
  return db.criteria.create({ data: input });
};

export const updateCriteria = async (id: number, input: UpdateCriteriaInput) => {
  if (input.atribut && !validAtribut.includes(input.atribut)) {
    throw new CriteriaError(400, "atribut harus 'cost' atau 'benefit'");
  }
  try {
    return await db.criteria.update({ where: { id }, data: input });
  } catch (error: any) {
    if (error.code === 'P2025') throw new CriteriaError(404, 'Criteria tidak ditemukan');
    throw error;
  }
};

export const deleteCriteria = async (id: number) => {
  try {
    await db.criteria.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === 'P2025') throw new CriteriaError(404, 'Criteria tidak ditemukan');
    throw error;
  }
};

// ==== CriteriaValue ====

export const getAllCriteriaValues = async (criteriaId?: number) => {
  return db.criteriaValue.findMany({
    where: criteriaId ? { criteria_id: criteriaId } : undefined,
    include: { criteria: true },
  });
};

export const getCriteriaValueById = async (id: number) => {
  const data = await db.criteriaValue.findUnique({ where: { id }, include: { criteria: true } });
  if (!data) throw new CriteriaError(404, 'Criteria value tidak ditemukan');
  return data;
};

export const createCriteriaValue = async (input: CreateCriteriaValueInput) => {
  return db.criteriaValue.create({ data: input });
};

export const updateCriteriaValue = async (id: number, input: UpdateCriteriaValueInput) => {
  try {
    return await db.criteriaValue.update({ where: { id }, data: input });
  } catch (error: any) {
    if (error.code === 'P2025') throw new CriteriaError(404, 'Criteria value tidak ditemukan');
    throw error;
  }
};

export const deleteCriteriaValue = async (id: number) => {
  try {
    await db.criteriaValue.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === 'P2025') throw new CriteriaError(404, 'Criteria value tidak ditemukan');
    throw error;
  }
};