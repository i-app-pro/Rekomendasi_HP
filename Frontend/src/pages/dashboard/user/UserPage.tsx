import { useState } from 'react';
import CreateUser, { type UserData } from './CreateUser'; 
import EditUser from './EditUser'; // Import komponen baru

const initialDummyUsers: UserData[] = [
  { id: '1', name: 'Faizal Admin', email: 'admin@rekophone.com', password: '***', role: 'Admin' },
  { id: '2', name: 'Budi Santoso', email: 'budi@mail.com', password: '***', role: 'User' },
  { id: '3', name: 'Siti Aminah', email: 'siti@mail.com', password: '***', role: 'User' },
];

export default function UserPage() {
  const columns = ['ID', 'Name', 'Email', 'Password', 'Role', 'Aksi'];
  
  // STATE MANAGEMENT
  const [users, setUsers] = useState<UserData[]>(initialDummyUsers);
  const [isCreateOpen, setIsCreateOpen] = useState(false); // State modal tambah
  const [isEditOpen, setIsEditOpen] = useState(false);     // State modal edit
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null); // Data user terpilih untuk diedit

  // --- FUNGSI HAPUS ---
  const handleDelete = (idToDelete: string) => {
    const isConfirm = window.confirm("Apakah kamu yakin ingin menghapus user ini?");
    if (isConfirm) {
      setUsers(users.filter(user => user.id !== idToDelete));
    }
  };

  // --- FUNGSI BUKA EDIT (Memasukkan data ke modal edit) ---
  const handleEditClick = (user: UserData) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  // --- FUNGSI EKSEKUSI ADD NEW USER ---
  const handleCreateUser = (newUserData: UserData) => {
    const newId = (users.length > 0 ? Math.max(...users.map(u => parseInt(u.id!))) + 1 : 1).toString();
    const newUser = { ...newUserData, id: newId };
    setUsers([...users, newUser]);
  };

  // --- FUNGSI EKSEKUSI UPDATE USER ---
  const handleUpdateUser = (updatedUserData: UserData) => {
    setUsers(users.map(user => user.id === updatedUserData.id ? updatedUserData : user));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* HEADER AKSI */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-slate-700 hidden md:block">Manajemen Data User</h3>
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-[#d62828] hover:bg-red-700 text-white font-bold rounded-lg shadow-md active:scale-95 transition-all flex items-center gap-2 text-sm w-full md:w-auto justify-center cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Tambah User
        </button>
      </div>

      {/* TAMPILAN DESKTOP */}
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full text-sm text-left border-separate" style={{ borderSpacing: '0 12px' }}>
          <thead className="text-sm text-white font-bold bg-[#1e2530]">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className={`px-6 py-4 whitespace-nowrap ${index === 0 ? 'rounded-l-xl' : ''} ${index === columns.length - 1 ? 'rounded-r-xl text-center' : ''}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr><td colSpan={6} className="text-center py-6 text-slate-500 bg-white rounded-xl">Belum ada data user.</td></tr>
            )}
            {users.map((row) => (
              <tr key={row.id} className="bg-white text-slate-800 font-semibold shadow-sm hover:bg-slate-50 border border-slate-100">
                <td className="px-6 py-4 rounded-l-xl border-y border-l border-slate-200">{row.id}</td>
                <td className="px-6 py-4 border-y border-slate-200">{row.name}</td>
                <td className="px-6 py-4 border-y border-slate-200">{row.email}</td>
                <td className="px-6 py-4 border-y border-slate-200">{row.password}</td>
                <td className="px-6 py-4 border-y border-slate-200">
                  <span className={`px-3 py-1 rounded-full text-xs ${row.role === 'Admin' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'}`}>
                    {row.role}
                  </span>
                </td>
                <td className="px-6 py-4 rounded-r-xl border-y border-r border-slate-200 text-center">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => handleEditClick(row)} className="text-blue-600 font-bold hover:underline cursor-pointer">Edit</button>
                    <span className="text-slate-300">|</span>
                    <button onClick={() => handleDelete(row.id!)} className="text-red-600 font-bold hover:underline cursor-pointer">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TAMPILAN MOBILE */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.length === 0 && (
          <div className="text-center py-6 text-slate-500 bg-white rounded-xl border border-slate-200">Belum ada data user.</div>
        )}
        {users.map((row) => (
          <div key={row.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#1e2530] text-white text-xs font-black px-2 py-1 rounded-md">ID: {row.id}</span>
                <span className={`px-2 py-1 rounded-md text-xs font-bold ${row.role === 'Admin' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                  {row.role}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEditClick(row)} className="p-1.5 bg-blue-50 text-blue-600 rounded-md cursor-pointer active:scale-95">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
                <button onClick={() => handleDelete(row.id!)} className="p-1.5 bg-red-50 text-red-600 rounded-md cursor-pointer active:scale-95">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-black text-slate-800">{row.name}</span>
              <span className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                {row.email}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER PAGINATION */}
      <div className="flex justify-between items-center mt-4 text-sm font-bold text-slate-600 px-2">
        <span>Menampilkan {users.length} data</span>
        <div className="flex gap-2">
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 active:scale-95 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 active:scale-95 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
        </div>
      </div>

      {/* MODAL 1: Khusus Create */}
      <CreateUser 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSave={handleCreateUser} 
      />

      {/* MODAL 2: Khusus Edit */}
      <EditUser 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        onUpdate={handleUpdateUser} 
        userData={selectedUser} 
      />

    </div>
  );
}