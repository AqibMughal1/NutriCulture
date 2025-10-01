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

interface ResetPasswordProps {
  url: string;
}

export const ResetPassword = ({ url }: ResetPasswordProps) => (
  <Html>
    <Head />
    <Preview>Reset your OptimalCloud.AI password</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header Section with Brand */}
        <Section style={headerSection}>
          <div style={logoContainer}>
            <Text style={logoText}>
              <span style={brandName}>OPTIMALCLOUD</span>
              <span style={brandExtension}>.AI</span>
            </Text>
          </div>
          <Hr style={headerDivider} />
        </Section>

        {/* Main Content */}
        <Section style={contentSection}>
          <Heading style={h1}>Reset Your Password</Heading>
          <Text style={greeting}>Hello!</Text>
          <Text style={paragraph}>
            We received a request to reset your password for your OptimalCloud.AI account. 
            Click the button below to create a new password.
          </Text>

          {/* CTA Button */}
          <Section style={buttonContainer}>
            <Link href={url} style={button}>
              Reset Password
            </Link>
          </Section>

          <Text style={paragraph}>
            This link will expire in 1 hour for security purposes.
          </Text>

          <Text style={disclaimerText}>
            If you didn't request a password reset, you can safely ignore this email. 
            Your password will remain unchanged.
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footerSection}>
          <Hr style={footerDivider} />
          <Text style={footerText}>
            <Link href="https://optimalcloud.live" style={footerLink}>
              OptimalCloud.AI
            </Link>
            <br />
            Build. Configure. Deploy.
            <br />
            <br />
            Need help?{" "}
            <Link href="https://optimalcloud.live/contact" style={footerLink}>
              Contact our support team
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

ResetPassword.PreviewProps = {
  url: "https://optimalcloud.live/reset-password",
} as ResetPasswordProps;

export default ResetPassword;

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
