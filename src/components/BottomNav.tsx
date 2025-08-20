import { Link, useLocation } from "react-router-dom";
import { Home, User, Gift, LogIn, Package } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      icon: Home,
      label: "Inicio"
    },
    {
      path: "/my-products",
      icon: Package,
      label: "Mis Productos"
    },
    {
      path: "/profile",
      icon: User,
      label: "Perfil"
    },
    {
      path: "/referrals",
      icon: Gift,
      label: "Recomendar"
    },
    {
      path: "/auth",
      icon: LogIn,
      label: "Login"
    }
  ];

  return (
    <div className="bottom-nav">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;