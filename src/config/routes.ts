import { LayoutDashboard, CodeXml } from 'lucide-react-native';
import Atividade1Screen from '../screens/atividade1/Atividade1Screen';
import Atividade2Screen from '../screens/atividade2/Atividade2Screen';

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