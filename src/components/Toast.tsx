import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [toast]);

  if (!toast || !visible) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
  };

  const bgColors = {
    success: 'border-emerald-100 bg-emerald-50 text-emerald-900',
    info: 'border-sky-100 bg-sky-50 text-sky-900',
    warning: 'border-amber-100 bg-amber-50 text-amber-900'
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 w-[90%] max-w-sm p-4 rounded-xl shadow-lg border animate-in fade-in slide-in-from-top-4 duration-300 bg-white">
      <div className={`flex items-center gap-3 w-full p-1 rounded-lg ${bgColors[toast.type]}`}>
        {icons[toast.type]}
        <p className="text-sm font-medium pr-4">{toast.message}</p>
      </div>
    </div>
  );
};
