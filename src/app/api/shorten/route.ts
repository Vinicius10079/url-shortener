import { prisma } from "@/lib/db";
import { encodeId } from "@/lib/shortcode";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

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