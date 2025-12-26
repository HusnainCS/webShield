import { FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import Button from '../common/Button';

interface DisclaimerModalProps {
  onAccept: () => void;
  onClose: () => void;
}

const DisclaimerModal = ({ onAccept, onClose }: DisclaimerModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-secondary cyber-border rounded-lg max-w-2xl w-full p-8 shadow-2xl cyber-glow">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <FaShieldAlt className="text-primary text-6xl cyber-glow" />
        </div>

        <h2 className="text-3xl font-bold text-center mb-4 text-primary">
          Welcome to webShield
        </h2>

        <p className="text-gray-300 text-center mb-8 text-lg">
          Before you proceed, please read and accept our terms of use
        </p>

        {/* Disclaimer Content */}
        <div className="bg-red-500/10 border-2 border-red-500/50 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <FaExclamationTriangle className="text-red-500 text-2xl mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3">Important Legal Notice</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">⚠️</span>
                  <span>This tool is for <strong className="text-primary">educational purposes only</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">⚠️</span>
                  <span>You must obtain <strong className="text-primary">written permission</strong> before scanning any website or network</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">⚠️</span>
                  <span>Unauthorized scanning is <strong className="text-primary">illegal</strong> and may result in criminal prosecution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">⚠️</span>
                  <span>Only scan systems you <strong className="text-primary">own</strong> or have <strong className="text-primary">explicit authorization</strong> to test</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">⚠️</span>
                  <span>You are <strong className="text-primary">solely responsible</strong> for your actions and any legal consequences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">⚠️</span>
                  <span>Use these tools <strong className="text-primary">ethically</strong> and <strong className="text-primary">responsibly</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Agreement Text */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
          <p className="text-gray-300 text-sm text-center">
            By clicking "Accept and Continue", you acknowledge that you have read, understood, 
            and agree to comply with all terms and legal requirements stated above.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={onClose}
            variant="secondary"
            className="flex-1"
          >
            Decline
          </Button>
          <Button
            onClick={onAccept}
            variant="primary"
            className="flex-1"
          >
            Accept and Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;