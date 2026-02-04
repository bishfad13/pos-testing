import { useState } from 'react';
import RightPanel from './components/layout/RightPanel';
import TopNav from './components/menu/TopNav';
import StatusHeader from './components/layout/StatusHeader';
import CategorySection from './components/menu/CategorySection';
import BottomNav from './components/layout/BottomNav';
import { OrderProvider } from './context/OrderContext';
import { SnackbarProvider, useSnackbar } from './context/SnackbarContext';
import Snackbar from './components/common/Snackbar';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const { snackbar, hideSnackbar } = useSnackbar();

  return (
    <div className="h-screen w-screen bg-background flex flex-col overflow-hidden font-sans text-text-primary">
      {/* Global Snackbar */}
      <Snackbar
        isOpen={snackbar.isOpen}
        message={snackbar.message}
        onClose={hideSnackbar}
        variant={snackbar.type || 'success'}
      />

      {/* Global Status Header */}
      <div className="shrink-0 z-30 bg-white border-b border-gray-100">
        <StatusHeader />
      </div>

      {/* Main Content Area (Left + Right) */}
      <div className="flex-1 overflow-hidden" style={{ display: 'grid', gridTemplateColumns: '1fr 0.5fr' }}>

        {/* Left Panel - Menu Content */}
        <div className="flex flex-col h-full min-h-0 bg-background relative z-10 transition-all">
          {/* Menu Header (Title & Search) */}
          <div className="pt-2">
            <TopNav
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
            <CategorySection
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          </div>
        </div>

        {/* Right Panel - Order */}
        <div className="h-full min-h-0 z-20 shadow-[-4px_0_20px_rgba(0,0,0,0.02)]">
          <RightPanel />
        </div>
      </div>

      {/* Global Bottom Navigation (Footer) */}
      <div className="shrink-0 z-10 relative">
        <BottomNav />
      </div>
    </div>
  );
}

function App() {
  return (
    <OrderProvider>
      <SnackbarProvider>
        <AppContent />
      </SnackbarProvider>
    </OrderProvider>
  );
}

export default App;
