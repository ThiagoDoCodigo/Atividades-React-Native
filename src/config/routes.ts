import { LayoutDashboard, CodeXml, HousePlug } from 'lucide-react-native';
import Atividade1Screen from '../features/atividade1/screens/Atividade1Screen';
import Atividade2Screen from '../features/atividade2/screens/Atividade2Screen';
import TaskDetailScreen from '../features/atividade3/screens/TaskDetailScreen';
import TaskListScreen from '../features/atividade3/screens/TaskListScreen';

export const APP_ROUTES = [
  {
    name: 'Atividade1',
    label: 'Atividade 1',
    icon: LayoutDashboard,
    component: Atividade1Screen,
  },
  {
    name: 'Atividade2',
    label: 'Atividade 2',
    icon: CodeXml,
    component: Atividade2Screen,
  },
  {
    name: 'Atividade3',
    label: 'Atividade 3',
    icon: HousePlug,
    component: TaskListScreen,
  },
];

export const STACK_ROUTES = [
  { 
    name: 'TaskDetail', 
    title: 'Tarefa', 
    component: TaskDetailScreen 
  },
];