import { X, Copy, AlertTriangle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { useState } from 'react';

export function SQLDetailDrawer({ incident, onClose }) {
  const [showKillConfirm, setShowKillConfirm] = useState(false);

  if (!incident) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(incident.sqlText);
  };

  const handleKillSession = () => {
    // Mock action
    alert(`Kill session ${incident.sid} confirmed (mock action)`);
    setShowKillConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose}></div>

      {/* Drawer */}
      <div className="ml-auto relative w-full max-w-2xl bg-white shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Session Details</h2>
            <p className="text-sm text-gray-600">SID: {incident.sid} • SQL ID: {incident.sqlId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Username</p>
              <p className="text-lg font-semibold text-gray-900">{incident.username}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Role</p>
              <Badge variant={incident.role === 'BLOCKER' ? 'destructive' : 'secondary'}>
                {incident.role}
              </Badge>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Elapsed Time</p>
              <p className="text-lg font-semibold text-gray-900">
                {Math.floor(incident.elapsedTime / 60)}m {incident.elapsedTime % 60}s
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Wait Event</p>
              <p className="text-sm font-medium text-gray-900">{incident.waitEvent}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Wait Class</p>
              <Badge variant={
                incident.waitClass === 'Application' || incident.waitClass === 'Concurrency'
                  ? 'destructive'
                  : 'outline'
              }>
                {incident.waitClass}
              </Badge>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Impacted Sessions</p>
              <p className="text-lg font-semibold text-red-600">{incident.impactedSessions || 0}</p>
            </div>
          </div>

          {/* Blocking Info */}
          {incident.blockingSid && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900">Blocked by Session</p>
                  <p className="text-sm text-red-700">
                    This session is waiting on SID <span className="font-mono font-bold">{incident.blockingSid}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SQL Text */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">SQL Statement</h3>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap">
                {incident.sqlText}
              </pre>
            </div>
          </div>

          {/* Mock Statistics */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Execution Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">CPU Time</p>
                <p className="text-lg font-semibold text-gray-900">
                  {(Math.random() * 100).toFixed(2)}s
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Executions</p>
                <p className="text-lg font-semibold text-gray-900">
                  {Math.floor(Math.random() * 1000)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Rows Processed</p>
                <p className="text-lg font-semibold text-gray-900">
                  {Math.floor(Math.random() * 10000).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
            
            {!showKillConfirm ? (
              <Button
                variant="destructive"
                onClick={() => setShowKillConfirm(true)}
                className="w-full"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Kill Session
              </Button>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-900 font-medium mb-3">
                  Are you sure you want to kill session {incident.sid}?
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={handleKillSession}
                    className="flex-1"
                  >
                    Confirm Kill
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowKillConfirm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
