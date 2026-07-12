import { API } from "../lib/axios";

export interface ApiFounder {
  id: number;
  foto: string | null;
  nama: string;
  status: string;
  universitas: string;
  framework: string; // CSV string, mis: "Python, Java, JavaScript, ..."
  username_ig: string;
  email: string;
  github: string;
  created_at?: string;
  updated_at?: string;
}

function unwrap<T>(payload: any): T {
  return (payload?.data ?? payload) as T;
}

export async function getFounders(): Promise<ApiFounder[]> {
  const res = await API.get("/founders");
  return unwrap<ApiFounder[]>(res.data);
}