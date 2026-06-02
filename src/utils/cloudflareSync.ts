import { Book } from '../types';

const API_PATH = '/api/books';

export async function syncGetBooks(): Promise<Book[] | null> {
  try {
    const res = await fetch(API_PATH);
    if (!res.ok) {
      throw new Error(`Servidor respondeu com status: ${res.status}`);
    }
    const data = await res.json();
    if (Array.isArray(data)) {
      return data;
    }
    return null;
  } catch (error) {
    console.warn("Cloudflare Sync is inactive or returned an error (normal in local environment):", error);
    return null;
  }
}

export async function syncSaveBooks(books: Book[]): Promise<boolean> {
  try {
    const res = await fetch(API_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(books),
    });
    return res.ok;
  } catch (error) {
    console.error("Erro ao salvar dados no Cloudflare KV:", error);
    return false;
  }
}
