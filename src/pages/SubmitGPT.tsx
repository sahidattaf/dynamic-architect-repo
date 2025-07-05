import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface GPTFormData {
  name: string;
  description: string;
  prompt: string;
  tags: string[];
  language: string;
}

const SubmitGPT: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<GPTFormData>({
    name: '',
    description: '',
    prompt: '',
    tags: [],
    language: 'en',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle success
        alert(t('submit.success'));
      } else {
        // Handle error
        alert(t('submit.error'));
      }
    } catch (error) {
      console.error('Error submitting GPT:', error);
      alert(t('submit.error'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">{t('submit.title')}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">{t('submit.fields.name')}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t('submit.fields.description')}</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t('submit.fields.prompt')}</label>
            <textarea
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t('submit.fields.tags')}</label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700"
              placeholder="tag1, tag2, tag3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t('submit.fields.language')}</label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="ar">العربية</option>
              <option value="zh">中文</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {t('submit.submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitGPT;
