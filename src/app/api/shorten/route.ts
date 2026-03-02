import { prisma } from "@/lib/db";
import { encodeId } from "@/lib/shortcode";

// Rota para criar um novo link encurtado
export async function POST(req: Request) {
  // Tenta processar a requisição e criar um novo link encurtado
  try {
    const body = await req.json();
    const { url } = body;

    // Valida se a URL foi fornecida
    if (!url) {
      return Response.json(
        { error: "url is required" },
        { status: 400 }
      );
    }

    // cria registro temporário
    const created = await prisma.url.create({
      data: {
        longUrl: url,
        shortcode: "temp",
      },
    });

    // gera shortcode baseado no ID
    const shortcode = encodeId(created.id);

    // atualiza com shortcode real
    await prisma.url.update({
      where: { id: created.id },
      data: { shortcode },
    });

    // Retorna a URL encurtada para o cliente
    return Response.json(
      {
        short_url: `${process.env.BASE_URL}/${shortcode}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}