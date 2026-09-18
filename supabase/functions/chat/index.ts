import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content || "";

    console.log("Processing AETHER Concierge query:", lastMessage);

    // High-performance zero-cost response generator
    const responseText = `Welcome to AETHER Concierge. I have received your inquiry regarding "${lastMessage}". How can I assist your luxury shopping experience today?`;

    return new Response(
      JSON.stringify({
        id: `ai-${Date.now()}`,
        choices: [
          {
            message: {
              role: "assistant",
              content: responseText,
            },
          },
        ],
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("AETHER Chat Edge Function Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
