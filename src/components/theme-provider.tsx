"use client";

import {ThemeProvider, ThemeProviderProps} from "next-themes";
import {useSyncExternalStore} from "react";

const subscribe = () => () => {};

export default function Providers({children, ...props}: ThemeProviderProps) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return <>{children}</>; // Render children without ThemeProvider during SSR
  }

  return <ThemeProvider {...props}>{children}</ThemeProvider>; // Wrap children with ThemeProvider after mount
}
