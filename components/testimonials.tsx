'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import AvatarCircles from '@/components/ui/user-avatar-card'

export const Testimonials = () => {
  // Add or remove testimonials here following this format
  const testimonials = [
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'OptimalCloud.ai made managing our cloud infrastructure effortless and cost-effective. Highly recommended for teams looking to scale smartly!'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'The AI-driven insights provided by OptimalCloud.ai have been a game changer for our operations. Outstanding platform!'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'Since using OptimalCloud.ai, our cloud costs have dropped significantly, and our performance metrics have improved. Amazing tool!'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'We were impressed by the seamless onboarding and the proactive support. OptimalCloud.ai is worth every penny!'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'This platform has simplified our cloud configuration process, saving us countless hours. A must-have for any cloud team!'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'OptimalCloud.ai exceeded our expectations with its robust AI-driven recommendations. It’s truly next-level innovation!'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'The cost optimization features alone make OptimalCloud.ai an invaluable addition to our workflow. Highly satisfied!'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'With OptimalCloud.ai, we’ve been able to streamline our cloud accounts and achieve better performance. Fantastic product!'
    },
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message:
        'The level of automation provided by OptimalCloud.ai has revolutionized how we manage our resources. Absolutely incredible!'
    }
  ];
  
  return (
    <div>
      {/* Section Title */}
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="pb-4 text-4xl font-extrabold text-foreground">
          Testimonials
        </h2>
        <p className="text-md opacity-50 max-w-lg text-center">
          See What our Clients Say about us
        </p>
        <AvatarCircles />
      </div>
      {/* Testimonials Card*/}
      <div className="flex items-center justify-center my-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {testimonials.map((testimonial, i) => (
            <Card
              key={i}
              className="py-4 px-0 bg-secondary border-0 ring-[2px] ring-foreground/10 ring-inset rounded-lg hover:bg-primary/10 hover:ring-primary/25 transition duration-300 cursor-default"
            >
              <CardContent className="py-0">
                <div className="flex">
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                  </Avatar>

                  <CardTitle className="text-lg pl-2 text-foreground pt-1">
                    {testimonial.name}
                  </CardTitle>
                </div>
                <p className="pt-3 text-foreground/70">
                  "{testimonial.message}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
