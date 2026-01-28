import { useState } from 'react';
import React from 'react';
import { ChevronDown, ChevronRight, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';

export function IncidentTable({ incidents, onRowClick }) {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRow = (id) => {
    const newExpanded = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const formatElapsedTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  const getRoleBadge = (role) => {
    const variants = {
      'BLOCKER': 'destructive',
      'VICTIM': 'secondary',
      'LONG RUNNER': 'default',
    } ;
    return <Badge variant={variants[role]}>{role}</Badge>;
  };

  const getRowHighlight = (incident) => {
    if (incident.role === 'BLOCKER' && incident.impactedSessions > 2) {
      return 'bg-red-50 border-l-4 border-l-red-500';
    }
    if (incident.waitClass === 'Application' || incident.waitClass === 'Concurrency') {
      return 'bg-orange-50 border-l-4 border-l-orange-500';
    }
    if (incident.elapsedTime > 1800) {
      return 'bg-red-50 border-l-4 border-l-red-400';
    }
    return 'hover:bg-gray-50';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-8"></TableHead>
            <TableHead>Role</TableHead>
            <TableHead>SID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>SQL ID</TableHead>
            <TableHead>Elapsed</TableHead>
            <TableHead>Wait Event</TableHead>
            <TableHead>Wait Class</TableHead>
            <TableHead>Blocking SID</TableHead>
            <TableHead>Impact</TableHead>
            <TableHead>SQL Text</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.flatMap((incident) => {
            const rows = [
              <TableRow
                key={incident.id}
                className={`cursor-pointer transition-colors ${getRowHighlight(incident)}`}
                onClick={() => onRowClick(incident)}
              >
                <TableCell>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRow(incident.id);
                    }}
                    className="hover:bg-gray-200 rounded p-1"
                  >
                    {expandedRows.has(incident.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </TableCell>
                <TableCell>{getRoleBadge(incident.role)}</TableCell>
                <TableCell>
                  <button 
                    className="text-blue-600 hover:text-blue-800 hover:underline font-mono"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowClick(incident);
                    }}
                  >
                    {incident.sid}
                  </button>
                </TableCell>
                <TableCell className="font-medium">{incident.username}</TableCell>
                <TableCell className="font-mono text-sm text-gray-700">{incident.sqlId}</TableCell>
                <TableCell>
                  <span className={`font-medium ${incident.elapsedTime > 1800 ? 'text-red-600' : incident.elapsedTime > 300 ? 'text-orange-600' : 'text-gray-900'}`}>
                    {formatElapsedTime(incident.elapsedTime)}
                  </span>
                </TableCell>
                <TableCell className="text-sm">{incident.waitEvent}</TableCell>
                <TableCell>
                  <Badge variant={
                    incident.waitClass === 'Application' || incident.waitClass === 'Concurrency' 
                      ? 'destructive' 
                      : 'outline'
                  }>
                    {incident.waitClass}
                  </Badge>
                </TableCell>
                <TableCell>
                  {incident.blockingSid ? (
                    <span className="font-mono text-red-600 font-medium">
                      {incident.blockingSid}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {incident.impactedSessions > 0 ? (
                    <div className="flex items-center gap-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="font-medium text-red-600">{incident.impactedSessions}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
                <TableCell className="max-w-xs truncate text-sm text-gray-600">
                  {incident.sqlText}
                </TableCell>
              </TableRow>
            ];

            if (expandedRows.has(incident.id)) {
              rows.push(
                <TableRow key={`${incident.id}-expanded`} className="bg-gray-50">
                  <TableCell colSpan={11} className="p-4">
                    <div className="bg-white rounded border border-gray-200 p-4">
                      <p className="text-xs font-medium text-gray-500 mb-2">Full SQL Text:</p>
                      <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap overflow-x-auto">
                        {incident.sqlText}
                      </pre>
                    </div>
                  </TableCell>
                </TableRow>
              );
            }

            return rows;
          })}
        </TableBody>
      </Table>
    </div>
  );
}