interface HeaderProps {
  title: string
  subtitle?: string
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  const getDefaultSubtitle = (title: string) => {
    switch (title.toLowerCase()) {
      case 'login':
        return 'Welcome back! Please sign in to your account'
      case 'register':
        return 'Create your account to get started'
      case 'forgot password':
        return 'No worries, we\'ll help you reset your password'
      case 'reset password':
        return 'Enter your new password below'
      default:
        return 'Welcome! Please continue with your authentication'
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-2">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent tracking-wide">
        {title}
      </h1>
      <p className="text-muted-foreground text-sm text-center">
        {subtitle || getDefaultSubtitle(title)}
      </p>
    </div>
  )
}
