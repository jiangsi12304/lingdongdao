import React, { useState, useEffect, useRef } from 'react';
import { Download, Star, HardDrive } from 'lucide-react';

const DownloadStats: React.FC = () => {
  const [downloads, setDownloads] = useState(0);
  const [rating, setRating] = useState(0);
  const [size, setSize] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const targetDownloads = 10000;
    const targetRating = 4.8;
    const targetSize = 48;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setDownloads(Math.floor(targetDownloads * easeOutQuart));
      setRating(parseFloat((targetRating * easeOutQuart).toFixed(1)));
      setSize(Math.floor(targetSize * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12">
      <StatItem 
        icon={<Download className="text-gengar-accent" size={20} />}
        value={downloads.toLocaleString()}
        suffix="+"
        label="下载量"
      />
      <StatItem 
        icon={<Star className="text-yellow-400" size={20} />}
        value={rating.toFixed(1)}
        label="用户评分"
      />
      <StatItem 
        icon={<HardDrive className="text-blue-400" size={20} />}
        value={size.toString()}
        suffix="MB"
        label="安装包大小"
      />
    </div>
  );
};

const StatItem: React.FC<{
  icon: React.ReactNode;
  value: string;
  suffix?: string;
  label: string;
}> = ({ icon, value, suffix, label }) => (
  <div className="flex flex-col items-center text-center">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-3xl md:text-4xl font-bold text-gengar-light">{value}</span>
      {suffix && <span className="text-xl text-gengar-accent">{suffix}</span>}
    </div>
    <span className="text-gray-500 text-sm">{label}</span>
  </div>
);

export default DownloadStats;
