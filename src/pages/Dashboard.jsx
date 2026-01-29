import React from 'react';
import { 
  BarChart2, 
  CheckCircle, 
  AlertTriangle, 
  Zap,
  Plus,
  GitBranch,
  FileCode,
  ArrowUpRight
} from 'lucide-react';
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
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{title}</p>
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
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome back, Alex! Here's your code quality overview.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Analysis
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={BarChart2} 
          title="Avg. Quality Score" 
          value="87%" 
          trend="+5.2%" 
          color="bg-gradient-to-br from-indigo-500 to-purple-600"
          delay={0.1}
        />
        <StatCard 
          icon={CheckCircle} 
          title="Issues Fixed" 
          value="1,248" 
          trend="+12%" 
          color="bg-gradient-to-br from-green-400 to-emerald-600"
          delay={0.2}
        />
        <StatCard 
          icon={AlertTriangle} 
          title="Critical Issues" 
          value="3" 
          trend="-25%" // Actually good (negative trend)
          color="bg-gradient-to-br from-amber-400 to-orange-600"
          delay={0.3}
        />
        <StatCard 
          icon={Zap} 
          title="Analysis Credits" 
          value="45/50" 
          trend="Refill in 5d" 
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
              <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-3 py-1">
                <option>Last 6 Months</option>
                <option>Last Year</option>
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
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500">
                    <FileCode className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium group-hover:text-primary transition-colors">Project-Alpha-v2</h4>
                    <p className="text-xs text-slate-500">2 hours ago</p>
                  </div>
                  <Badge variant="primary">92</Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-sm">View All History</Button>
          </Card>
        </div>
      </div>

      {/* Quick Actions / New Analysis Zone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-dashed border-2 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="text-center py-10">
            <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 text-indigo-500">
              <GitBranch className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Analyze a New Project</h3>
            <p className="text-slate-500 max-w-lg mx-auto mb-8">
              Paste a GitHub repository URL or drag and drop your files here to start a comprehensive code quality analysis.
            </p>
            <div className="max-w-xl mx-auto flex gap-2">
              <input 
                type="text" 
                placeholder="https://github.com/username/repo" 
                className="flex-1 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 focus:ring-2 focus:ring-primary"
              />
              <Button>Analyze Now</Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
