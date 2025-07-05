import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface GPTItem {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submitter: string;
  date: string;
}

const ModerationPanel: React.FC = () => {
  const { t } = useTranslation();
  const [gpts, setGpts] = useState<GPTItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    fetchGPTs();
  }, []);

  const fetchGPTs = async () => {
    try {
      const response = await fetch('/api/gpts');
      const data = await response.json();
      setGpts(data);
    } catch (error) {
      console.error('Error fetching GPTs:', error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      await fetch(`/api/gpts/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchGPTs();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredGpts = gpts.filter(gpt => {
    const matchesSearch = gpt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gpt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || gpt.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">{t('moderation.title')}</h1>

        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder={t('moderation.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700"
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700"
            >
              <option value="all">{t('moderation.all')}</option>
              <option value="pending">{t('moderation.pending')}</option>
              <option value="approved">{t('moderation.approved')}</option>
              <option value="rejected">{t('moderation.rejected')}</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredGpts.map((gpt) => (
            <div
              key={gpt.id}
              className="bg-gray-800 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{gpt.name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  gpt.status === 'approved' ? 'bg-green-500' :
                  gpt.status === 'rejected' ? 'bg-red-500' :
                  'bg-yellow-500'
                }`}>
                  {t(`moderation.status.${gpt.status}`)}
                </span>
              </div>
              <p className="mb-4">{gpt.description}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleStatusChange(gpt.id, 'approved')}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
                >
                  {t('moderation.approve')}
                </button>
                <button
                  onClick={() => handleStatusChange(gpt.id, 'rejected')}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
                >
                  {t('moderation.reject')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModerationPanel;
