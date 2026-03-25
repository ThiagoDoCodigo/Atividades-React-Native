import { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { User, LogOut } from 'lucide-react-native';
import { APP_ROUTES } from '../config/routes';
import { colors } from '../config/theme';
import { Typography } from 'react-native-th-components';

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
                activeTintColor={colors.text.inverse}
                activeBackgroundColor={colors.primary.main} 
                inactiveTintColor={colors.text.muted}
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
              <User size={18} color={colors.text.primary} />
              <Typography variant="body" weight="medium" color={colors.text.primary}>
                Meu perfil
              </Typography>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity activeOpacity={0.7} style={styles.dropdownItem}>
              <LogOut size={18} color={colors.danger.main} />
              <Typography variant="body" weight="medium" color={colors.danger.main}>
                Sair
              </Typography>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setDropdownOpen(!isDropdownOpen)}
          style={[styles.profileBtn, isDropdownOpen && styles.profileBtnActive]}
        >
          <View style={styles.avatar}>
            <Typography variant="title" color={colors.text.inverse} style={styles.avatarText}>
              {userName.charAt(0)}
            </Typography>
          </View>

          <View style={styles.userInfo}>
            <Typography variant="body" weight="semibold" color={colors.text.primary} numberOfLines={1}>
              {userName}
            </Typography>
            <Typography variant="caption" color={colors.text.secondary} numberOfLines={1}>
              {userEmail}
            </Typography>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
    borderTopColor: colors.border,
    backgroundColor: colors.background,
    zIndex: 50,
  },
  dropdown: {
    position: 'absolute',
    bottom: 90,
    left: 16,
    right: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 6,
    borderWidth: 1,
    borderColor: colors.border,
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
  divider: {
    height: 1,
    backgroundColor: colors.surfaceHighlight,
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
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  avatar: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.main,
    borderRadius: 8,
  },
  avatarText: {
    fontSize: 16,
  },
  userInfo: {
    flex: 1,
  },
});