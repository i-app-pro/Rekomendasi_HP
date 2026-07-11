import React from 'react';

export const DashboardHome: React.FC = () => {
  const summaryCards = ['User', 'Brand', 'Product', 'Pembobotan', 'Kebutuhan','Founder', 'Criteria', 'Criteria Value'];

  return (
    // Di mobile jadi 1 kolom (penuh), tablet 2 kolom, desktop 3 kolom
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
      {summaryCards.map((item) => (
        <div 
          key={item} 
          className="bg-white border-2 md:border-4 border-slate-500 rounded-xl md:rounded-2xl p-4 h-36 md:h-48 flex flex-col items-center justify-start shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="font-black text-base md:text-lg mb-2 text-slate-700">{item}</h3>
          {/* Kotak abu-abu mockup */}
          <div className="w-full h-full bg-slate-100 rounded-lg border border-slate-200"></div>
        </div>
      ))}
    </div>
  );
};

export default DashboardHome;