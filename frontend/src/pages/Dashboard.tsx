import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthNavbar from '../components/layout/AuthNavbar';
import Card from '../components/common/Card';
import { scanAPI } from '../services/api';
import { HiPlay, HiDocumentText, HiClock, HiCheckCircle, HiXCircle, HiLockClosed } from 'react-icons/hi';

interface Scan {
  _id:  string;
  targetUrl: string;
  scanType: string;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [recentScans, setRecentScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalScans: 0,
    completedScans: 0,
    pendingScans: 0,
  });

  // Check if scan limit reached
  const scanLimit = user?.scanLimit || 10;
  const scansUsed = user?.scansUsed || 0;
  const scansRemaining = scanLimit - scansUsed;
  const limitReached = scansUsed >= scanLimit;

  useEffect(() => {
    fetchRecentScans();
  }, []);

  const fetchRecentScans = async () => {
    try {
      const response = await scanAPI.getHistory();
      const scans = response.scans || [];
      setRecentScans(scans. slice(0, 5));
      
      setStats({
        totalScans: scans.length,
        completedScans: scans.filter((s:  Scan) => s.status === 'completed').length,
        pendingScans: scans.filter((s: Scan) => s.status === 'running' || s.status === 'pending').length,
      });
    } catch (error) {
      console.error('Failed to fetch scans:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <HiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'running': 
      case 'pending':
        return <HiClock className="w-5 h-5 text-yellow-500 animate-pulse" />;
      case 'failed':
        return <HiXCircle className="w-5 h-5 text-red-500" />;
      default:
        return <HiClock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'running':
      case 'pending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="page-container min-h-screen">
      <AuthNavbar />
      
      <div className="content-wrapper py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="text-gradient">{user?.username}</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ready to scan and secure websites
          </p>
        </div>

        {/* Scan Limit Warning */}
        {limitReached && (
          <Card className="mb-6 bg-red-500/10 border-red-500/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <HiLockClosed className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-500 mb-2">Scan Limit Reached</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You've used all {scanLimit} of your available scans.  Upgrade to Pro for unlimited scans! 
                </p>
                <button className="btn-primary">
                  Upgrade to Pro
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Scan Limit Progress */}
        {! limitReached && (
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Scan Usage</h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {scansUsed} / {scanLimit} scans used
              </span>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  scansRemaining <= 2 ? 'bg-red-500' : 
                  scansRemaining <= 5 ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`}
                style={{ width: `${(scansUsed / scanLimit) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {scansRemaining} scans remaining
            </p>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Scans</p>
                <p className="text-3xl font-bold">{stats. totalScans}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <HiDocumentText className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-500">{stats. completedScans}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <HiCheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Running</p>
                <p className="text-3xl font-bold text-yellow-500">{stats.pendingScans}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <HiClock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Start New Scan */}
          {limitReached ?  (
            <Card className="opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-500/20 rounded-lg flex items-center justify-center">
                  <HiLockClosed className="w-8 h-8 text-gray-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Start New Scan</h3>
                  <p className="text-sm text-gray-600 dark: text-gray-400">
                    Upgrade to continue scanning
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <Link to="/scan/start">
              <Card hover className="h-full">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                    <HiPlay className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Start New Scan</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Scan a website for vulnerabilities
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          )}

          {/* View Profile or Admin Dashboard */}
          {user?.role === 'admin' ?  (
            <Link to="/admin">
              <Card hover className="h-full">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-. 836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-. 947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-. 947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Admin Dashboard</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manage users and system
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ) : (
            <Link to="/profile">
              <Card hover className="h-full">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">View Profile</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manage your account settings
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          )}
        </div>

        {/* Recent Scans */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Scans</h2>
            {recentScans.length > 0 && (
              <Link to="/history" className="text-primary hover:text-primary-dark text-sm font-semibold">
                View All
              </Link>
            )}
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading scans...</p>
            </div>
          ) : recentScans.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiDocumentText className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">No scans yet</p>
              {! limitReached && (
                <Link to="/scan/start">
                  <button className="btn-primary">
                    Start Your First Scan
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <Link 
                  key={scan._id} 
                  to={scan.status === 'completed' ? `/scan/${scan._id}/results` : `/scan/${scan._id}`}
                >
                  <div className="p-4 rounded-lg border border-light-border dark:border-dark-border hover:border-primary transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        {getStatusIcon(scan.status)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{scan.targetUrl}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {scan.scanType. toUpperCase()} • {new Date(scan.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`text-sm font-semibold ${getStatusColor(scan.status)} capitalize`}>
                        {scan.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}