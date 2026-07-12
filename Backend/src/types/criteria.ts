export type AtributType = 'cost' | 'benefit';

export interface CreateCriteriaInput {
  nama: string;
  atribut: AtributType;
  default_bobot: number;
}

export type UpdateCriteriaInput = Partial<CreateCriteriaInput>;

export interface CreateCriteriaValueInput {
  label: string;
  nilai: number;
  criteria_id: number;
}

export type UpdateCriteriaValueInput = Partial<CreateCriteriaValueInput>;