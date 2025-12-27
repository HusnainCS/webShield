import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { scanAPI } from '../services/api';
import AuthNavbar from '../components/layout/AuthNavbar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { HiX } from 'react-icons/hi';

interface Scan {
  _id: string;
  targetUrl: string;
  scanType: string;
  status: string;
  createdAt: string;
}

export default function ScanProgress() {
  const { scanId } = useParams<{ scanId: string }>();
  const navigate = useNavigate();
  const [scan, setScan] = useState<Scan | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [cancelling, setCancelling] = useState(false);

  // Fetch scan status
  useEffect(() => {
    if (!scanId) return;

    let progressInterval:  any;

    const fetchScan = async () => {
      try {
        const response = await scanAPI.getScan(scanId);
        setScan(response.scan);
        setLoading(false);

        // If completed, stop polling and redirect
        if (response.scan. status === 'completed') {
          clearInterval(progressInterval);
          setTimeout(() => {
            navigate(`/scan/${scanId}/results`);
          }, 1000);
        }

        // If failed, stop polling
        if (response.scan.status === 'failed') {
          clearInterval(progressInterval);
        }
      } catch (err:  any) {
        console.error('Error fetching scan:', err);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchScan();

    // Poll every 3 seconds
    const pollInterval = setInterval(fetchScan, 3000);

    // Simulate progress bar
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95; // Stop at 95% until scan completes
        return prev + 1;
      });
    }, 1000);

    return () => {
      clearInterval(pollInterval);
      clearInterval(progressInterval);
    };
  }, [scanId, navigate]);

  // Set progress to 100% when completed
  useEffect(() => {
    if (scan?. status === 'completed') {
      setProgress(100);
    }
  }, [scan?.status]);

  // Handle cancel
  const handleCancel = async () => {
    if (! window.confirm('Are you sure you want to cancel this scan?')) {
      return;
    }

    setCancelling(true);
    try {
      await scanAPI.cancelScan(scanId! );
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to cancel scan');
      setCancelling(false);
    }
  };

  // Get scan type info
  const getScanTypeInfo = (type: string) => {
    const types:  any = {
      nmap: { name: 'Nmap', icon: '🔍', color: 'bg-blue-500' },
      nikto: { name: 'Nikto', icon: '🌐', color: 'bg-red-500' },
      ssl:  { name: 'SSL/TLS', icon: '🔒', color: 'bg-green-500' },
      sqlmap: { name: 'SQLMap', icon: '💉', color: 'bg-yellow-500' },
    };
    return types[type] || { name: type, icon: '📋', color: 'bg-gray-500' };
  };

  if (loading) {
    return (
      <div className="page-container min-h-screen">
        <AuthNavbar />
        <div className="content-wrapper flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading scan...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="page-container min-h-screen">
        <AuthNavbar />
        <div className="content-wrapper flex items-center justify-center min-h-[80vh]">
          <Card className="max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-2">Scan Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The scan you're looking for doesn't exist
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const isRunning = scan.status === 'running' || scan.status === 'pending';
  const isCompleted = scan.status === 'completed';
  const isFailed = scan.status === 'failed';
  const scanTypeInfo = getScanTypeInfo(scan.scanType);

  return (
    <div className="page-container min-h-screen">
      <AuthNavbar />
      
      <div className="content-wrapper py-8">
        <Card className="max-w-3xl mx-auto">
          {/* Header with icon */}
          <div className="text-center mb-8">
            {isRunning && (
              <div className="relative inline-block mb-6">
                {/* Rotating circle animation */}
                <div className="w-32 h-32 border-8 border-primary/20 border-t-primary rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-5xl">
                  {scanTypeInfo.icon}
                </div>
              </div>
            )}
            
            {isCompleted && (
              <div className="text-6xl mb-4 animate-bounce">✅</div>
            )}
            
            {isFailed && (
              <div className="text-6xl mb-4">❌</div>
            )}

            <h1 className="text-3xl font-bold mb-2">
              {isRunning && 'Scanning in Progress... '}
              {isCompleted && 'Scan Complete!'}
              {isFailed && 'Scan Failed'}
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400">
              <span className={`font-semibold ${scanTypeInfo.color} text-white px-3 py-1 rounded-full`}>
                {scanTypeInfo.name}
              </span>
              {' '}scan of {scan.targetUrl}
            </p>
          </div>

          {/* Progress Bar */}
          {isRunning && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-bold text-primary">{progress}%</span>
              </div>
              
              {/* Animated progress bar */}
              <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full transition-all duration-500 relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
                       style={{ animation: 'shimmer 2s infinite' }} 
                  />
                </div>
              </div>

              <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-sm">
                This may take 2-5 minutes.  Please don't close this page.
              </p>

              {/* Scanning status messages */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {progress < 30 && 'Initializing scan...'}
                    {progress >= 30 && progress < 60 && 'Running security tests...'}
                    {progress >= 60 && progress < 90 && 'Analyzing vulnerabilities...'}
                    {progress >= 90 && 'Finalizing results...'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Completed message */}
          {isCompleted && (
            <div className="text-center mb-6">
              <p className="text-lg text-gray-600 dark: text-gray-400 mb-6">
                Scan completed successfully!  Redirecting to results...
              </p>
              <Button onClick={() => navigate(`/scan/${scanId}/results`)}>
                View Results Now
              </Button>
            </div>
          )}

          {/* Failed message */}
          {isFailed && (
            <div className="text-center mb-6">
              <p className="text-lg text-red-500 mb-6">
                The scan failed to complete. Please try again.
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => navigate('/scan/start')}>
                  Start New Scan
                </Button>
                <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}

          {/* Cancel button for running scans */}
          {isRunning && (
            <div className="text-center pt-6 border-t border-light-border dark:border-dark-border">
              <Button 
                variant="danger" 
                onClick={handleCancel}
                isLoading={cancelling}
              >
                <HiX className="w-5 h-5" />
                Cancel Scan
              </Button>
            </div>
          )}

          {/* Scan details */}
          <div className="mt-8 pt-8 border-t border-light-border dark:border-dark-border space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Scan ID:</span>
              <span className="font-mono">{scan._id. slice(0, 12)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Type:</span>
              <span className="uppercase font-semibold">{scan.scanType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Status:</span>
              <span className={`font-semibold uppercase ${
                isCompleted ? 'text-green-500' : 
                isRunning ? 'text-yellow-500' :
                'text-red-500'
              }`}>
                {scan.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Started:</span>
              <span>{new Date(scan.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Add shimmer animation CSS */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}