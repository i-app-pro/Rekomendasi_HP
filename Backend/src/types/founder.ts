export interface CreateFounderInput {
  foto?: string;
  nama: string;
  status: string;
  universitas: string;
  framework: string;
  username_ig?: string;
  email?: string;
  github?: string;
}

export type UpdateFounderInput = Partial<CreateFounderInput>;