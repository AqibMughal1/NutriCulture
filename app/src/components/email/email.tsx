import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";


import * as React from "react";



const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const RepoEmail = () => (
  <Html>
    <Head />
    <Preview>
      Your Free AI-Based Cloud Configuration and Optimization Tool
    </Preview>
    <Body style={main}>
      <Container style={container}>

        <Text style={paragraph}>Hello!</Text>
        <Text style={paragraph}>
          Welcome to Optimal Cloud.ai! The free (and better) AI-based cloud configuration and optimization tool.
        </Text>
        <Text style={paragraph}>
          Below is the link to the GitHub repository where you can find the tool.
        </Text>
        <Text style={paragraph}>
          Enjoy optimizing your cloud infrastructure with it!
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://github.com/aqibmughal1">
            Go To The Tool
          </Button>
        </Section>
        <Text style={paragraph}>
          Best regards,
          <br />
          Optimal Cloud.ai Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          470 Noor Ave STE B #1148, Ottawa, Canada 94080
        </Text>
      </Container>
    </Body>
  </Html>
);
export default RepoEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: 'black'
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#1F8EEF",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};