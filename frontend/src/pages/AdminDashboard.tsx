import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthNavbar from '../components/layout/AuthNavbar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

interface AdminStats {
  totalUsers: number;
  totalScans: number;
  activeScans: number;
  recentUsers: any[];
  recentScans: any[];
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalScans: 0,
    activeScans:  0,
    recentUsers: [],
    recentScans: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is admin
    if (user?. role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    fetchAdminStats();
  }, [user, navigate]);

  const fetchAdminStats = async () => {
    try {
      console.log('Fetching admin stats...');
      const response = await axios.get(`${API_URL}/admin/stats`, {
        withCredentials: true,
      });
      console.log('Admin stats:', response.data);
      setStats(response.data);
    } catch (error:  any) {
      console.error('Failed to fetch admin stats:', error);
      setError(error.response?. data?.error || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container min-h-screen">
        <AuthNavbar />
        <div className="content-wrapper flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container min-h-screen">
        <AuthNavbar />
        <div className="content-wrapper flex items-center justify-center min-h-[80vh]">
          <Card className="max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <Button onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container min-h-screen">
      <AuthNavbar />
      
      <div className="content-wrapper py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gradient">Admin Dashboard</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage users and monitor system activity
            </p>
          </div>
          <div className="px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg">
            <span className="text-red-500 font-bold">ADMIN ACCESS</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Users */}
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark: text-gray-400">Total Users</p>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
              </div>
            </div>
          </Card>

          {/* Total Scans */}
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Scans</p>
                <p className="text-3xl font-bold">{stats.totalScans}</p>
              </div>
            </div>
          </Card>

          {/* Active Scans */}
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-yellow-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Scans</p>
                <p className="text-3xl font-bold text-yellow-500">{stats. activeScans}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Users and Scans */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card>
            <h2 className="text-2xl font-bold mb-4">Recent Users</h2>
            {stats.recentUsers.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                No users yet
              </p>
            ) : (
              <div className="space-y-3">
                {stats.recentUsers.map((user: any) => (
                  <div 
                    key={user._id}
                    className="p-3 rounded-lg border border-light-border dark:border-dark-border hover:border-primary transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-black font-bold">
                            {user.username. charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{user.username}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs font-semibold capitalize text-primary">
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Recent Scans */}
          <Card>
            <h2 className="text-2xl font-bold mb-4">Recent Scans</h2>
            {stats.recentScans. length === 0 ? (
              <p className="text-center text-gray-600 dark: text-gray-400 py-8">
                No scans yet
              </p>
            ) : (
              <div className="space-y-3">
                {stats.recentScans. map((scan: any) => (
                  <div 
                    key={scan._id}
                    className="p-3 rounded-lg border border-light-border dark:border-dark-border hover:border-primary transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{scan. targetUrl}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {scan.scanType. toUpperCase()} • {new Date(scan. createdAt).toLocaleDateString()}
                        </p>
                        {scan.userId && (
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            by {scan.userId.username}
                          </p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ml-2 ${
                        scan.status === 'completed' ?  'bg-green-500/20 text-green-500' : 
                        scan.status === 'running' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {scan.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}