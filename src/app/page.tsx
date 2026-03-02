"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para lidar com o clique no botão de encurtar
  async function handleShorten() {
    if (!url) return;

    // Inicia o processo de encurtamento e exibe o estado de carregamento
    setLoading(true);

    // Envia a URL para a API de encurtamento
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      setShortUrl(data.short_url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Função para copiar o link encurtado para a área de transferência
  function copyLink() {
    navigator.clipboard.writeText(shortUrl);
  }

  // Renderiza a interface do usuário
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          URL Shortener
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Encurte links rapidamente
        </p>
        
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://exemplo.com"
          className="w-full border rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
        />
        
        <button
          onClick={handleShorten}
          disabled={loading}
          className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Encurtando..." : "Encurtar"}
        </button>
        
        {shortUrl && (
          <div className="mt-8 bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Link criado:
            </p>

            <a
              href={shortUrl}
              target="_blank"
              className="text-blue-600 font-semibold break-all"
            >
              {shortUrl}
            </a>

            <button
              onClick={copyLink}
              className="mt-3 text-sm bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Copiar
            </button>
          </div>
        )}

      </div>
    </main>
  );
}