'use client'

import { Header } from '@/components/auth/header'
import { Social } from '@/components/auth/social'
import { BackButton } from '@/components/auth/back-button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'

interface CardWrapperProps {
  children: React.ReactNode
  headerTitle: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export const CardWrapper = ({
  children,
  headerTitle,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps) => {
  return (
    <Card className="w-full bg-secondary/70 dark:bg-secondary/50 backdrop-blur-lg border border-foreground/10 rounded-2xl shadow-2xl p-8">
      <CardHeader className="pb-6">
        <Header title={headerTitle} />
      </CardHeader>

      <div className="space-y-6">{children}</div>

      {showSocial && (
        <div className="pt-4 border-t border-foreground/10">
          <Social />
        </div>
      )}

      <CardFooter className="pt-6">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
