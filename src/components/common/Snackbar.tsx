import { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SnackbarProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
    autoHideDuration?: number;
    variant?: 'success' | 'error' | 'info';
}

export default function Snackbar({
    isOpen,
    message,
    onClose,
    autoHideDuration = 3000,
    variant = 'success'
}: SnackbarProps) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, autoHideDuration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, autoHideDuration, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed top-12 left-0 right-0 z-[9999] flex justify-center pointer-events-none">
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="
                            pointer-events-auto
                            flex items-center gap-3 px-4 py-3 min-w-[320px] max-w-[450px] h-14
                            bg-[#191b1d] text-white rounded-2xl
                            shadow-[0px_4px_12px_0px_rgba(48,49,53,0.2)]
                        "
                    >
                        {variant === 'success' && (
                            <div className="shrink-0">
                                <Check className="w-6 h-6" />
                            </div>
                        )}

                        <span className="flex-1 font-semibold text-sm">
                            {message}
                        </span>

                        <div className="flex items-center gap-4 ml-6">
                            {/* Actions area if needed in future */}
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
