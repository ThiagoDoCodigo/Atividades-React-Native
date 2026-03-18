import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { User, LogOut } from 'lucide-react-native';
import { APP_ROUTES } from '../config/routes';
const LogoApp = require('../../assets/logo-react.png');

export default function Sidebar(props: any) {
  const { state, navigation } = props;
  const currentRouteName = state.routeNames[state.index];
  
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const userName = "Thiago Ferreira Goncalves";
  const userEmail = "@thiagodocodigo";

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Image 
            source={LogoApp} 
            resizeMode="contain"
            style={styles.logo} 
          />
        </View>

        <View style={styles.menu}>
          {APP_ROUTES.map((route) => {
            const isActive = currentRouteName === route.name;
            const Icon = route.icon;

            return (
              <DrawerItem
                key={route.name}
                label={route.label}
                focused={isActive}
                onPress={() => navigation.navigate(route.name)}
                activeTintColor="#ffffff"
                activeBackgroundColor="#0ea5e9" 
                inactiveTintColor="#64748b"
                labelStyle={[
                  styles.label,
                  isActive && styles.labelActive
                ]}
                icon={({ color }) => (
                  <Icon size={22} color={color} strokeWidth={isActive ? 2 : 1.5} />
                )}
                style={styles.drawerItem}
              />
            );
          })}
        </View>
      </DrawerContentScrollView>

      <View style={styles.footer}>
        {isDropdownOpen && (
          <View style={styles.dropdown}>
            <TouchableOpacity activeOpacity={0.7} style={styles.dropdownItem}>
              <User size={18} color="#334155" />
              <Text style={styles.dropdownText}>Meu perfil</Text>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity activeOpacity={0.7} style={styles.dropdownItem}>
              <LogOut size={18} color="#dc2626" />
              <Text style={styles.dropdownTextDanger}>Sair</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setDropdownOpen(!isDropdownOpen)}
          style={[styles.profileBtn, isDropdownOpen && styles.profileBtnActive]}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName} numberOfLines={1}>
              {userName}
            </Text>
            <Text style={styles.userEmail} numberOfLines={1}>
              {userEmail}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
  },
  menu: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  drawerItem: {
    borderRadius: 12,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  label: {
    fontWeight: '600',
    marginLeft: 2,
    fontSize: 14,
    letterSpacing: 0.3,
  },
  labelActive: {
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    zIndex: 50,
  },
  dropdown: {
    position: 'absolute',
    bottom: 90,
    left: 16,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 999,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  dropdownTextDanger: {
    fontSize: 14,
    fontWeight: '500',
    color: '#dc2626',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 4,
  },
  profileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  profileBtnActive: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
  },
  avatar: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0ea5e9',
    borderRadius: 8,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#1e293b',
    fontWeight: '600',
    fontSize: 14,
  },
  userEmail: {
    color: '#64748b',
    fontSize: 12,
  },
});