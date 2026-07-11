import React from 'react';

interface CardProfileProps {
  foto: string;
  nama: string;
  status: string;
  universitas: string;
  bahasaPemrograman: string[];
  usernameGit: string;
  usernameIg: string;
}

export const CardProfile: React.FC<CardProfileProps> = ({
  foto,
  nama,
  status,
  universitas,
  bahasaPemrograman,
  usernameGit,
  usernameIg,
}) => {
  return (
    <div className="flex flex-col sm:flex-row bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 gap-4 font-mono w-full">
      {/* Bagian Foto Avatar */}
      <div className="w-full sm:w-40 h-40 sm:h-auto shrink-0 bg-gray-100 border-4 border-black overflow-hidden flex items-center justify-center">
        <img
          src={foto}
          alt={nama}
          className="w-full h-full object-cover pixelated"
        />
      </div>

      {/* Bagian Informasi Profile */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Nama & Status Badge */}
          <div className="flex flex-wrap items-baseline gap-2 mb-1">
            <h3 className="text-base md:text-lg font-black uppercase text-black">
              {nama}
            </h3>
            <span className="text-[9px] font-bold text-white bg-red-600 border-2 border-black px-1.5 py-0.5 uppercase tracking-wide">
              {status}
            </span>
          </div>

          {/* Institusi / Universitas */}
          <p className="text-xs text-gray-600 font-semibold uppercase mb-3">
            🏫 {universitas}
          </p>

          {/* List Keahlian Bahasa Pemrograman */}
          <div className="mb-4">
            <p className="text-[10px] text-gray-500 font-bold uppercase mb-1.5 tracking-wider">
              [ SKILLS ]
            </p>
            <div className="flex flex-wrap gap-1.5">
              {bahasaPemrograman.map((bahasa) => (
                <span
                  key={bahasa}
                  className="text-[10px] font-bold text-black bg-gray-200 border-2 border-black px-2 py-0.5 uppercase"
                >
                  {bahasa}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Link Media Sosial (Tanpa Ikon Lucide) */}
        <div className="border-t-2 border-black pt-2 flex flex-col gap-1 text-xs">
          <a
            href={`https://github.com/${usernameGit}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-600 hover:underline w-fit flex items-center"
          >
            <span className="font-bold text-red-600 mr-1.5">GIT_&gt;</span> @{usernameGit}
          </a>
          <a
            href={`https://instagram.com/${usernameIg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-600 hover:underline w-fit flex items-center"
          >
            <span className="font-bold text-red-600 mr-1.5">IG__&gt;</span> @{usernameIg}
          </a>
        </div>
      </div>
    </div>
  );
};