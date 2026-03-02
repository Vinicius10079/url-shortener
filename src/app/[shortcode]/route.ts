import { prisma } from "@/lib/db";

export async function GET(
  _req: Request,
  context: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await context.params;

  const url = await prisma.url.findUnique({
    where: { shortcode },
  });

  if (!url) {
    return new Response("Not Found", { status: 404 });
  }

  return Response.redirect(url.longUrl, 302);
}