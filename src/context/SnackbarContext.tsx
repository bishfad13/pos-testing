import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface SnackbarState {
    message: string;
    isOpen: boolean;
    type: 'success' | 'error' | 'info';
}

interface SnackbarContextType {
    showSnackbar: (message: string, type?: 'success' | 'error' | 'info') => void;
    hideSnackbar: () => void;
    snackbar: SnackbarState;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export function SnackbarProvider({ children }: { children: ReactNode }) {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        message: '',
        isOpen: false,
        type: 'success',
    });

    const showSnackbar = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setSnackbar({ message, type, isOpen: true });
    }, []);

    const hideSnackbar = useCallback(() => {
        setSnackbar(prev => ({ ...prev, isOpen: false }));
    }, []);

    return (
        <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar, snackbar }}>
            {children}
        </SnackbarContext.Provider>
    );
}

export function useSnackbar() {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
}
