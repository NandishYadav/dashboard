import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MetricCard = ({
    title,
    children,
    trend,
    className = '',
    onClick,
    clickable = false
}) => {
    const getTrendIcon = () => {
        if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
        if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
        if (trend === 'stable') return <Minus className="w-4 h-4 text-gray-500" />;
        return null;
    };

    return (
        <div
            className={`metric-card ${clickable ? 'cursor-pointer hover:border-blue-500 dark:hover:border-blue-400' : ''} ${className}`}
            onClick={onClick}
        >
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {title}
                </h3>
                {trend && getTrendIcon()}
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};

export default MetricCard;
