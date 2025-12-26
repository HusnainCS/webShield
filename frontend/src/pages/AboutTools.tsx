import { FaSearch, FaBug, FaDatabase, FaLock, FaShieldAlt } from 'react-icons/fa';

const AboutTools = () => {
  const tools = [
    {
      name: 'Nmap',
      icon: FaSearch,
      description: 'Network Mapper - The industry standard for network discovery and security auditing.',
      features: [
        'Host discovery and port scanning',
        'Service and version detection',
        'Operating system detection',
        'Scriptable interaction with target',
        'Flexible target and port specification',
      ],
      useCases: [
        'Network inventory',
        'Managing service upgrade schedules',
        'Monitoring host or service uptime',
        'Security auditing',
      ],
    },
    {
      name: 'Nikto',
      icon: FaBug,
      description: 'Open source web server scanner that performs comprehensive tests against web servers.',
      features: [
        'Checks for over 6700 potentially dangerous files/programs',
        'Checks for outdated versions of over 1250 servers',
        'Version specific problems on over 270 servers',
        'Server configuration items such as multiple index files',
        'SSL support and certificate checking',
      ],
      useCases: [
        'Web server vulnerability assessment',
        'Configuration testing',
        'Security compliance checking',
        'Pre-deployment security testing',
      ],
    },
    {
      name: 'SQLMap',
      icon: FaDatabase,
      description: 'Automatic SQL injection and database takeover tool.',
      features: [
        'Full support for MySQL, Oracle, PostgreSQL, and more',
        'Six SQL injection techniques',
        'Database fingerprinting',
        'Data extraction from databases',
        'File system access and command execution',
      ],
      useCases: [
        'SQL injection vulnerability detection',
        'Database security assessment',
        'Penetration testing',
        'Security research',
      ],
    },
    {
      name: 'SSLScan',
      icon: FaLock,
      description: 'Fast SSL/TLS scanner that queries SSL services to determine supported cipher suites.',
      features: [
        'SSL/TLS protocol version detection',
        'Cipher suite enumeration',
        'Certificate information extraction',
        'Heartbleed vulnerability detection',
        'Weak cipher identification',
      ],
      useCases: [
        'SSL/TLS configuration assessment',
        'Certificate validation',
        'Compliance checking (PCI DSS)',
        'Vulnerability assessment',
      ],
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:50px_50px] opacity-10"></div>

      <div className="relative container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <FaShieldAlt className="text-primary text-7xl mx-auto mb-6 cyber-glow" />
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-green-300 bg-clip-text text-transparent">
            Security Tools
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Industry-standard Kali Linux tools for comprehensive web security assessment
          </p>
        </div>

        {/* Tools */}
        <div className="space-y-16">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="bg-secondary/50 cyber-border rounded-lg p-8 hover:cyber-glow transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="bg-primary/20 p-6 rounded-lg">
                    <Icon className="text-primary text-5xl" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-primary mb-4">{tool.name}</h2>
                    <p className="text-gray-300 text-lg mb-6">{tool.description}</p>

                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-primary mb-3">Key Features: </h3>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {tool.features. map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-400">
                            <span className="text-primary mt-1">▶</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Use Cases */}
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-3">Use Cases:</h3>
                      <ul className="grid md: grid-cols-2 gap-3">
                        {tool. useCases.map((useCase, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-400">
                            <span className="text-primary mt-1">✓</span>
                            <span>{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-16 bg-red-500/10 border-2 border-red-500/50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-3">
            <FaShieldAlt className="text-3xl" />
            Ethical Use Policy
          </h3>
          <div className="text-gray-300 space-y-2">
            <p>These tools are powerful and must be used responsibly: </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Only scan systems you own or have explicit written permission to test</li>
              <li>Unauthorized scanning may violate laws including the Computer Fraud and Abuse Act</li>
              <li>Always respect privacy and confidentiality</li>
              <li>Use findings to improve security, not exploit vulnerabilities</li>
              <li>Follow responsible disclosure practices if you discover vulnerabilities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTools;