import { useState, useCallback } from 'react';

type DownloadStatus = 'idle' | 'downloading' | 'completed' | 'error';

interface UseDownloadReturn {
  status: DownloadStatus;
  progress: number;
  download: () => Promise<void>;
  reset: () => void;
}

const FILE_NAME = 'PokeDynamic-Setup-v1.0.exe';

const getDownloadUrl = (): string => {
  const basePath = import.meta.env.BASE_URL || '/';
  return `${basePath}download/${FILE_NAME}`;
};

export function useDownload(): UseDownloadReturn {
  const [status, setStatus] = useState<DownloadStatus>('idle');
  const [progress, setProgress] = useState(0);

  const download = useCallback(async () => {
    setStatus('downloading');
    setProgress(0);

    try {
      const downloadUrl = getDownloadUrl();
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        throw new Error('Download failed');
      }

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Cannot read response body');
      }

      const chunks: Uint8Array[] = [];
      let received = 0;

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        chunks.push(value);
        received += value.length;
        
        if (total > 0) {
          setProgress(Math.round((received / total) * 100));
        }
      }

      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = FILE_NAME;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setStatus('completed');
      setProgress(100);

      setTimeout(() => {
        setStatus('idle');
        setProgress(0);
      }, 3000);
    } catch {
      setStatus('error');
      setProgress(0);
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setProgress(0);
  }, []);

  return { status, progress, download, reset };
}
