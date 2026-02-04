import { useState, useEffect } from 'react';
import { 
  BarChart2, 
  CheckCircle, 
  AlertTriangle, 
  Zap,
  Plus,
  GitBranch,
  FileCode,
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { analysisService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const data = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 72 },
  { name: 'Mar', score: 68 },
  { name: 'Apr', score: 85 },
  { name: 'May', score: 82 },
  { name: 'Jun', score: 91 },
];

const StatCard = ({ icon: Icon, title, value, trend, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <Card className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-muted dark:text-slate-400 font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className="text-green-500 flex items-center font-medium">
          <ArrowUpRight className="w-4 h-4 mr-1" />
          {trend}
        </span>
        <span className="ml-2 text-slate-400">vs last month</span>
      </div>
    </Card>
  </motion.div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: 'Developer' });
  const [inputUrl, setInputUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) setUser(storedUser);

        const data = await analysisService.getHistory();
        setHistory(data);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  // Calculate stats
  const avgScore = history.length > 0 
    ? Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / history.length) 
    : 0;
  
  const totalIssues = history.reduce((acc, curr) => {
    return acc + (curr.feedback?.issues?.length || 0);
  }, 0);

  const handleAnalyze = async () => {
    if (!inputUrl) return;
    setError('');

    if (inputUrl.includes('github.com')) {
      setAnalyzing(true);
      try {
        const result = await analysisService.analyzeRepo(inputUrl);
        navigate(`/analysis/${result._id}`);
      } catch (error) {
        console.error('Analysis failed:', error);
        setError(error.response?.data?.message || 'Failed to analyze repository. Make sure it is public.');
      } finally {
        setAnalyzing(false);
      }
    } else {
      // Normal code analysis redirection
      navigate('/dashboard/new');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-text-muted dark:text-slate-400">Welcome back, {user.name}! Here's your code quality overview.</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => navigate('/dashboard/new')}>
          <Plus className="w-5 h-5" />
          New Analysis
        </Button>
      </div>

      {loading && history.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon={BarChart2} 
              title="Avg. Quality Score" 
              value={`${avgScore}%`}
              trend="+5.2%" 
              color="bg-gradient-to-br from-indigo-500 to-purple-600"
              delay={0.1}
            />
            <StatCard 
              icon={CheckCircle} 
              title="Analyses Run" 
              value={history.length} 
              trend="+12%" 
              color="bg-gradient-to-br from-green-400 to-emerald-600"
              delay={0.2}
            />
            <StatCard 
              icon={AlertTriangle} 
              title="Issues Found" 
              value={totalIssues}
              trend="Total" 
              color="bg-gradient-to-br from-amber-400 to-orange-600"
              delay={0.3}
            />
            <StatCard 
              icon={Zap} 
              title="Credits Left" 
              value="Unlimited" 
              trend="Pro Plan" 
              color="bg-gradient-to-br from-cyan-400 to-blue-600"
              delay={0.4}
            />
          </div>

          {/* Charts & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart */}
            <div className="lg:col-span-2">
              <Card className="h-full min-h-[400px]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Quality Trend</h3>
                  <select className="bg-background dark:bg-slate-800 border-none rounded-lg text-sm px-3 py-1">
                    <option>Last 6 Months</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <h3 className="font-semibold text-lg mb-4">Recent Analyses</h3>
                <div className="space-y-4">
                  {history.slice(0, 5).map((item) => (
                    <div key={item._id} className="flex items-center gap-4 p-3 hover:bg-background dark:hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-lg bg-indigo-900/30 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500">
                        <FileCode className="w-5 h-5" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h4 className="font-medium group-hover:text-primary transition-colors truncate">{item.filename}</h4>
                        <p className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>
                      <Badge variant={item.score > 80 ? 'success' : item.score > 50 ? 'warning' : 'danger'}>
                        {item.score}
                      </Badge>
                    </div>
                  ))}
                  {history.length === 0 && (
                    <p className="text-sm text-text-muted text-center py-4">No analysis history yet.</p>
                  )}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-sm" onClick={() => navigate('/dashboard/history')}>View All History</Button>
              </Card>
            </div>
          </div>
        </>
      )}

      {/* Quick Actions / New Analysis Zone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-dashed border-2 bg-background/50 dark:bg-slate-800/20">
          <div className="text-center py-10">
            <div className="w-16 h-16 mx-auto bg-indigo-900/30 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 text-indigo-500">
              <GitBranch className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Analyze a New Project</h3>
            <p className="text-text-muted max-w-lg mx-auto mb-8">
              Paste a GitHub repository URL or drag and drop your files here to start a comprehensive code quality analysis.
            </p>
            <div className="max-w-xl mx-auto flex gap-2">
              <input 
                type="text" 
                placeholder="https://github.com/username/repo" 
                className="flex-1 rounded-xl border-surface dark:border-slate-700 bg-surface dark:bg-slate-900 px-4 focus:ring-2 focus:ring-primary"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <Button onClick={handleAnalyze} disabled={analyzing}>
                {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Analyze Code'}
              </Button>
            </div>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm max-w-md mx-auto"
              >
                {error}
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
