import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export const SafetyNotice: React.FC = () => {
  return (
    <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-4 flex gap-3 shadow-xs">
      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div>
        <h4 className="text-sm font-semibold text-amber-900">Xavfsizlik eslatmasi</h4>
        <p className="text-xs text-amber-800 mt-1 leading-relaxed">
          Pul o‘tkazmasidan oldin kitobni shaxsan ko‘rib, tekshirib oling. BookBack ma’muriyati xavfsiz uchrashuv joylarini tanlashni maslahat beradi.
        </p>
      </div>
    </div>
  );
};
