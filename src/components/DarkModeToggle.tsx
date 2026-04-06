import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};

export const DarkModeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Render nothing on the server
  if (!mounted) return null;

  // Once the component has mounted, we can safely render
  return (
    <Button variant="ghost" onClick={toggleDarkMode} className="p-2">
      {resolvedTheme === "dark" ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </Button>
  );
};
