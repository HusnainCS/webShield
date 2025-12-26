import type { IconType } from 'react-icons';

interface ToolCardProps {
  name: string;
  icon: IconType;
  description: string;
  features: string[];
  color?:  string;
}

const ToolCard = ({ name, icon: Icon, description, features, color = 'text-primary' }: ToolCardProps) => {
  return (
    <div className="bg-secondary/50 cyber-border rounded-lg p-6 hover:cyber-glow transition-all duration-300 transform hover:-translate-y-2">
      {/* Icon */}
      <div className={`${color} text-5xl mb-4`}>
        <Icon />
      </div>

      {/* Name */}
      <h3 className="text-2xl font-bold mb-3 text-primary">{name}</h3>

      {/* Description */}
      <p className="text-gray-400 mb-4 text-sm">{description}</p>

      {/* Features */}
      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-2">Features:</h4>
        <ul className="space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-500 text-xs flex items-start gap-2">
              <span className="text-primary mt-0.5">▶</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToolCard;