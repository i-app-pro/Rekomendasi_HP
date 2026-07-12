// GET /api/founders (publik) & CRUD /api/founders (admin only)
export interface Founder {
  id: number;
  nama: string;
  status: string;
  universitas: string;
  framework: string;
  username_ig: string;
  email: string;
  github: string;
}

export type FounderPayload = Omit<Founder, "id">;
