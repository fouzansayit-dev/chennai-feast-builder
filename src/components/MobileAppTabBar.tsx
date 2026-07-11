import { Link, useRouter } from "@tanstack/react-router";
import { Home, UtensilsCrossed, ChefHat, Image as ImageIcon, PhoneCall } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const TABS = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/services", label: "Services", icon: UtensilsCrossed, exact: false },
  { to: "/customize", label: "Customize", icon: ChefHat, exact: false, center: true },
  { to: "/gallery", label: "Gallery", icon: ImageIcon, exact: false },
  { to: "/contact", label: "Contact", icon: PhoneCall, exact: false },
];

export default function MobileAppTabBar() {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const { totalCount } = useCart();

  const isActive = (to: string, exact: boolean) =>
    exact ? currentPath === to : currentPath.startsWith(to);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/97 backdrop-blur-lg border-t border-neutral-100 shadow-2xl">
      <div className="flex items-end justify-around h-[60px] max-w-md mx-auto px-2 relative">
        {TABS.map((tab) => {
          const active = isActive(tab.to, tab.exact ?? false);
          const Icon = tab.icon;

          if (tab.center) {
            return (
              <div key={tab.label} className="relative -top-5 flex flex-col items-center">
                <Link
                  to={tab.to}
                  className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all duration-200 relative ${
                    active
                      ? "bg-[#1E1108] ring-4 ring-amber-400/40"
                      : "bg-[#1E1108] hover:bg-[#2e1e10]"
                  }`}
                >
                  <Icon className="w-6 h-6 text-amber-400" />
                  {totalCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-md animate-pulse">
                      {totalCount}
                    </span>
                  )}
                </Link>
                <span className={`text-[8px] font-extrabold uppercase tracking-widest mt-1.5 ${
                  active ? "text-amber-600" : "text-neutral-500"
                }`}>
                  {tab.label}
                </span>
              </div>
            );
          }

          return (
            <Link
              key={tab.label}
              to={tab.to}
              className="flex-1 flex flex-col items-center justify-center py-2 h-full relative active:scale-90 transition-transform"
            >
              <div className={`relative flex flex-col items-center gap-1 transition-all duration-200 ${
                active ? "scale-105" : ""
              }`}>
                {/* Active indicator dot */}
                {active && (
                  <span className="absolute -top-1 w-1 h-1 rounded-full bg-amber-500" />
                )}
                <Icon
                  className={`w-[18px] h-[18px] transition-colors ${
                    active ? "text-amber-600" : "text-neutral-400"
                  }`}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                <span className={`text-[8.5px] font-bold uppercase tracking-widest transition-colors ${
                  active ? "text-amber-600" : "text-neutral-400"
                }`}>
                  {tab.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      {/* iOS safe area fill */}
      <div className="h-safe-bottom bg-white" />
    </div>
  );
}
