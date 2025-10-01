import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Cloud, 
  Server, 
  Shield, 
  Zap, 
  BarChart3, 
  Settings, 
  Rocket, 
  Users, 
  HeadphonesIcon,
  CheckCircle,
  ArrowRight,
  CloudCog,
  Database,
  Lock,
  TrendingUp,
  Globe,
  Wrench
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";

const services = [
  {
    id: "cloud-optimization",
    icon: CloudCog,
    title: "Cloud Optimization",
    description: "Maximize your cloud efficiency with intelligent resource management and cost optimization.",
    features: [
      "Automated resource scaling",
      "Cost analysis and recommendations",
      "Performance optimization",
      "Resource utilization monitoring"
    ],
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20",
    popular: true
  },
  {
    id: "deployment-automation",
    icon: Rocket,
    title: "Deployment Automation",
    description: "Streamline your deployment process with automated CI/CD pipelines and infrastructure as code.",
    features: [
      "Automated deployment pipelines",
      "Infrastructure as code",
      "Multi-environment support",
      "Rollback capabilities"
    ],
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20",
    popular: false
  },
  {
    id: "security-compliance",
    icon: Shield,
    title: "Security & Compliance",
    description: "Ensure your cloud infrastructure meets security standards and compliance requirements.",
    features: [
      "Security audits and assessments",
      "Compliance monitoring",
      "Vulnerability scanning",
      "Access control management"
    ],
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20",
    popular: false
  },
  {
    id: "performance-monitoring",
    icon: BarChart3,
    title: "Performance Monitoring",
    description: "Monitor your applications and infrastructure with real-time analytics and alerts.",
    features: [
      "Real-time monitoring",
      "Custom dashboards",
      "Intelligent alerting",
      "Performance analytics"
    ],
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50/50 to-red-50/50 dark:from-orange-900/20 dark:to-red-900/20",
    popular: false
  },
  {
    id: "database-optimization",
    icon: Database,
    title: "Database Optimization",
    description: "Optimize your database performance and reduce costs with intelligent scaling and tuning.",
    features: [
      "Query optimization",
      "Database scaling",
      "Performance tuning",
      "Backup and recovery"
    ],
    color: "from-indigo-500 to-blue-500",
    bgColor: "from-indigo-50/50 to-blue-50/50 dark:from-indigo-900/20 dark:to-blue-900/20",
    popular: false
  },
  {
    id: "managed-services",
    icon: Wrench,
    title: "Managed Services",
    description: "Let our experts manage your cloud infrastructure while you focus on your business.",
    features: [
      "24/7 infrastructure management",
      "Expert consultation",
      "Proactive maintenance",
      "Emergency support"
    ],
    color: "from-teal-500 to-green-500",
    bgColor: "from-teal-50/50 to-green-50/50 dark:from-teal-900/20 dark:to-green-900/20",
    popular: false
  }
];

const supportTiers = [
  {
    name: "Community",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "Community forums",
      "Documentation access",
      "Basic tutorials",
      "Email support"
    ],
    color: "from-gray-500 to-gray-600",
    bgColor: "from-gray-50/50 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/20"
  },
  {
    name: "Professional",
    price: "$99/month",
    description: "For growing businesses",
    features: [
      "Priority support",
      "Phone support",
      "Advanced tutorials",
      "SLA guarantee"
    ],
    color: "from-blue-500 to-purple-500",
    bgColor: "from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Dedicated support team",
      "Custom integrations",
      "On-site training",
      "24/7 emergency support"
    ],
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20"
  }
];

export default function ServicesView() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 px-4 md:px-6 mt-20">
        {/* Header Section */}
        <div className="text-center flex flex-col gap-6 mb-32">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent tracking-tight">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Comprehensive cloud optimization solutions to accelerate your digital transformation journey
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-full"></div>
          </div>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {services.map((service) => (
            <Card key={service.id} className={`group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-foreground/10 hover:border-primary/30 bg-gradient-to-br ${service.bgColor} backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl`}>
              {service.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 bg-gradient-to-r ${service.color} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className={`text-xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                      {service.title}
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg text-white border-0 transition-all duration-300 group-hover:scale-[1.02]`}>
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Tiers Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Support & Consulting
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the support level that best fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportTiers.map((tier) => (
              <Card key={tier.name} className={`group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-foreground/10 hover:border-primary/30 bg-gradient-to-br ${tier.bgColor} backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl`}>
                {tier.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg">
                      Recommended
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4 relative z-10 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${tier.color} rounded-xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300`}>
                    <HeadphonesIcon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className={`text-2xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                    {tier.name}
                  </CardTitle>
                  <div className="text-3xl font-bold mb-2">{tier.price}</div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className={`w-full bg-gradient-to-r ${tier.color} hover:shadow-lg text-white border-0 transition-all duration-300 group-hover:scale-[1.02]`}>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 rounded-3xl p-16 border border-foreground/10 shadow-xl mt-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-6">
            Ready to Optimize Your Cloud?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's discuss how OptimalCloud can help transform your cloud infrastructure and accelerate your business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/get-started">
              <Button variant="outline" className="px-8 py-3 rounded-xl font-semibold border-2 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300">
                Get Started Free
                <Rocket className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 