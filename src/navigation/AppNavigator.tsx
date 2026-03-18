import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, ArrowLeft } from 'lucide-react-native';
import Sidebar from '../components/Sidebar';
import WithMainLayout from '../layouts/helper/WithMainLayout';
import { APP_ROUTES, STACK_ROUTES } from '../config/routes';
import { colors } from '../config/theme';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { 
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border
        },
        headerTitleAlign: 'center',
        headerTintColor: colors.text.primary,
        headerTitleStyle: { fontWeight: 'bold', fontSize: 16 },
        headerLeft: () => (
          <TouchableOpacity 
            onPress={() => navigation.toggleDrawer()} 
            style={styles.headerButton}
          >
            <Menu size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        ),
        drawerType: 'slide',
        drawerStyle: { width: '75%' },
        sceneContainerStyle: { backgroundColor: colors.background },
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
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border
        },
        headerTitleAlign: 'center',
        headerTintColor: colors.text.primary,
        headerTitleStyle: { fontWeight: 'bold', fontSize: 16 },
        headerLeft: () => (
          <TouchableOpacity 
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }} 
            style={styles.headerButton}
          >
            <ArrowLeft size={20} color={colors.text.secondary} />
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

const styles = StyleSheet.create({
  headerButton: {
    marginLeft: 16,
    padding: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  }
});