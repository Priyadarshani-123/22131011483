import React, { useState } from 'react';
import { Log } from './logger';

const ShortenURLForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      await Log('warn', 'ShortenURLForm', 'Empty URL submitted');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: url }),
      });

      if (!res.ok) throw new Error('Shorten failed');

      const data = await res.json();
      setShortUrl(data.shortUrl);
      await Log('info', 'ShortenURLForm', `Shortened URL successfully: ${data.shortUrl}`);
    } catch (err: any) {
      await Log('error', 'ShortenURLForm', `Shorten failed: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div>
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};
export default ShortenURLForm;
