// import { Toaster as Sonner } from "sonner";

// const Toaster = ({ ...props }) => {
//   return (
//     <Sonner
//       className="toaster group"
//       toastOptions={{
//         classNames: {
//           toast:
//             "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg backdrop-blur-none",
//           description: "group-[.toast]:text-muted-foreground",
//           actionButton:
//             "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
//           cancelButton:
//             "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
//           success:
//             "group-[.toast]:bg-background group-[.toast]:text-foreground group-[.toast]:border-green-500/50",
//           error:
//             "group-[.toast]:bg-background group-[.toast]:text-foreground group-[.toast]:border-destructive/50",
//           warning:
//             "group-[.toast]:bg-background group-[.toast]:text-foreground group-[.toast]:border-yellow-500/50",
//           info: "group-[.toast]:bg-background group-[.toast]:text-foreground group-[.toast]:border-blue-500/50",
//         },
//         style: {
//           opacity: 1, // Force full opacity
//         },
//       }}
//       style={{
//         "--normal-bg": "hsl(var(--background))",
//         "--normal-border": "hsl(var(--border))",
//         "--normal-text": "hsl(var(--foreground))",
//         "--success-bg": "hsl(var(--background))",
//         "--success-border": "hsl(142.1 76.2% 36.3%)",
//         "--success-text": "hsl(142.1 76.2% 36.3%)",
//         "--error-bg": "hsl(var(--background))",
//         "--error-border": "hsl(var(--destructive))",
//         "--error-text": "hsl(var(--destructive))",
//         "--warning-bg": "hsl(var(--background))",
//         "--warning-border": "hsl(38 92% 50%)",
//         "--warning-text": "hsl(38 92% 50%)",
//         "--info-bg": "hsl(var(--background))",
//         "--info-border": "hsl(221.2 83.2% 53.3%)",
//         "--info-text": "hsl(221.2 83.2% 53.3%)",
//       }}
//       {...props}
//     />
//   );
// };

// export { Toaster };

import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  // Detect dark mode from document class
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <Sonner
      theme={isDark ? "dark" : "light"}
      className="toaster group"
      toastOptions={{
        style: {
          background: "var(--popover)",
          color: "var(--popover-foreground)",
          border: "1px solid var(--border)",
        },
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error:
            "group-[.toast]:bg-destructive group-[.toast]:text-destructive-foreground group-[.toast]:border-destructive",
          success:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:border-primary",
          warning:
            "group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.toast]:border-secondary",
          info: "group-[.toast]:bg-accent group-[.toast]:text-accent-foreground group-[.toast]:border-border",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
