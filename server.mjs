import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = 4173;
const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const file = normalize(join(root, relative));

  if (!file.startsWith(root)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    const { size } = statSync(file);
    const type = mime[extname(file).toLowerCase()] || "application/octet-stream";
    const range = request.headers.range;

    if (range) {
      const [startText, endText] = range.replace("bytes=", "").split("-");
      const start = Number(startText);
      const end = endText ? Number(endText) : size - 1;
      response.writeHead(206, {
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Content-Type": type,
      });
      createReadStream(file, { start, end }).pipe(response);
      return;
    }

    response.writeHead(200, { "Content-Length": size, "Content-Type": type });
    createReadStream(file).pipe(response);
  } catch {
    const fallback = join(root, "app.html");
    try {
      const { size } = statSync(fallback);
      response.writeHead(200, {
        "Content-Length": size,
        "Content-Type": "text/html; charset=utf-8",
      });
      createReadStream(fallback).pipe(response);
    } catch {
      response.writeHead(404).end("Not found");
    }
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Johnny template: http://localhost:${port}`);
});
