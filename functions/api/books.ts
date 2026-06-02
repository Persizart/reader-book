interface Env {
  READERBOOK_KV: any; 
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
 
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    if (!context.env.READERBOOK_KV) {
      return new Response(
        JSON.stringify({
          error: "Atenção: A variável 'READERBOOK_KV' não está vinculada no painel do Cloudflare. Por favor, adicione o binding de KV nas Configurações da sua Página."
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    const value = await context.env.READERBOOK_KV.get("books_data");
    if (!value) {
      return new Response(JSON.stringify([]), { headers: corsHeaders });
    }
    return new Response(value, { headers: corsHeaders });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Erro ao consultar o Cloudflare KV" }),
      { status: 500, headers: corsHeaders }
    );
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    if (!context.env.READERBOOK_KV) {
      return new Response(
        JSON.stringify({
          error: "Atenção: A variável 'READERBOOK_KV' não está vinculada no painel do Cloudflare. Por favor, adicione o binding de KV nas Configurações da sua Página."
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    const books = await context.request.json();
    await context.env.READERBOOK_KV.put("books_data", JSON.stringify(books));
    
    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Erro ao salvar no Cloudflare KV" }),
      { status: 500, headers: corsHeaders }
    );
  }
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
