import { Outlet } from "react-router-dom";
import dinoMascot from "../assets/brand/reko.png";
import textLogo from "../assets/brand/rekophone.png";

export default function AuthLayout() {
  return (
    <div className="w-full min-h-screen bg-[#f4f6f9] flex items-center justify-center p-4 md:p-8 font-mono">
      
      <div className="w-full max-w-5xl bg-white border-4 border-black p-6 md:p-12 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-sm">
        
        {/* DESKTOP ONLY: TAMPILAN MASKOT DINO + LOGO TULISAN */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center text-center">
          <div className="w-80 h-80 flex items-center justify-center select-none mb-4">
            <img 
              src={dinoMascot} 
              alt="RekoPhone Dino Mascot" 
              className="w-full h-full object-contain [image-rendering:pixelated]"
            />
          </div>
          <div className="w-72 h-auto">
            <img 
              src={textLogo} 
              alt="RekoPhone Text Logo" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* MOBILE ONLY: LOGO TULISAN DI ATAS FORM */}
        <div className="block md:hidden w-full max-w-50 mx-auto mb-2 text-center select-none">
          <img 
            src={textLogo} 
            alt="RekoPhone Text Logo Mobile" 
            className="w-full h-auto object-contain mx-auto"
          />
        </div>

        {/* Wadah untuk isi Form / Outlet */}
        <div className="w-full md:w-[45%] border-4 border-[#e53935] rounded-4xl bg-white p-6 md:p-8 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.15)]">
          {/* Form Login / Register akan dirender di sini */}
          <Outlet />
        </div>

      </div>
    </div>
  );
}