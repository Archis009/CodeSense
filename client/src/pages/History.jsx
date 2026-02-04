
import React from 'react';
import { motion as Motion } from 'framer-motion';
import { History as HistoryIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await import('../services/api').then(m => m.analysisService.getHistory());
        setHistory(data);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary w-fit">
            Analysis History
          </h1>
          <p className="text-text-muted dark:text-slate-400">
            View past analyses and reports.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-500">Loading history...</div>
      ) : history.length === 0 ? (
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 text-center rounded-2xl bg-surface dark:bg-dark-card border border-surface dark:border-slate-800 shadow-sm"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-background dark:bg-slate-800 mb-4">
            <HistoryIcon className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-medium text-text-main dark:text-white mb-2">
            No History Found
          </h3>
          <p className="text-text-muted dark:text-slate-400">
            You haven't run any analyses yet. Start a new analysis to see it here.
          </p>
        </Motion.div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <Link to={`/dashboard/analysis/${item._id}`} key={item._id}>
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-surface dark:bg-dark-card border border-surface dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase">
                      {item.language}
                    </span>
                    <span className="text-text-muted text-sm">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-text-main dark:text-white mb-1">
                    Analysis Score: {item.score}%
                  </h3>
                </div>
                <div className={`px-4 py-2 rounded-lg font-bold ${
                  item.score >= 80 ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                  item.score >= 50 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {item.score}
                </div>
              </div>
            </Motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
