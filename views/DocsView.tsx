import { MDRenderer } from "@/components/MDRenderer";

const documentation = `# OptimalCloud.AI Documentation

## Overview

OptimalCloud.AI is a comprehensive platform designed to streamline cloud application deployment and optimization. Our platform combines powerful deployment tools with AI-driven performance optimization to help you get the most out of your cloud infrastructure.

## Key Features

### Application Deployment

Our platform provides a seamless deployment experience for your applications on AWS:

- **One-Click Deployment**: Deploy your applications to AWS with just a few clicks
- **Infrastructure as Code**: Automatically generate and manage infrastructure templates
- **Environment Management**: Easily manage different deployment environments (dev, staging, production)
- **Deployment Monitoring**: Track the status and health of your deployments in real-time

### AI-Powered Optimization

Our intelligent assistant helps you optimize your cloud applications:

- **Cost Analysis**: Identify cost-saving opportunities across your infrastructure
- **Performance Recommendations**: Get actionable insights to improve application performance
- **Resource Right-sizing**: Optimize instance types and resource allocations based on actual usage
- **Automated Scaling**: Intelligent scaling recommendations based on traffic patterns

### Cloud Management

Comprehensive tools for managing your cloud infrastructure:

- **Resource Dashboard**: View and manage all your cloud resources in one place
- **Monitoring & Alerts**: Set up custom alerts for performance, cost, and security metrics
- **Security Compliance**: Ensure your infrastructure follows best practices and compliance standards
- **Usage Analytics**: Visualize resource usage and identify optimization opportunities

## Getting Started

1. **Create an Account**: Sign up for OptimalCloud.AI
2. **Connect AWS**: Link your AWS account using secure IAM roles
3. **Import or Create**: Import existing applications or create new ones
4. **Deploy**: Use our guided deployment workflow
5. **Optimize**: Leverage our AI assistant for continuous improvement

## Best Practices

### Deployment

- Use environment variables for configuration instead of hardcoded values
- Implement a CI/CD pipeline for automated testing and deployment
- Start with smaller instances and scale up as needed
- Utilize containerization for consistent deployments

### Optimization

- Regularly review AI recommendations for cost-saving opportunities
- Implement auto-scaling based on actual usage patterns
- Consider reserved instances for predictable workloads
- Enable performance monitoring for all deployed applications

## FAQ

### How does the AI optimization work?
Our AI analyzes your application's performance metrics, resource utilization, and cost data to provide tailored recommendations for improving efficiency and reducing costs.

### Is OptimalCloud.AI secure?
Yes, we implement industry-standard security practices including encrypted communications, least-privilege access controls, and regular security audits.

### Can I use OptimalCloud.AI with existing applications?
Absolutely! You can easily import existing applications and start benefiting from our deployment and optimization features immediately.

### What cloud providers do you support?
Currently, we focus on AWS with plans to expand to other major cloud providers in the future.

## Support

Need help? Our support team is available via:

- Email: support@optimalcloud.ai
- Live Chat: Available in-app during business hours
- Documentation: This comprehensive resource
`;

export default function DocsView() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Documentation</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg ">
        <MDRenderer content={documentation} />
      </div>
    </div>
  );
} 