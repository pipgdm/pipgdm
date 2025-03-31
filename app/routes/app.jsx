import { json } from "@remix-run/node";
import { Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { authenticate } from "../shopify.server";
import {
  Frame,
  Navigation,
  Page,
  Layout,
} from "@shopify/polaris";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return json({
    apiKey: process.env.SHOPIFY_API_KEY,
    host: new URL(request.url).searchParams.get("host"),
  });
};

export default function App() {
  const { apiKey, host } = useLoaderData();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey} host={host}>
      <Frame>
        <Navigation location="/">
          <Navigation.Section
            items={[
              {
                label: "Home",
                url: "/app",
              },
              {
                label: "Install Script",
                url: "/app/script-tag",
              },
            ]}
          />
        </Navigation>
        <Page>
          <Layout>
            <Layout.Section>
              <Outlet />
            </Layout.Section>
          </Layout>
        </Page>
      </Frame>
    </AppProvider>
  );
}