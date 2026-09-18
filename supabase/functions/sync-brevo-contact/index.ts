import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed. Only POST is supported." }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawEmail = body.email;
    const rawName = body.name;

    // Server-side validation
    if (!rawEmail || typeof rawEmail !== "string") {
      return new Response(
        JSON.stringify({ error: "Email is required and must be a string." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Normalize email by trimming whitespace and converting to lowercase
    const email = rawEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address format." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Read Brevo API key ONLY from Supabase Edge Function secret
    const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
    if (!BREVO_API_KEY) {
      console.error("BREVO_API_KEY environment secret is missing.");
      return new Response(
        JSON.stringify({ error: "Server configuration error. Brevo API key is missing." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Locate Brevo list ID for "Website Subscribers"
    let listId: number | undefined;
    try {
      const listsRes = await fetch("https://api.brevo.com/v3/contacts/lists?limit=50&offset=0", {
        method: "GET",
        headers: {
          "api-key": BREVO_API_KEY,
          "accept": "application/json",
        },
      });

      if (listsRes.ok) {
        const listsData = await listsRes.json();
        const targetList = listsData.lists?.find(
          (l: { name: string; id: number }) =>
            l.name.trim().toLowerCase() === "website subscribers"
        );
        if (targetList) {
          listId = targetList.id;
        }
      }
    } catch (err) {
      console.warn("Could not fetch Brevo lists:", err instanceof Error ? err.message : String(err));
    }

    // Construct Brevo contact payload (idempotent create or update)
    const attributes: Record<string, string> = {};
    if (rawName && typeof rawName === "string" && rawName.trim()) {
      attributes["FIRSTNAME"] = rawName.trim();
    }

    const brevoPayload: Record<string, unknown> = {
      email: email,
      updateEnabled: true,
    };

    if (Object.keys(attributes).length > 0) {
      brevoPayload["attributes"] = attributes;
    }

    if (listId !== undefined) {
      brevoPayload["listIds"] = [listId];
    }

    // Call Brevo Contacts API
    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify(brevoPayload),
    });

    if (!brevoRes.ok) {
      const errorText = await brevoRes.text();
      console.error("Brevo API response status error:", brevoRes.status);

      return new Response(
        JSON.stringify({
          error: "Failed to synchronize contact with Brevo.",
          details: errorText,
        }),
        { status: brevoRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const brevoData = await brevoRes.json().catch(() => ({}));

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact synchronized to Brevo successfully.",
        email: email,
        data: brevoData,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("sync-brevo-contact error:", error instanceof Error ? error.message : String(error));
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An unexpected server error occurred.",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
