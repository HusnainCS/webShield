import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { scanAPI } from '../services/api';
import AuthNavbar from '../components/layout/AuthNavbar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { HiDownload, HiRefresh, HiArrowLeft, HiEye } from 'react-icons/hi';

interface Scan {
  _id: string;
  targetUrl: string;
  scanType: string;
  status: string;
  results?:  any;
  reportContent?: string;
  reportGeneratedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ScanResults() {
  const { scanId } = useParams<{ scanId:  string }>();
  const navigate = useNavigate();
  const [scan, setScan] = useState<Scan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generatingReport, setGeneratingReport] = useState(false);
  const [viewingReport, setViewingReport] = useState(false);

  useEffect(() => {
    if (scanId) {
      fetchScan();
    }
  }, [scanId]);

  const fetchScan = async () => {
    try {
      const response = await scanAPI.getScan(scanId!);
      setScan(response.scan);
    } catch (err:  any) {
      setError(err.message || 'Failed to fetch scan');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    setGeneratingReport(true);
    try {
      await scanAPI.generateReport(scanId!);
      await fetchScan();
      alert('Report generated successfully!');
    } catch (err) {
      alert('Failed to generate report.  Please try again.');
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleDownloadReport = () => {
    scanAPI.downloadReport(scanId! );
  };

  const handleViewReport = () => {
    setViewingReport(! viewingReport);
  };

  // Get scan type details
  const getScanTypeInfo = (type: string) => {
    const types:  any = {
      nmap: { name: 'Nmap', icon: '🔍', color: 'text-blue-500', bg: 'bg-blue-500/20' },
      nikto: { name: 'Nikto', icon: '🌐', color: 'text-red-500', bg: 'bg-red-500/20' },
      ssl: { name: 'SSL/TLS', icon: '🔒', color: 'text-green-500', bg: 'bg-green-500/20' },
      sqlmap: { name: 'SQLMap', icon: '💉', color: 'text-yellow-500', bg: 'bg-yellow-500/20' },
    };
    return types[type] || { name: type, icon: '📋', color: 'text-gray-500', bg: 'bg-gray-500/20' };
  };

  // Parse results for display
  const getResultsSummary = () => {
    if (!scan?.results) return null;

    const scanType = scan.scanType;
    const result = scan.results[scanType];

    if (!result) return null;

    switch (scanType) {
      case 'nmap':
        return {
          title: 'Open Ports Detected',
          count: result.openPorts?. length || 0,
          items: result.openPorts || [],
          type: 'info',
        };
      case 'nikto':
        return {
          title: 'Vulnerabilities Found',
          count: result.totalFindings || 0,
          items: result.findings?. slice(0, 10) || [],
          type: result.totalFindings > 5 ? 'warning' : 'info',
        };
      case 'ssl':
        return {
          title: 'SSL/TLS Issues',
          count: result.totalIssues || 0,
          items: result.issues?. slice(0, 10) || [],
          type: result.totalIssues > 0 ? 'warning' : 'success',
        };
      case 'sqlmap':
        return {
          title: 'SQL Injection Status',
          count: result.vulnerable ? 1 : 0,
          items: result.vulnerabilities || [],
          type: result.vulnerable ? 'danger' :  'success',
        };
      default: 
        return null;
    }
  };

  if (loading) {
    return (
      <div className="page-container min-h-screen">
        <AuthNavbar />
        <div className="content-wrapper flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !scan) {
    return (
      <div className="page-container min-h-screen">
        <AuthNavbar />
        <div className="content-wrapper flex items-center justify-center min-h-[80vh]">
          <Card className="max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error || 'Scan not found'}</p>
            <Button onClick={() => navigate('/dashboard')}>
              <HiArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const scanTypeInfo = getScanTypeInfo(scan.scanType);
  const summary = getResultsSummary();

  return (
    <div className="page-container min-h-screen">
      <AuthNavbar />
      
      <div className="content-wrapper py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gradient">Scan Results</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed security analysis report
            </p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>
            <HiArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Button>
        </div>

        {/* Scan Info Card */}
        <Card className="mb-6">
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 ${scanTypeInfo.bg} rounded-lg flex items-center justify-center text-3xl flex-shrink-0`}>
              {scanTypeInfo.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h2 className={`text-2xl font-bold ${scanTypeInfo.color}`}>
                  {scanTypeInfo.name} Scan
                </h2>
                <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-semibold">
                  COMPLETED
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 truncate">
                Target: <span className="font-mono">{scan.targetUrl}</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Scan ID</p>
                  <p className="font-mono text-xs">{scan._id. slice(0, 8)}...</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Started</p>
                  <p className="font-semibold">{new Date(scan.createdAt).toLocaleTimeString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="font-semibold">{new Date(scan.updatedAt).toLocaleTimeString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="font-semibold">
                    {Math.round((new Date(scan.updatedAt).getTime() - new Date(scan.createdAt).getTime()) / 1000)}s
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Summary */}
        {summary && (
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{summary.title}</h3>
              <div className={`px-4 py-2 rounded-lg font-bold text-2xl ${
                summary.type === 'danger' ? 'bg-red-500/20 text-red-500' :
                summary.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' : 
                summary.type === 'success' ? 'bg-green-500/20 text-green-500' :
                'bg-blue-500/20 text-blue-500'
              }`}>
                {summary.count}
              </div>
            </div>

            {summary.items.length > 0 ?  (
              <div className="space-y-2">
                {summary.items.map((item: string, index: number) => (
                  <div 
                    key={index}
                    className="p-3 bg-light-bg dark:bg-dark-bg rounded-lg border-l-4 border-primary"
                  >
                    <p className="text-sm font-mono">{item}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-3">✅</div>
                <p className="text-gray-600 dark:text-gray-400">
                  {scan.scanType === 'sqlmap' ? 'No SQL injection vulnerabilities detected' :  'No issues found'}
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Raw Results */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Raw Scan Output</h3>
            <Button 
              variant="secondary" 
              onClick={fetchScan}
              className="text-sm"
            >
              <HiRefresh className="w-4 h-4" />
              Refresh
            </Button>
          </div>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 font-mono text-sm">
            <pre>{JSON.stringify(scan.results, null, 2)}</pre>
          </div>
        </Card>

        {/* AI Report Section */}
        <Card>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">AI Security Report</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Generate a detailed AI-powered security analysis report with recommendations
              </p>

              {! scan.reportContent ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleGenerateReport} 
                    isLoading={generatingReport}
                    className="flex-1 sm:flex-none"
                  >
                    {generatingReport ? 'Generating...' : 'Generate AI Report'}
                  </Button>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    Powered by Groq AI
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Report generated on {new Date(scan.reportGeneratedAt! ).toLocaleString()}</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" onClick={handleViewReport}>
                      <HiEye className="w-5 h-5" />
                      {viewingReport ? 'Hide Report' : 'View Report'}
                    </Button>
                    <Button variant="primary" onClick={handleDownloadReport}>
                      <HiDownload className="w-5 h-5" />
                      Download Report
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={handleGenerateReport}
                      isLoading={generatingReport}
                    >
                      <HiRefresh className="w-5 h-5" />
                      Regenerate
                    </Button>
                  </div>

                  {/* View Report Content */}
                  {viewingReport && (
                    <div className="mt-6 p-6 bg-light-bg dark:bg-dark-bg rounded-lg border border-light-border dark:border-dark-border">
                      <h4 className="text-lg font-bold mb-4">Report Preview</h4>
                      <div className="prose dark:prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap text-sm">{scan.reportContent}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}