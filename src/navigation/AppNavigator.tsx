import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Menu, ArrowLeft } from 'lucide-react-native';
import Sidebar from '../components/Sidebar';
import WithMainLayout from '../layouts/helper/WithMainLayout';
import { APP_ROUTES, STACK_ROUTES } from '../config/routes';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { 
          backgroundColor: '#f9fafb',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#f1f5f9'
        },
        headerTitleAlign: 'center',
        headerTintColor: '#334155',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 16 },
        headerLeft: () => (
          <TouchableOpacity 
            onPress={() => navigation.toggleDrawer()} 
            className="ml-4 p-2 bg-white border border-gray-200 rounded-lg shadow-sm active:bg-gray-50"
          >
            <Menu size={20} color="#64748b" />
          </TouchableOpacity>
        ),
        drawerType: 'slide',
        drawerStyle: { width: '75%' },
        sceneContainerStyle: { backgroundColor: '#f9fafb' },
      })}
    >
      {APP_ROUTES.map((route) => (
        <Drawer.Screen 
          key={route.name}
          name={route.name}
          component={WithMainLayout(route.component)} 
          options={{ title: route.label }}
        />
      ))}
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { 
          backgroundColor: '#f9fafb',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#f1f5f9'
        },
        headerTitleAlign: 'center',
        headerTintColor: '#334155',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 16 },
        headerLeft: () => (
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            className="ml-4 p-2 bg-white border border-gray-200 rounded-lg shadow-sm active:bg-gray-50"
          >
            <ArrowLeft size={20} color="#64748b" />
          </TouchableOpacity>
        ),
        ...TransitionPresets.SlideFromRightIOS,
      })}
    >
      <Stack.Screen 
        name="DrawerRoot" 
        component={DrawerRoutes} 
        options={{ headerShown: false }} 
      />
      
      {STACK_ROUTES.map((route: any) => (
        <Stack.Screen 
          key={route.name}
          name={route.name}
          component={WithMainLayout(route.component)} 
          options={{ title: route.title }}
        />
      ))}
    </Stack.Navigator>
  );
}