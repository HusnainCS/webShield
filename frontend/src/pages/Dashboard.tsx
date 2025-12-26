import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DisclaimerModal from '../components/modals/DisclaimerModal';
import ToolInfo from '../components/dashboard/ToolInfo';
import ScanForm from '../components/dashboard/ScanForm';
import { FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    // Show disclaimer for new users
    if (location.state?.showDisclaimer) {
      setShowDisclaimer(true);
    }
  }, [location]);

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
    localStorage.setItem('disclaimerAccepted', 'true');
  };

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:50px_50px] opacity-10"></div>

      <div className="relative container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/20 p-4 rounded-full">
              <FaUser className="text-primary text-3xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary">
                Welcome, {user?.username}! 
              </h1>
              <p className="text-gray-400 text-lg">
                Ready to scan and secure websites
              </p>
            </div>
          </div>
        </div>

        {/* Scan Form */}
        <div className="mb-12">
          <ScanForm />
        </div>

        {/* Tools Information */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8">Available Security Tools</h2>
          <ToolInfo />
        </div>
      </div>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <DisclaimerModal
          onAccept={handleAcceptDisclaimer}
          onClose={() => setShowDisclaimer(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;