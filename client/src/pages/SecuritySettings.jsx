
import React, { useState } from 'react';
import { Shield, Key, Trash2, Loader2, AlertTriangle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { authService, analysisService } from '../services/api';

const SecuritySettings = () => {
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  React.useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await analysisService.getHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await authService.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      alert('Password updated successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Password update error:', error);
      alert(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnalysis = async (id) => {
    if (confirm('Are you sure you want to delete this analysis? This action cannot be undone.')) {
      try {
        await analysisService.deleteAnalysis(id);
        setHistory(history.filter(item => item._id !== id));
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete analysis');
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary w-fit">
          Security
        </h1>
        <p className="text-text-muted dark:text-slate-400">
          Password and authentication settings.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="bg-surface dark:bg-dark-card border border-surface dark:border-slate-800">
          <h3 className="text-lg font-semibold text-text-main dark:text-white mb-6 flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Change Password
          </h3>
          <form onSubmit={handleChangePassword} className="space-y-6 max-w-2xl">
            <div className="mb-6">
              <label className="text-base font-medium text-text-main dark:text-slate-300 block mb-1">Current Password</label>
              <Input 
                type="password" 
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleChange}
                placeholder="••••••••" 
                className="bg-background border-surface w-[400px] h-[30px] text-sm"
              />
            </div>
            <div className="mb-6">
              <label className="text-base font-medium text-text-main dark:text-slate-300 block mb-1">New Password</label>
              <Input 
                type="password" 
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                placeholder="••••••••" 
                className="bg-background border-surface w-[400px] h-[30px] text-sm"
              />
            </div>
            <div className="mb-6">
              <label className="text-base font-medium text-text-main dark:text-slate-300 block mb-1">Confirm New Password</label>
              <Input 
                type="password" 
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••" 
                className="bg-background border-surface w-[400px] h-[30px] text-sm"
              />
            </div>
            <div className="pt-2">
              <Button type="submit" disabled={loading} className="h-10 px-6 text-sm">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Password'}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="bg-surface dark:bg-dark-card border border-red-200 dark:border-red-900/30">
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2" style={{color: 'white'}}>
            {/* <AlertTriangle className="w-5 h-5" /> */}
            Delete History
          </h3>
          <p className="text-sm text-text-muted mb-6">
            Permanent actions that cannot be undone.
          </p>
          
          <div className="space-y-4"> 
            {historyLoading ? (
               <div className="flex justify-center p-4">
                 <Loader2 className="w-6 h-6 animate-spin text-text-muted" />
               </div>
            ) : history.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {history.map((item) => (
                  <div key={item._id} className="flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 transition-all hover:bg-red-100 dark:hover:bg-red-900/20">
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="font-medium text-text-main dark:text-white truncate">{item.filename || 'Untitled Analysis'}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-text-muted">{new Date(item.createdAt).toLocaleDateString()}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.score > 80 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 
                          item.score > 50 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' : 
                          'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}>Score: {item.score}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteAnalysis(item._id)}
                      className="p-2 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/40 rounded-lg transition-colors"
                      title="Delete Analysis"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-text-muted py-4">No analysis history found.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SecuritySettings;
