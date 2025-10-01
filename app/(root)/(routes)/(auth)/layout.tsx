const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </main>
  )
}

export default AuthLayout
