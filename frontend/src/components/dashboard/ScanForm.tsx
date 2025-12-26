import { useState, type FormEvent } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { validateURL } from '../../utlis/validation';
import Button from '../common/Button';
import { scanAPI } from '../../services/api';

const ScanForm = () => {
  const [url, setUrl] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>(['nmap', 'nikto', 'sqlmap', 'sslscan']);
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const tools = [
    { id: 'nmap', name: 'Nmap', description: 'Port Scanner' },
    { id: 'nikto', name: 'Nikto', description: 'Web Server Scanner' },
    { id: 'sqlmap', name:  'SQLMap', description: 'SQL Injection' },
    { id: 'sslscan', name: 'SSLScan', description:  'SSL/TLS Scanner' },
  ];

  const handleToolToggle = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter(t => t !== toolId));
    } else {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setScanResult(null);

    // Validate URL
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateURL(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    // Validate tool selection
    if (selectedTools. length === 0) {
      setError('Please select at least one tool');
      return;
    }

    setIsScanning(true);

    try {
      const result = await scanAPI. startScan(url, selectedTools);
      setScanResult(result);
      setUrl('');
    } catch (err:  any) {
      setError(err.response?.data?.message || 'Scan failed.  Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="bg-secondary/50 cyber-border rounded-lg p-8">
      <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
        <FaSearch />
        Start Security Scan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL Input */}
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
            Target URL
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-3 bg-secondary cyber-border rounded-md focus:outline-none focus:border-primary text-white"
            disabled={isScanning}
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        {/* Tool Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Select Tools
          </label>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => !isScanning && handleToolToggle(tool.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedTools. includes(tool.id)
                    ? 'border-primary bg-primary/10 cyber-glow'
                    :  'border-gray-600 bg-secondary hover:border-primary/50'
                } ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={selectedTools.includes(tool. id)}
                    onChange={() => {}}
                    className="w-4 h-4 accent-primary"
                    disabled={isScanning}
                  />
                  <span className="font-semibold text-primary">{tool.name}</span>
                </div>
                <p className="text-xs text-gray-400 ml-6">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          isLoading={isScanning}
          className="w-full text-lg"
          disabled={isScanning}
        >
          {isScanning ?  (
            <span className="flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin" />
              Scanning in progress...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <FaSearch />
              Start Scan
            </span>
          )}
        </Button>
      </form>

      {/* Scan Result */}
      {scanResult && (
        <div className="mt-8 p-6 bg-primary/10 border border-primary/30 rounded-lg">
          <h3 className="text-xl font-bold text-primary mb-4">Scan Initiated Successfully</h3>
          <p className="text-gray-300">
            Scan ID: <span className="text-primary font-mono">{scanResult.scanId || 'N/A'}</span>
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Your scan has been queued.  Results will be available shortly.
          </p>
        </div>
      )}
    </div>
  );
};

export default ScanForm;