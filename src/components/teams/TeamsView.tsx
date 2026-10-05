import React, { useState } from 'react';
import { Users, CheckSquare, Plus, ArrowRight, User as UserIcon } from 'lucide-react';
import { ProjectTeam, User } from '../../types';
import { RELifeStore } from '../../services/storage';

interface TeamsViewProps {
  currentUser: User;
  teams: ProjectTeam[];
  onRefreshTeams: () => void;
}

export const TeamsView: React.FC<TeamsViewProps> = ({ currentUser, teams, onRefreshTeams }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [projectTitle, setProjectTitle] = useState('Smart Environmental & Weather Monitor');

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeam: ProjectTeam = {
      id: `team-${Date.now()}`,
      name: teamName,
      projectId: 'proj-1',
      projectTitle,
      status: 'Planning',
      leadId: currentUser.id,
      leadName: currentUser.name,
      members: [
        { userId: currentUser.id, name: currentUser.name, role: 'Team Lead & Firmware' }
      ],
      tasks: [
        { id: 't-1', title: 'Inventory audit for required microcontrollers', assignee: currentUser.name, completed: false },
        { id: 't-2', title: 'Breadboard schematic & pin layout verification', assignee: currentUser.name, completed: false }
      ],
      claimedComponents: [],
      notes: 'Initial team workspace for circular electronics development.',
      updatedAt: new Date().toISOString()
    };
    RELifeStore.addTeam(newTeam);
    setShowCreateModal(false);
    setTeamName('');
    onRefreshTeams();
  };

  const toggleTask = (team: ProjectTeam, taskId: string) => {
    const updated = {
      ...team,
      tasks: team.tasks.map(t => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    };
    RELifeStore.updateTeam(updated);
    onRefreshTeams();
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            Project Team Collaboration
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Build circular hardware collaboratively. Share inventories, assign milestones, and coordinate testing.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer transition-colors shadow-xs"
        >
          + Create Team
        </button>
      </div>

      <div className="space-y-6">
        {teams.map(team => (
          <div key={team.id} className="bg-white rounded-xl border border-stone-200 shadow-xs p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                  {team.projectTitle}
                </span>
                <h3 className="text-lg font-bold text-stone-900">{team.name}</h3>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 self-start">
                Phase: {team.status}
              </span>
            </div>

            {/* Team Members */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-stone-700 mb-2">Active Team Members:</div>
              <div className="flex flex-wrap gap-2">
                {team.members.map((m, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-50 rounded-md border border-stone-200 text-xs text-stone-800"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-stone-500" />
                    <span>{m.name}</span>
                    <span className="text-[10px] text-stone-400">({m.role})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Tasks checklist */}
            <div className="pt-4 border-t border-stone-100 space-y-2">
              <div className="text-xs font-semibold text-stone-700">Milestone Tasks:</div>
              <div className="space-y-1.5 text-xs">
                {team.tasks.map(task => (
                  <label
                    key={task.id}
                    className="flex items-center justify-between p-2 rounded hover:bg-stone-50 cursor-pointer border border-transparent hover:border-stone-200"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(team, task.id)}
                        className="rounded text-emerald-800 focus:ring-emerald-700"
                      />
                      <span className={task.completed ? 'line-through text-stone-400' : 'text-stone-800'}>
                        {task.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400">Assigned: {task.assignee}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Claimed Components */}
            {team.claimedComponents.length > 0 && (
              <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600">
                <span className="font-semibold text-stone-800">Claimed Surplus Parts: </span>
                {team.claimedComponents.map(c => `${c.componentName} (claimed by ${c.claimedBy})`).join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-stone-900">Create New Project Team</h3>
            <form onSubmit={handleCreateTeam} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Team Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Makerspace Rover Squad"
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Target Project</label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={e => setProjectTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-2 text-stone-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-md cursor-pointer"
                >
                  Form Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
