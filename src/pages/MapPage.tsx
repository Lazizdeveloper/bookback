import React from 'react';
import { MapPlaceholder } from '../components/MapPlaceholder';
import { MapPin, Info } from 'lucide-react';

export const MapPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-display font-extrabold text-stone-900">Yaqin atrofdagi kitoblar</h2>
        <p className="text-xs text-stone-500">
          O‘zbekiston viloyatlari va shaharlari kesimida kitobxonlar tomonidan joylangan kitoblarning interaktiv joylashuvi
        </p>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex gap-3">
        <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-800 leading-relaxed">
          <p className="font-bold">Maxfiylik va xavfsizlik: </p>
          <p className="mt-0.5">
            BookBack foydalanuvchilarning uy manzillarini xaritada aniq ko‘rsatmaydi. Joylashuvlar tuman yoki shahar markazlariga nisbatan taxminiy masofalarda belgilangan.
          </p>
        </div>
      </div>

      <MapPlaceholder />
    </div>
  );
};
