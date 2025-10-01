import { currentSession } from "@/lib/api/user";
import Image from "next/image";
import { redirect } from "next/navigation";
import ImageUpload from "./image-upload";
import NameForm from "./name-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Camera } from "lucide-react";

export default async function ProfileForm() {
  const { user } = await currentSession();
  if (!user) redirect("/login");

  return (
    <div className="space-y-8">
      {/* Profile Image Section */}
      <Card className="bg-gradient-to-br from-blue-50/50 via-white/50 to-purple-50/50 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-indigo-900/50 border border-foreground/10 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profile Picture
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="relative group">
              <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="Profile"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    fill
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{user.name?.[0] || "?"}</span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Upload a new profile picture to personalize your account. Supported formats: JPG, PNG, GIF (max 5MB)
              </p>
              <ImageUpload userId={user.id} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Name Section */}
      <Card className="bg-gradient-to-br from-green-50/50 via-white/50 to-emerald-50/50 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-green-900/50 border border-foreground/10 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-md">
              <User className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Display Name
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This name will be displayed across the platform and in your profile.
          </p>
          <NameForm initialName={user.name || ""} />
        </CardContent>
      </Card>
    </div>
  );
}
