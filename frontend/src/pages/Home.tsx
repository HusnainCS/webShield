import { Link } from 'react-router-dom';
import { FaShieldAlt, FaLock, FaSearch, FaBug } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:50px_50px] opacity-20"></div>
      
      {/* Hero Section */}
      <section className="relative container mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          {/* Main Icon */}
          <div className="flex justify-center">
            <FaShieldAlt className="text-primary text-8xl animate-pulse cyber-glow-strong" />
          </div>

          {/* Heading */}
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-green-300 to-primary bg-clip-text text-transparent">
            webShield
          </h1>
          
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            Professional Web Security Scanner powered by Kali Linux Tools
          </p>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive vulnerability assessment using industry-standard tools:  
            <span className="text-primary font-semibold"> Nmap, Nikto, SQLMap, and SSLScan</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center pt-8">
            <Link
              to="/signup"
              className="px-8 py-4 bg-primary text-black font-bold text-lg rounded-md hover:cyber-glow-strong transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/about-tools"
              className="px-8 py-4 bg-secondary cyber-border text-primary font-bold text-lg rounded-md hover:bg-primary/10 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">
          Security Tools
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Nmap */}
          <div className="bg-secondary/50 cyber-border rounded-lg p-6 hover:cyber-glow transition-all duration-300 transform hover:-translate-y-2">
            <FaSearch className="text-primary text-5xl mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-primary">Nmap</h3>
            <p className="text-gray-400">
              Network exploration and port scanning to discover open ports and services. 
            </p>
          </div>

          {/* Nikto */}
          <div className="bg-secondary/50 cyber-border rounded-lg p-6 hover:cyber-glow transition-all duration-300 transform hover:-translate-y-2">
            <FaBug className="text-primary text-5xl mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-primary">Nikto</h3>
            <p className="text-gray-400">
              Web server scanner that tests for dangerous files and outdated versions.
            </p>
          </div>

          {/* SQLMap */}
          <div className="bg-secondary/50 cyber-border rounded-lg p-6 hover:cyber-glow transition-all duration-300 transform hover:-translate-y-2">
            <FaLock className="text-primary text-5xl mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-primary">SQLMap</h3>
            <p className="text-gray-400">
              Automated SQL injection detection and database takeover tool.
            </p>
          </div>

          {/* SSLScan */}
          <div className="bg-secondary/50 cyber-border rounded-lg p-6 hover:cyber-glow transition-all duration-300 transform hover:-translate-y-2">
            <FaShieldAlt className="text-primary text-5xl mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-primary">SSLScan</h3>
            <p className="text-gray-400">
              SSL/TLS cipher suite analysis and certificate verification.
            </p>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="relative container mx-auto px-6 py-16">
        <div className="bg-red-500/10 border-2 border-red-500/50 rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-3">
            <FaShieldAlt className="text-3xl" />
            Important Notice
          </h3>
          <ul className="space-y-3 text-gray-300 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold">⚠️</span>
              <span>Educational purposes only</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold">⚠️</span>
              <span>Always obtain written permission before scanning any website</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold">⚠️</span>
              <span>Unauthorized scanning may be illegal in your jurisdiction</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold">⚠️</span>
              <span>Use responsibly and ethically</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;