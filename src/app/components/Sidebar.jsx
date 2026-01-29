import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Database,
  HardDrive,
  Activity,
  TrendingUp,
  Lock,
  Clock,
  Settings,
  LogOut,
  User,
  Menu
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Separator } from '@/app/components/ui/separator';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';

export function Sidebar({ activeSection, onSectionChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    // { id: 'incidents', label: 'Active Incidents', icon: Activity },
    { id: 'cpu-session', label: 'CPU by Session', icon: TrendingUp },
    { id: 'cpu-sql', label: 'CPU by SQL', icon: Database },
    { id: 'blocking', label: 'Blocking Sessions', icon: Lock },
    // { id: 'long-running', label: 'Long Running', icon: Clock },
    { id: 'storage', label: 'Storage Health', icon: HardDrive },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg border border-gray-200 shadow-md"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 z-40
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-600" />
                  <span className="font-bold text-gray-900">Oracle DB</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`${isCollapsed ? 'mx-auto' : ''}`}
              >
                {isCollapsed ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-gray-200">
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <Avatar>
                <AvatarFallback className="bg-blue-600 text-white">
                  DB
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">DBA Admin</p>
                  <p className="text-xs text-gray-500 truncate">admin@company.com</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-colors
                      ${isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    {!isCollapsed && <span className="text-sm">{item.label}</span>}
                  </button>
                );
              })}
            </div>

            <Separator className="my-4" />

            {/* Settings */}
            <button
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                text-gray-700 hover:bg-gray-50 transition-colors
                ${isCollapsed ? 'justify-center' : ''}
              `}
              title={isCollapsed ? 'Settings' : undefined}
            >
              <Settings className="w-5 h-5 text-gray-500 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm">Settings</span>}
            </button>
          </nav>

          {/* Footer - Logout */}
          <div className="p-3 border-t border-gray-200">
            <button
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                text-red-600 hover:bg-red-50 transition-colors
                ${isCollapsed ? 'justify-center' : ''}
              `}
              title={isCollapsed ? 'Logout' : undefined}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
