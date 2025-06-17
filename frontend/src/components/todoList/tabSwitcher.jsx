import { FiClock, FiCheckCircle } from 'react-icons/fi';

const TabSwitcher = ({
  activeTab,
  setActiveTab,
  pendingCount,
  completedCount,
}) => (
  <div className="task-tabs">
    <button
      className={`tab-btn ${activeTab === 'todo' ? 'active' : ''}`}
      onClick={() => setActiveTab('todo')}
    >
      <FiClock className="tab-icon" />
      <span>Tasks</span>
      <span className="task-count">{pendingCount}</span>
    </button>
    <button
      className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
      onClick={() => setActiveTab('completed')}
    >
      <FiCheckCircle className="tab-icon" />
      <span>Completed</span>
      <span className="task-count">{completedCount}</span>
    </button>
  </div>
);

export default TabSwitcher;
