import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Hr,
  Section,
} from "@react-email/components";

interface LinkEmailProps {
  url: string;
}

export const LinkEmail = ({ url }: LinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your NutriCulture email address</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header Section with Brand */}
        <Section style={headerSection}>
          <div style={logoContainer}>
            <Text style={logoText}>
              <span style={brandName}>NUTRICULTURE</span>
            </Text>
          </div>
          <Hr style={headerDivider} />
        </Section>

        {/* Main Content */}
        <Section style={contentSection}>
          <Heading style={h1}>Verify Your Email</Heading>
          <Text style={greeting}>Welcome to NutriCulture!</Text>
          <Text style={paragraph}>
            Thank you for joining NutriCulture. We're excited to help you on your personalized nutrition journey 
            with AI-powered meal suggestions and dietary guidance.
          </Text>
          
          <Text style={paragraph}>
            To complete your registration and secure your account, please verify your email 
            address by clicking the button below:
          </Text>

          {/* CTA Button */}
          <Section style={buttonContainer}>
            <Link href={url} style={button}>
              Verify Email Address
            </Link>
          </Section>

          <Text style={paragraph}>
            This verification link will expire in 1 hour for security purposes.
          </Text>

          <Text style={disclaimerText}>
            If you didn't create an account with NutriCulture, you can safely ignore this email. 
            No account will be created without verification.
          </Text>
        </Section>

        {/* Features Preview */}
        <Section style={featuresSection}>
          <Text style={featuresTitle}>What's next after verification?</Text>
          <div style={featuresList}>
            <Text style={featureItem}>🍎 Get AI-powered meal suggestions</Text>
            <Text style={featureItem}>🥗 Discover healthy recipe alternatives</Text>
            <Text style={featureItem}>📊 Calculate your BMI and track nutrition</Text>
            <Text style={featureItem}>📸 Analyze meal nutrition from images</Text>
          </div>
        </Section>

        {/* Footer */}
        <Section style={footerSection}>
          <Hr style={footerDivider} />
          <Text style={footerText}>
            <Link href="https://nutriculture.app" style={footerLink}>
              NutriCulture
            </Link>
            <br />
            Your Personal AI-Powered Nutritionist
            <br />
            <br />
            Need help?{" "}
            <Link href="https://nutriculture.app/contact" style={footerLink}>
              Contact our support team
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

LinkEmail.PreviewProps = {
  url: "https://nutriculture.app/verify-email",
} as LinkEmailProps;

export default LinkEmail;

// Styles
const main = {
  backgroundColor: "#0f172a",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
  backgroundColor: "#1e293b",
  borderRadius: "12px",
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
  border: "1px solid #334155",
};

const headerSection = {
  padding: "32px 40px 24px",
  backgroundColor: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #4f46e5 100%)",
  borderRadius: "12px 12px 0 0",
};

const logoContainer = {
  textAlign: "center" as const,
  marginBottom: "20px",
};

const logoText = {
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0",
  letterSpacing: "0.5px",
};

const brandName = {
  color: "#ffffff",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
};

const brandExtension = {
  color: "#e0e7ff",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
};

const headerDivider = {
  borderColor: "rgba(255, 255, 255, 0.3)",
  margin: "20px 0 0 0",
};

const contentSection = {
  padding: "40px 40px 32px",
};

const h1 = {
  color: "#f8fafc",
  fontSize: "32px",
  fontWeight: "bold",
  lineHeight: "1.2",
  margin: "0 0 24px 0",
  textAlign: "center" as const,
};

const greeting = {
  color: "#e2e8f0",
  fontSize: "18px",
  fontWeight: "600",
  lineHeight: "1.4",
  margin: "0 0 16px 0",
};

const paragraph = {
  color: "#cbd5e1",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 24px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#4f46e5",
  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #4f46e5 100%)",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "16px 32px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
  transition: "all 0.2s ease",
};

const disclaimerText = {
  color: "#94a3b8",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "32px 0 0 0",
  padding: "16px",
  backgroundColor: "#0f172a",
  borderRadius: "8px",
  border: "1px solid #334155",
};

const featuresSection = {
  padding: "24px 40px 32px",
  backgroundColor: "#0f172a",
  borderRadius: "8px",
  margin: "0 40px",
  border: "1px solid #334155",
};

const featuresTitle = {
  color: "#f8fafc",
  fontSize: "18px",
  fontWeight: "600",
  lineHeight: "1.4",
  margin: "0 0 16px 0",
  textAlign: "center" as const,
};

const featuresList = {
  margin: "0",
};

const featureItem = {
  color: "#cbd5e1",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 8px 0",
  display: "block",
};

const footerSection = {
  padding: "0 40px 32px",
};

const footerDivider = {
  borderColor: "#334155",
  margin: "32px 0 24px 0",
};

const footerText = {
  color: "#94a3b8",
  fontSize: "14px",
  lineHeight: "1.6",
  textAlign: "center" as const,
  margin: "0",
};

const footerLink = {
  color: "#60a5fa",
  textDecoration: "none",
  fontWeight: "500",
};
