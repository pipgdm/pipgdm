import { useState } from "react";
import { json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
  Layout,
  Page,
  LegacyCard,
  Button,
  Text,
  BlockStack,
  Box,
  Banner,
} from "@shopify/polaris";

// Handle GET requests
export async function loader({ request }) {
  await authenticate.admin(request);
  return json({});
}

// Handle POST requests (installing the script tag)
export async function action({ request }) {
  const { admin } = await authenticate.admin(request);

  // Create a new script tag
  const scriptTag = new admin.rest.resources.ScriptTag({
    session: admin.session,
  });
  
  scriptTag.src = `${new URL(request.url).origin}/api/script-tag`;
  scriptTag.display_scope = "online_store";
  scriptTag.event = "onload";
  
  await scriptTag.save({
    update: true,
  });

  return json({ status: "success" });
}

export default function ScriptTagPage() {
  const [installed, setInstalled] = useState(false);

  const handleInstall = () => {
    setInstalled(true);
  };

  return (
    <Page title="Install Script">
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <LegacyCard>
              <LegacyCard.Section>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">Install Script Tag</Text>
                  <Text as="p">
                    Click the button below to install the script tag that will display your note on product pages.
                  </Text>
                  <Form method="post">
                    <Button primary onClick={handleInstall} submit>
                      Install Script Tag
                    </Button>
                  </Form>
                </BlockStack>
              </LegacyCard.Section>
            </LegacyCard>
          </Layout.Section>
          
          {installed && (
            <Layout.Section>
              <Banner
                title="Script tag installed successfully"
                status="success"
              >
                <p>Your note will now appear on all product pages.</p>
              </Banner>
            </Layout.Section>
          )}
        </Layout>
      </BlockStack>
    </Page>
  );
}

