import { useState } from "react";
import { json } from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  LegacyCard,
  TextField,
  Button,
  Text,
  BlockStack,
  Box,
} from "@shopify/polaris";

// This function runs when the page loads
export async function loader({ request }) {
  // Get the saved note (currently from memory)
  const note = global.storeNote || "";
  console.log("Loading saved note:", note);
  return json({ note });
}

// This function handles the form submission on the server
export async function action({ request }) {
  const formData = await request.formData();
  const note = formData.get("note");
  
  // For now, just store in memory (we'll add proper storage later)
  global.storeNote = note;
  console.log("Server received note:", note);
  
  return json({ status: "success" });
}

export default function Index() {
  const [note, setNote] = useState("");
  const submit = useSubmit();

  const handleSubmit = () => {
    submit({ note }, { method: "post" });
    // Show success message or feedback here
  };

  return (
    <Page title="Store Note">
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <LegacyCard>
              <LegacyCard.Section>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">Create a Note</Text>
                  <Text as="p">Enter a note to display on your product pages:</Text>
                  <Form method="post">
                    <BlockStack gap="400">
                      <TextField
                        label="Note"
                        value={note}
                        onChange={setNote}
                        autoComplete="off"
                        multiline={3}
                      />
                      <Box>
                        <Button primary onClick={handleSubmit}>Save note</Button>
                      </Box>
                    </BlockStack>
                  </Form>
                </BlockStack>
              </LegacyCard.Section>
              
              {note && (
                <LegacyCard.Section>
                  <BlockStack gap="400">
                    <Text as="h3" variant="headingMd">Preview</Text>
                    <Box
                      padding="400"
                      borderColor="border"
                      borderWidth="1"
                      borderRadius="2"
                      background="bg-subdued"
                    >
                      {note}
                    </Box>
                  </BlockStack>
                </LegacyCard.Section>
              )}
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}