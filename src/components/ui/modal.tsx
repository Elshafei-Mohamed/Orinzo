'use client';

import { useEffect, useCallback, Fragment, ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
};

function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
  className,
}: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <Fragment>
      <div
        className="fixed inset-0 z-[var(--z-modal)] bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-[var(--z-modal)] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className={cn(
              'relative w-full bg-[var(--card)] text-[var(--card-foreground)] rounded-xl shadow-2xl',
              'transform transition-all animate-fade-in',
              sizeClasses[size],
              className
            )}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            aria-describedby={description ? 'modal-description' : undefined}
          >
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between border-b border-[var(--border)] p-4 sm:p-6">
                <div>
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-xl font-semibold text-[var(--foreground)]"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p
                      id="modal-description"
                      className="mt-1 text-sm text-[var(--muted-foreground)]"
                    >
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] -mr-2 -mt-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>
            )}
            <div className="p-4 sm:p-6">{children}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export { Modal };
