import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    Database,
    LayoutDashboard,
    Activity,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    ChevronDown
} from 'lucide-react';
import { selectSidebarCollapsed, toggleSidebar, logout, selectCurrentDb } from '../store/dbSlice';

const Sidebar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const collapsed = useSelector(selectSidebarCollapsed);
    const currentDb = useSelector(selectCurrentDb);
    const [expandedItems, setExpandedItems] = useState({});

    const handleLogout = () => {
        dispatch(logout());
    };

    const toggleSubMenu = (itemId, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (collapsed) {
            dispatch(toggleSidebar());
        }
        setExpandedItems(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    const navItems = [
        { path: '/select-db', icon: Database, label: 'Database Fleet' },
        {
            id: 'dashboard',
            path: '/dashboard',
            icon: LayoutDashboard,
            label: 'Dashboard',
            disabled: !currentDb,
            subItems: currentDb ? [
                { path: `/metric/cpu/${currentDb.id}`, label: 'CPU Usage' },
                { path: `/metric/sessions/${currentDb.id}`, label: 'Active Sessions' },
                { path: `/metric/iops/${currentDb.id}`, label: 'IOPS' },
            ] : []
        },
        { path: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <>
            {/* Mobile Overlay Backdrop */}
            {!collapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden glass-backdrop"
                    onClick={() => dispatch(toggleSidebar())}
                />
            )}

            <div
                className={`
                    fixed md:static inset-y-0 left-0 z-30
                    ${collapsed ? '-translate-x-full md:translate-x-0 md:w-16' : 'translate-x-0 w-64'}
                    bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 
                    transition-all duration-300 flex flex-col shadow-xl md:shadow-none
                `}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-slate-700">
                    <div className={`flex items-center space-x-2 ${collapsed ? 'hidden md:flex md:justify-center' : ''}`}>
                        {!collapsed && <Database className="w-8 h-8 text-blue-600 flex-shrink-0" />}
                        {!collapsed && <span className="text-xl font-bold text-gray-900 dark:text-white truncate">OraView</span>}
                        {collapsed && <Database className="w-8 h-8 text-blue-600 flex-shrink-0" />}
                    </div>

                    <button
                        onClick={() => dispatch(toggleSidebar())}
                        className={`p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors ${collapsed ? 'hidden' : 'block md:block'}`}
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <div key={item.path || item.id}>
                            <div className="relative">
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-lg transition-colors ${item.disabled
                                            ? 'opacity-50 cursor-not-allowed'
                                            : isActive && !item.subItems // Only highlight parent if strict match or no sub-items? 
                                                // Actually usually parent stays highlighted if child is active. 
                                                // But NavLink 'isActive' does that for us if path matches prefix? No.
                                                // Let's rely on standard NavLink active logic for the main link.
                                                // If we are on a child path, we might want to highlight parent too?
                                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                : location.pathname.startsWith(item.path) && item.id === 'dashboard' // Keep parent active for sub-routes
                                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                                        }`
                                    }
                                    onClick={(e) => {
                                        if (item.disabled) e.preventDefault();
                                        // If clicking the row toggles menu?
                                        // User wants to optionally navigate. 
                                        // If I click Dashboard, I go to Dashboard.
                                        // I need a separate trigger for the dropdown if I want to stay enabled.
                                    }}
                                >
                                    <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
                                        <item.icon className="w-5 h-5 flex-shrink-0" />
                                        {!collapsed && <span className="font-medium">{item.label}</span>}
                                    </div>

                                    {/* Chevron for subitems */}
                                    {!collapsed && item.subItems && item.subItems.length > 0 && (
                                        <button
                                            onClick={(e) => toggleSubMenu(item.id, e)}
                                            className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded"
                                        >
                                            {expandedItems[item.id] ? (
                                                <ChevronDown className="w-4 h-4" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4" />
                                            )}
                                        </button>
                                    )}
                                </NavLink>
                            </div>

                            {/* Sub Items */}
                            {!collapsed && item.subItems && expandedItems[item.id] && (
                                <div className="mt-1 ml-9 space-y-1">
                                    {item.subItems.map((subItem) => (
                                        <NavLink
                                            key={subItem.path}
                                            to={subItem.path}
                                            className={({ isActive }) =>
                                                `block px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                                                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10 font-medium'
                                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                                }`
                                            }
                                        >
                                            {subItem.label}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-2 border-t border-gray-200 dark:border-slate-700">
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors`}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
