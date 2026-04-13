'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

function ToastIcon({ type }: { type: ToastType }) {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-[var(--success)]" />,
    error: <AlertCircle className="h-5 w-5 text-[var(--error)]" />,
    warning: <AlertTriangle className="h-5 w-5 text-[var(--warning)]" />,
    info: <Info className="h-5 w-5 text-[var(--accent)]" />,
  };
  return icons[type];
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border border-[var(--border)] p-4 shadow-lg',
        'bg-[var(--card)] text-[var(--card-foreground)]',
        'animate-slide-in'
      )}
    >
      <ToastIcon type={toast.type} />
      <p className="flex-1 text-sm text-[var(--foreground)]">
        {toast.message}
      </p>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (type: ToastType, message: string, duration = 5000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const newToast = { id, type, message, duration };
      
      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-80 flex flex-col gap-2 max-w-sm w-full">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
