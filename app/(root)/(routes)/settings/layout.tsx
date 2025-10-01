import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings and preferences.",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 px-4 md:px-6 mt-20">
        {/* Header Section */}
        <div className="text-center flex flex-col gap-6 mb-16">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent tracking-tight">
              Settings
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Manage your account settings and preferences
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-full"></div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
