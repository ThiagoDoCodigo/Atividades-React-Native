import { LayoutDashboard, CodeXml, HousePlug } from 'lucide-react-native';
import Atividade1Screen from '../features/atividade1/screens/Atividade1Screen';
import Atividade2Screen from '../features/atividade2/screens/Atividade2Screen';
import TaskListScreen from '../features/atividade3/screens/TaskListScreen';
import TaskDetailScreen from '../features/atividade3/screens/TaskDetailScreen';

export const ATIVIDADE3_ROUTES = [
  {
    name: 'TaskList',
    title: 'Atividade 3',
    component: TaskListScreen,
  },
  {
    name: 'TaskDetail',
    title: 'Tarefa',
    component: TaskDetailScreen,
  },
];

export const APP_ROUTES = [
  {
    name: 'Atividade1',
    label: 'Atividade 1',
    icon: LayoutDashboard,
    component: Atividade1Screen,
    isStack: false,
  },
  {
    name: 'Atividade2',
    label: 'Atividade 2',
    icon: CodeXml,
    component: Atividade2Screen,
    isStack: false,
  },
  {
    name: 'Atividade3',
    label: 'Atividade 3',
    icon: HousePlug,
    isStack: true,
    nestedRoutes: ATIVIDADE3_ROUTES,
  },
];