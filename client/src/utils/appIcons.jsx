import {
  Utensils,
  Plane,
  Home,
  ShoppingBag,
  Film,
  Layers,
  Compass,
  Briefcase,
  Users,
  Receipt,
  Trash2,
  CheckCircle2,
  UserCheck,
  Bell,
  Scale,
  Coins,
  Percent,
} from 'lucide-react';

export const getCategoryIcon = (category, size = 18, color = 'currentColor') => {
  switch (category) {
    case 'Food':
      return <Utensils size={size} color={color} strokeWidth={2} />;
    case 'Travel':
      return <Plane size={size} color={color} strokeWidth={2} />;
    case 'Rent':
      return <Home size={size} color={color} strokeWidth={2} />;
    case 'Shopping':
      return <ShoppingBag size={size} color={color} strokeWidth={2} />;
    case 'Entertainment':
      return <Film size={size} color={color} strokeWidth={2} />;
    case 'Other':
    default:
      return <Layers size={size} color={color} strokeWidth={2} />;
  }
};

export const getGroupTypeIcon = (type, size = 18, color = 'currentColor') => {
  switch (type) {
    case 'Trip':
      return <Compass size={size} color={color} strokeWidth={2} />;
    case 'Home':
      return <Home size={size} color={color} strokeWidth={2} />;
    case 'Office':
      return <Briefcase size={size} color={color} strokeWidth={2} />;
    case 'Other':
    default:
      return <Users size={size} color={color} strokeWidth={2} />;
  }
};

export const getNotificationIcon = (type, size = 18, color = 'currentColor') => {
  switch (type) {
    case 'expense_added':
      return <Receipt size={size} color={color} strokeWidth={2} />;
    case 'expense_deleted':
      return <Trash2 size={size} color={color} strokeWidth={2} />;
    case 'settled_up':
      return <CheckCircle2 size={size} color={color} strokeWidth={2} />;
    case 'group_joined':
      return <Users size={size} color={color} strokeWidth={2} />;
    case 'member_added':
      return <UserCheck size={size} color={color} strokeWidth={2} />;
    default:
      return <Bell size={size} color={color} strokeWidth={2} />;
  }
};

export const getSplitTypeIcon = (type, size = 16, color = 'currentColor') => {
  switch (type) {
    case 'equal':
      return <Scale size={size} color={color} strokeWidth={2} />;
    case 'exact':
      return <Coins size={size} color={color} strokeWidth={2} />;
    case 'percentage':
      return <Percent size={size} color={color} strokeWidth={2} />;
    default:
      return <Scale size={size} color={color} strokeWidth={2} />;
  }
};
