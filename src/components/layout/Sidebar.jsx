import { authService } from '../../services/api';

// ... (inside component)

        <button 
          onClick={() => authService.logout()}
          className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
        >
          <LogOut className={cn("w-5 h-5", collapsed ? "mx-auto" : "")} />
          {!collapsed && <span>Logout</span>}
        </button>
