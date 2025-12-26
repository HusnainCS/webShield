import { FaSearch, FaBug, FaDatabase, FaLock } from 'react-icons/fa';
import ToolCard from './ToolCard';

const ToolInfo = () => {
  const tools = [
    {
      name: 'Nmap',
      icon:  FaSearch,
      description:  'Network exploration tool and security/port scanner',
      features: [
        'Port scanning',
        'Service detection',
        'OS detection',
        'Network mapping',
      ],
      color: 'text-blue-400',
    },
    {
      name: 'Nikto',
      icon: FaBug,
      description: 'Web server scanner for vulnerabilities and misconfigurations',
      features:  [
        'Vulnerability scanning',
        'CGI testing',
        'Server enumeration',
        'Plugin support',
      ],
      color:  'text-red-400',
    },
    {
      name: 'SQLMap',
      icon: FaDatabase,
      description: 'Automatic SQL injection and database takeover tool',
      features: [
        'SQL injection detection',
        'Database fingerprinting',
        'Data extraction',
        'Database access',
      ],
      color:  'text-yellow-400',
    },
    {
      name: 'SSLScan',
      icon:  FaLock,
      description: 'SSL/TLS scanner for supported ciphers and protocols',
      features: [
        'Cipher enumeration',
        'Protocol testing',
        'Certificate info',
        'Vulnerability checks',
      ],
      color:  'text-green-400',
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tools.map((tool, index) => (
        <ToolCard key={index} {... tool} />
      ))}
    </div>
  );
};

export default ToolInfo;