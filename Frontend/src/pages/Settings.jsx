import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Link, 
  Sparkles, 
  Calendar,
  Save,
  Check,
  Linkedin,
  Twitter,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useApi } from '../hooks/useApi';
import apiService from '../api/apiService';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    industry: user?.industry || '',
  });

  const [preferences, setPreferences] = useState({
    postingFrequency: user?.preferences?.postingFrequency || 'daily',
    preferredTimes: user?.preferences?.preferredTimes || ['09:00', '14:00', '18:00'],
    autoApprove: user?.preferences?.autoApprove || false,
    emailNotifications: user?.preferences?.emailNotifications || true,
  });

  const [aiSettings, setAiSettings] = useState({
    tone: user?.aiSettings?.tone || 'professional',
    contentTypes: user?.aiSettings?.contentTypes || ['text', 'article'],
    hashtagCount: user?.aiSettings?.hashtagCount || 5,
    useEmojis: user?.aiSettings?.useEmojis || true,
  });

  const [notifications, setNotifications] = useState({
    postPublished: true,
    weeklyReport: true,
    aiSuggestions: true,
    engagementAlerts: true,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Calendar },
    { id: 'ai', label: 'AI Settings', icon: Sparkles },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Link },
  ];

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await apiService.patch('/users/profile', profileData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    try {
      await apiService.patch('/users/preferences', preferences);
      toast.success('Preferences updated successfully');
    } catch (error) {
      toast.error('Failed to update preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAiSettings = async () => {
    setLoading(true);
    try {
      await apiService.patch('/users/ai-settings', aiSettings);
      toast.success('AI settings updated successfully');
    } catch (error) {
      toast.error('Failed to update AI settings');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <select
                value={profileData.industry}
                onChange={(e) => setProfileData({ ...profileData, industry: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="marketing">Marketing</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button onClick={handleSaveProfile} disabled={loading} className="btn-primary flex items-center">
              {loading ? <LoadingSpinner size="small" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </button>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Posting Frequency</label>
              <select
                value={preferences.postingFrequency}
                onChange={(e) => setPreferences({ ...preferences, postingFrequency: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="daily">Daily</option>
                <option value="weekdays">Weekdays Only</option>
                <option value="weekly">Weekly</option>
                <option value="custom">Custom Schedule</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Posting Times</label>
              <div className="space-y-2">
                {preferences.preferredTimes.map((time, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => {
                        const newTimes = [...preferences.preferredTimes];
                        newTimes[index] = e.target.value;
                        setPreferences({ ...preferences, preferredTimes: newTimes });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button
                      onClick={() => {
                        const newTimes = preferences.preferredTimes.filter((_, i) => i !== index);
                        setPreferences({ ...preferences, preferredTimes: newTimes });
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setPreferences({
                      ...preferences,
                      preferredTimes: [...preferences.preferredTimes, '12:00']
                    });
                  }}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  + Add Time Slot
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.autoApprove}
                  onChange={(e) => setPreferences({ ...preferences, autoApprove: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Auto-approve AI generated content</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Send email notifications for scheduled posts</span>
              </label>
            </div>
            <button onClick={handleSavePreferences} disabled={loading} className="btn-primary flex items-center">
              {loading ? <LoadingSpinner size="small" /> : <Save className="w-4 h-4 mr-2" />}
              Save Preferences
            </button>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Tone</label>
              <select
                value={aiSettings.tone}
                onChange={(e) => setAiSettings({ ...aiSettings, tone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="inspiring">Inspiring</option>
                <option value="educational">Educational</option>
                <option value="humorous">Humorous</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Types</label>
              <div className="space-y-2">
                {['text', 'article', 'carousel', 'poll'].map((type) => (
                  <label key={type} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={aiSettings.contentTypes.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAiSettings({
                            ...aiSettings,
                            contentTypes: [...aiSettings.contentTypes, type]
                          });
                        } else {
                          setAiSettings({
                            ...aiSettings,
                            contentTypes: aiSettings.contentTypes.filter(t => t !== type)
                          });
                        }
                      }}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{type} Posts</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Hashtags</label>
              <input
                type="number"
                min="0"
                max="30"
                value={aiSettings.hashtagCount}
                onChange={(e) => setAiSettings({ ...aiSettings, hashtagCount: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={aiSettings.useEmojis}
                onChange={(e) => setAiSettings({ ...aiSettings, useEmojis: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Include emojis in generated content</span>
            </label>
            <button onClick={handleSaveAiSettings} disabled={loading} className="btn-primary flex items-center">
              {loading ? <LoadingSpinner size="small" /> : <Save className="w-4 h-4 mr-2" />}
              Save AI Settings
            </button>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <p className="text-xs text-gray-500">
                        {key === 'postPublished' && 'Get notified when posts are published'}
                        {key === 'weeklyReport' && 'Weekly performance summary'}
                        {key === 'aiSuggestions' && 'AI content suggestions and recommendations'}
                        {key === 'engagementAlerts' && 'High engagement alerts on your posts'}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </label>
                ))}
              </div>
            </div>
            <button className="btn-primary flex items-center">
              <Save className="w-4 h-4 mr-2" />
              Save Notification Settings
            </button>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              <button className="btn-primary mt-4">Update Password</button>
            </div>
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">SMS Authentication</p>
                  <p className="text-xs text-gray-500">Add extra security to your account</p>
                </div>
                <button className="btn-secondary text-sm">Enable 2FA</button>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Accounts</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-linkedin/5 border border-linkedin/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-linkedin rounded-lg flex items-center justify-center">
                      <Linkedin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">LinkedIn</p>
                      <p className="text-xs text-gray-500">Connected as {user?.linkedinProfile?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Twitter className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Twitter</p>
                      <p className="text-xs text-gray-500">Cross-post to Twitter (Coming Soon)</p>
                    </div>
                  </div>
                  <button className="btn-secondary text-sm" disabled>Coming Soon</button>
                </div>
              </div>
            </div>
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">API Access</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">API Keys</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Generate API keys to integrate Influence OS with your own applications
                    </p>
                    <button className="btn-primary text-sm mt-3">Generate API Key</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and application preferences</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg
                  ${activeTab === tab.id ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'} 
                  transition-colors duration-200`}
              >
                <tab.icon className="w-5 h-5 mr-3" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-1">
          <div className="card p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;