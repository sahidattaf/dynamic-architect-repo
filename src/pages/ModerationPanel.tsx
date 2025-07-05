import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface GPTItem {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  submitter: string;
  timestamp: string;
  badge?: 'verified' | 'trending' | 'rejected' | 'new';
  submissionHistory: {
    status: string;
    timestamp: string;
  }[];
}

const ModerationPanel: React.FC = () => {
  const { t } = useTranslation();
  const [gpts, setGpts] = useState<GPTItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedGpts, setSelectedGpts] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [analytics, setAnalytics] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    byCategory: {
      dev: 0,
      design: 0,
      writing: 0,
      research: 0
    }
  });

  useEffect(() => {
    fetchGPTs();
    
    // Auto-refresh every 30 seconds if enabled
    const refreshInterval = autoRefresh ? setInterval(fetchGPTs, 30000) : undefined;
    return () => refreshInterval && clearInterval(refreshInterval);
  }, [autoRefresh]);

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
      
      // Update feed if approved
      if (newStatus === 'approved') {
        await fetch('/api/feed/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id })
        });
      }
      
      fetchGPTs();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleExport = async () => {
    try {
      await fetch('/api/feed/export', {
        method: 'POST',
      });
      alert(t('moderation.export.success'));
    } catch (error) {
      console.error('Error exporting feed:', error);
      alert(t('moderation.export.error'));
    }
  };

  const filteredGpts = gpts.filter(gpt => {
    const matchesSearch = gpt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gpt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gpt.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || gpt.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || gpt.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleBulkAction = async (action: 'approve' | 'reject' | 'verify' | 'trend') => {
    try {
      const response = await fetch('/api/gpts/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: selectedGpts,
          action
        })
      });
      if (response.ok) {
        fetchGPTs();
        setSelectedGpts([]);
        alert(t('moderation.bulk.success'));
      }
    } catch (error) {
      console.error('Error performing bulk action:', error);
      alert(t('moderation.bulk.error'));
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">{t('moderation.title')}</h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">{t('moderation.analytics.total')}</h3>
                <p className="text-3xl font-bold">{analytics.total}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">{t('moderation.analytics.pending')}</h3>
                <p className="text-3xl font-bold">{analytics.pending}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">{t('moderation.analytics.approved')}</h3>
                <p className="text-3xl font-bold">{analytics.approved}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleExport}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              {t('moderation.export')}
            </button>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span>{t('moderation.auto_refresh')}</span>
            </label>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="text-blue-400 hover:text-blue-300"
          >
            {showAdvancedFilters ? t('moderation.hide_filters') : t('moderation.show_filters')}
          </button>
          {selectedGpts.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('approve')}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
              >
                {t('moderation.bulk.approve')}
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
              >
                {t('moderation.bulk.reject')}
              </button>
              <button
                onClick={() => handleBulkAction('verify')}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                {t('moderation.bulk.verify')}
              </button>
              <button
                onClick={() => handleBulkAction('trend')}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"
              >
                {t('moderation.bulk.trend')}
              </button>
            </div>
          )}
        </div>

        {showAdvancedFilters && (
          <div className="mb-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">{t('moderation.advanced_filters.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('moderation.advanced_filters.date_range')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="flex-1 px-4 py-2 bg-gray-700 rounded-lg border border-gray-600"
                  />
                  <input
                    type="date"
                    className="flex-1 px-4 py-2 bg-gray-700 rounded-lg border border-gray-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('moderation.advanced_filters.tags')}
                </label>
                <input
                  type="text"
                  placeholder={t('moderation.advanced_filters.tags_placeholder')}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600"
                />
              </div>
            </div>
          </div>
        )}

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
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700"
            >
              <option value="all">{t('moderation.category.all')}</option>
              <option value="dev">{t('moderation.category.dev')}</option>
              <option value="design">{t('moderation.category.design')}</option>
              <option value="writing">{t('moderation.category.writing')}</option>
              <option value="research">{t('moderation.category.research')}</option>
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
                <div>
                  <h2 className="text-xl font-bold">{gpt.name}</h2>
                  <div className="flex gap-2 mt-2">
                    {gpt.badge && (
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        gpt.badge === 'verified' ? 'bg-green-500' :
                        gpt.badge === 'trending' ? 'bg-blue-500' :
                        gpt.badge === 'rejected' ? 'bg-red-500' :
                        'bg-yellow-500'
                      }`}>
                        {t(`moderation.badge.${gpt.badge}`)}
                      </span>
                    )}
                    <span className="text-sm text-gray-400">
                      {new Date(gpt.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    gpt.status === 'approved' ? 'bg-green-500' :
                    gpt.status === 'rejected' ? 'bg-red-500' :
                    'bg-yellow-500'
                  }`}>
                    {t(`moderation.status.${gpt.status}`)}
                  </span>
                  <div className="mt-2 text-sm text-gray-400">
                    {t('moderation.submitted_by', { submitter: gpt.submitter })}
                  </div>
                </div>
              </div>
              <p className="mb-4 text-gray-300">{gpt.description}</p>
              <div className="mb-4">
                <span className="font-medium">{t('moderation.category')}:</span>
                <span className="ml-2">{t(`moderation.category.${gpt.category}`)}</span>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={selectedGpts.includes(gpt.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedGpts([...selectedGpts, gpt.id]);
                    } else {
                      setSelectedGpts(selectedGpts.filter(id => id !== gpt.id));
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
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
                <button
                  onClick={() => handleStatusChange(gpt.id, 'verified')}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
                >
                  {t('moderation.verify')}
                </button>
                <button
                  onClick={() => handleStatusChange(gpt.id, 'trending')}
                  className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"
                >
                  {t('moderation.trend')}
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h3 className="text-lg font-semibold mb-2">{t('moderation.history')}</h3>
                <div className="space-y-2">
                  {gpt.submissionHistory.map((history, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        {new Date(history.timestamp).toLocaleDateString()}
                      </span>
                      <span className="text-sm">
                        {t('moderation.status_changed_to', { status: history.status })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModerationPanel;
