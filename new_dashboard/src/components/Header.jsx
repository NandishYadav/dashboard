import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Database as DatabaseIcon, Clock, Menu } from 'lucide-react';
import {
    selectTheme,
    toggleTheme,
    selectCurrentDb,
    selectTimeRange,
    setTimeRange,
    setCurrentDb,
    toggleSidebar
} from '../store/dbSlice';
import { useGetDatabasesQuery } from '../services/api';

const Header = ({ breadcrumbs = [] }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useSelector(selectTheme);
    const currentDb = useSelector(selectCurrentDb);
    const timeRange = useSelector(selectTimeRange);

    // Fetch databases for the dropdown
    const { data: databases } = useGetDatabasesQuery();

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    const handleDbChange = (e) => {
        const dbId = e.target.value;
        const selectedDb = databases?.find(db => db.id === dbId);
        if (selectedDb) {
            dispatch(setCurrentDb(selectedDb));
            navigate('/dashboard');
        }
    };

    const handleTimeRangeChange = (e) => {
        dispatch(setTimeRange(e.target.value));
    };

    const timeRanges = [
        { value: '30m', label: '30m' }, // Shortened labels for mobile?
        { value: '1h', label: '1h' },
        { value: '6h', label: '6h' },
        { value: 'custom', label: 'Custom' },
    ];

    // Labels mapping for display if needed, but select option text is what shows.
    // Let's stick to full labels but maybe max-width truncates?
    // Actually shorter labels are better for responsive.
    const timeRangesFull = [
        { value: '30m', label: 'Last 30 min', mobileLabel: '30m' },
        { value: '1h', label: 'Last 1 hour', mobileLabel: '1h' },
        { value: '6h', label: 'Last 6 hours', mobileLabel: '6h' },
        { value: 'custom', label: 'Custom', mobileLabel: 'Custom' },
    ];

    return (
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 md:px-6 flex items-center justify-between z-10 relative">
            {/* Left Section: Hamburger + Breadcrumbs/Title */}
            <div className="flex items-center">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => dispatch(toggleSidebar())}
                    className="mr-3 p-2 md:hidden rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-400 transition-colors"
                    aria-label="Toggle menu"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Breadcrumbs - Hidden on small mobile */}
                <div className="hidden md:flex items-center space-x-2 text-sm max-w-md overflow-hidden truncate">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <span className="text-gray-400">/</span>}
                            <span
                                className={
                                    index === breadcrumbs.length - 1
                                        ? 'text-gray-900 dark:text-white font-semibold'
                                        : 'text-gray-600 dark:text-gray-400'
                                }
                            >
                                {crumb}
                            </span>
                        </React.Fragment>
                    ))}
                </div>

                {/* Mobile Title */}
                <div className="md:hidden font-semibold text-gray-900 dark:text-white truncate max-w-[120px]">
                    {breadcrumbs[breadcrumbs.length - 1] || 'OraView'}
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 md:space-x-4">
                {/* Controls - Only show if a DB is selected */}
                {currentDb && databases && (
                    <>
                        {/* Database Selector */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-2 md:pl-3 flex items-center pointer-events-none">
                                <DatabaseIcon className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
                            </div>
                            <select
                                value={currentDb.id}
                                onChange={handleDbChange}
                                className="pl-7 pr-6 md:pl-9 md:pr-8 py-1.5 text-xs md:text-sm bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors min-w-[100px] md:min-w-[160px] max-w-[140px] md:max-w-none truncate"
                            >
                                {databases.map(db => (
                                    <option key={db.id} value={db.id}>
                                        {db.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Time Range Selector */}
                        <div className="relative hidden sm:block"> {/* Hide on very small screens? Or show? */}
                            {/* Responsive solution: Show full on desktop, hide label on mobile? */}
                            {/* If we hide it on mobile (xs), user can't change time. */}
                            {/* Let's show it but compact. */}
                            <div className="absolute inset-y-0 left-0 pl-2 md:pl-3 flex items-center pointer-events-none">
                                <Clock className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
                            </div>
                            <select
                                value={timeRange}
                                onChange={handleTimeRangeChange}
                                className="pl-7 pr-6 md:pl-9 md:pr-8 py-1.5 text-xs md:text-sm bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors w-[90px] md:w-auto"
                            >
                                {timeRangesFull.map(range => (
                                    <option key={range.value} value={range.value}>
                                        {/* Use a media query in CSS to show different text? No, option text is static. */}
                                        {/* Simple solution: use short labels for everyone for now, OR rely on truncated width. */}
                                        {range.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="h-6 w-px bg-gray-300 dark:bg-slate-600 mx-1 md:mx-2 hidden sm:block"></div>
                    </>
                )}

                {/* Theme Toggle */}
                <button
                    onClick={handleThemeToggle}
                    className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-slate-600"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? (
                        <Moon className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-400" />
                    ) : (
                        <Sun className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-400" />
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
