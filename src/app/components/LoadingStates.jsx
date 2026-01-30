export function LoadingSpinner({ size = 'md', className = '' }) {
    const sizeClasses = {
        sm: 'h-6 w-6 border-2',
        md: 'h-12 w-12 border-2',
        lg: 'h-16 w-16 border-3',
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div
                className={`animate-spin rounded-full border-blue-600 border-t-transparent ${sizeClasses[size]}`}
            ></div>
        </div>
    );
}

export function LoadingCard() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
    );
}

export function LoadingTable() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="animate-pulse space-y-3">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="h-4 bg-gray-200 rounded flex-1"></div>
                        <div className="h-4 bg-gray-200 rounded flex-1"></div>
                        <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function LoadingChart() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-gray-600 font-medium">Loading Dashboard...</p>
            </div>
        </div>
    );
}
