import { LayoutDashboard, CodeXml } from 'lucide-react-native';
import Atividade1Screen from '../features/atividade1/screens/Atividade1Screen';
import Atividade2Screen from '../features/atividade2/screens/Atividade2Screen';

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
];