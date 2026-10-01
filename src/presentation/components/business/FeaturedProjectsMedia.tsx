import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  CheckCircle2,
  Eye,
  X,
  Film,
  Camera,
  Grid,
  ChevronDown,
  Layers,
} from 'lucide-react';
import {
  FEATURED_PROJECT_VIDEOS,
  FEATURED_PROJECT_IMAGES,
  type ProjectImage,
  type ProjectVideo,
} from '@/data/projectsMedia';

interface FeaturedProjectsMediaProps {
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}

export const FeaturedProjectsMedia: React.FC<FeaturedProjectsMediaProps> = ({
  title = 'Dự Án Đã Hoàn Thành Thực Tế',
  subtitle = 'Trực quan các công trình màn hình LED & Màn hình hiển thị chuyên dụng do AIO LED trực tiếp tư vấn, sản xuất và thi công hoàn thiện.',
  showHeader = true,
}) => {
  // Video Section State
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoAutoPaused, setIsVideoAutoPaused] = useState(false);
  const [activeVideoCategory, setActiveVideoCategory] = useState<string>('all');
  const [isVideoGridView, setIsVideoGridView] = useState(false);
  const [visibleVideoCount, setVisibleVideoCount] = useState(12);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Image Gallery State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageAutoPaused, setIsImageAutoPaused] = useState(false);
  const [activeImageCategory, setActiveImageCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleGridCount, setVisibleGridCount] = useState(16);
  const [isGridView, setIsGridView] = useState(false);

  // Filtered Videos
  const filteredVideos = useMemo(() => {
    if (activeVideoCategory === 'all') return FEATURED_PROJECT_VIDEOS;
    return FEATURED_PROJECT_VIDEOS.filter((v) => v.category === activeVideoCategory);
  }, [activeVideoCategory]);

  const totalVideos = filteredVideos.length;
  const currentVideo: ProjectVideo =
    filteredVideos[activeVideoIndex % Math.max(1, totalVideos)] || FEATURED_PROJECT_VIDEOS[0];

  // Video Categories
  const videoCategories = useMemo(() => {
    const cats = Array.from(new Set(FEATURED_PROJECT_VIDEOS.map((v) => v.category || 'Màn hình LED')));
    return ['all', ...cats];
  }, []);

  // Filtered Images
  const filteredImages = useMemo(() => {
    if (activeImageCategory === 'all') return FEATURED_PROJECT_IMAGES;
    return FEATURED_PROJECT_IMAGES.filter((img) => img.category === activeImageCategory);
  }, [activeImageCategory]);

  const totalImages = filteredImages.length;

  // Image Categories
  const imageCategories = useMemo(() => {
    const cats = Array.from(new Set(FEATURED_PROJECT_IMAGES.map((i) => i.category || 'Công trình')));
    return ['all', ...cats];
  }, []);

  // 5s Auto-scroll for Videos
  useEffect(() => {
    if (isVideoAutoPaused || totalVideos === 0) return;

    const timer = setInterval(() => {
      setActiveVideoIndex((prev) => (prev + 1) % totalVideos);
    }, 5000);

    return () => clearInterval(timer);
  }, [isVideoAutoPaused, totalVideos]);

  // Video play/pause effect when active video changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    video.defaultMuted = isMuted;
    if (isVideoPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {
            setIsVideoPlaying(false);
          });
        });
      }
    } else {
      video.pause();
    }
  }, [currentVideo?.url, isVideoPlaying, isMuted]);

  // 5s Auto-scroll for Images
  useEffect(() => {
    if (isImageAutoPaused || totalImages === 0) return;

    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % totalImages);
    }, 5000);

    return () => clearInterval(timer);
  }, [isImageAutoPaused, totalImages]);

  const handleToggleVideoPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setIsVideoPlaying(true))
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsVideoPlaying(true)).catch(() => {});
        });
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video && video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  const prevVideo = () => {
    if (totalVideos === 0) return;
    setActiveVideoIndex((prev) => (prev - 1 + totalVideos) % totalVideos);
  };

  const nextVideo = () => {
    if (totalVideos === 0) return;
    setActiveVideoIndex((prev) => (prev + 1) % totalVideos);
  };

  const prevImage = () => {
    if (totalImages === 0) return;
    setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const nextImage = () => {
    if (totalImages === 0) return;
    setActiveImageIndex((prev) => (prev + 1) % totalImages);
  };

  // Lightbox
  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && totalImages > 0) {
      setLightboxIndex((lightboxIndex - 1 + totalImages) % totalImages);
    }
  };

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && totalImages > 0) {
      setLightboxIndex((lightboxIndex + 1) % totalImages);
    }
  };

  const visibleCarouselImages =
    totalImages > 0
      ? [
          filteredImages[activeImageIndex % totalImages],
          filteredImages[(activeImageIndex + 1) % totalImages],
          filteredImages[(activeImageIndex + 2) % totalImages],
          filteredImages[(activeImageIndex + 3) % totalImages],
        ].filter(Boolean)
      : [];

  const currentLightboxImage: ProjectImage | null =
    lightboxIndex !== null && filteredImages[lightboxIndex]
      ? filteredImages[lightboxIndex]
      : null;

  return (
    <section className="relative py-12 lg:py-20 overflow-hidden" id="du-an-thuc-te">
      {/* Cyber background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-accent-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* Section Header */}
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/30 text-cyan-600 dark:text-primary-400 text-xs font-mono tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-primary-400 animate-pulse" />
              Năng lực thực chiến · {FEATURED_PROJECT_VIDEOS.length} Video & {FEATURED_PROJECT_IMAGES.length} Ảnh thực tế
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h2>
            <p className="mt-3 text-sm md:text-base lg:text-lg text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PART 1: ALL 91 PROJECT VIDEOS (Auto-Scroll 5s + Spotlight / Grid View) */}
        {/* ========================================================================= */}
        <div
          className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-xl backdrop-blur-xl relative space-y-5 sm:space-y-6 dark:border-white/10 dark:bg-[#071124]/90 dark:shadow-2xl"
          onMouseEnter={() => setIsVideoAutoPaused(true)}
          onMouseLeave={() => setIsVideoAutoPaused(false)}
        >
          {/* Header row for Video Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-slate-200 dark:border-surface-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-primary-400 shrink-0">
                <Film className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">Video Công Trình Thực Tế</span>
                  <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-cyan-100 text-cyan-800 border border-cyan-300 font-bold dark:bg-primary-500/20 dark:text-primary-300 dark:border-primary-500/30">
                    {FEATURED_PROJECT_VIDEOS.length} Video
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                  Video quay cận cảnh hiện trường độ phân giải cao tại 34+ tỉnh thành
                </p>
              </div>
            </div>

            {/* Video Action Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setIsVideoGridView(!isVideoGridView)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  isVideoGridView
                    ? 'bg-primary-500 text-white border-primary-400 shadow-glow'
                    : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-950 dark:border-surface-700 dark:bg-surface-800/80 dark:hover:bg-surface-700 dark:text-slate-300'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isVideoGridView ? 'Trình chiếu Spotlight' : 'Xem Lưới 91 Video'}</span>
                <span className="sm:hidden">{isVideoGridView ? 'Spotlight' : 'Lưới'}</span>
              </button>

              {!isVideoGridView && (
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-100 text-xs font-mono text-slate-700 dark:border-surface-700/50 dark:bg-surface-800/60 dark:text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>{totalVideos > 0 ? (activeVideoIndex % totalVideos) + 1 : 0}/{totalVideos}</span>
                  </div>
                  <button
                    onClick={prevVideo}
                    className="p-1.5 sm:p-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-surface-700 dark:bg-surface-800 dark:hover:bg-surface-700 dark:text-slate-300 dark:hover:text-white transition-colors"
                    title="Video trước"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextVideo}
                    className="p-1.5 sm:p-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-surface-700 dark:bg-surface-800 dark:hover:bg-surface-700 dark:text-slate-300 dark:hover:text-white transition-colors"
                    title="Video kế tiếp"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Video Category Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {videoCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveVideoCategory(cat);
                  setActiveVideoIndex(0);
                  setVisibleVideoCount(12);
                }}
                className={`whitespace-nowrap px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  activeVideoCategory === cat
                    ? 'bg-primary-500 text-white border-primary-500 shadow-sm font-semibold'
                    : 'border-slate-200 bg-slate-100/80 text-slate-700 hover:text-slate-950 hover:bg-slate-200 dark:border-surface-700/40 dark:bg-surface-800/50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-surface-800'
                }`}
              >
                {cat === 'all' ? `Tất cả (${FEATURED_PROJECT_VIDEOS.length})` : cat}
              </button>
            ))}
          </div>

          {/* 1. SPOTLIGHT PLAYER VIEW */}
          {!isVideoGridView && currentVideo && (
            <div>
              {/* 5-second Progress Bar */}
              <div className="w-full bg-surface-800/80 h-1.5 rounded-full overflow-hidden mb-4 sm:mb-6">
                <motion.div
                  key={activeVideoIndex}
                  initial={{ width: '0%' }}
                  animate={{ width: isVideoAutoPaused ? '100%' : '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                {/* Active Player (8 cols) */}
                <div className="lg:col-span-8">
                  <div
                    className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-surface-700/60 shadow-2xl group cursor-pointer"
                    onClick={handleToggleVideoPlay}
                  >
                    <video
                      key={currentVideo.url}
                      ref={videoRef}
                      src={currentVideo.url}
                      poster={
                        currentVideo.thumbnail ||
                        FEATURED_PROJECT_IMAGES[activeVideoIndex % Math.max(1, FEATURED_PROJECT_IMAGES.length)]?.url
                      }
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                      onError={(e) => {
                        console.warn('[VideoPlayer] Playback note:', currentVideo.url, e);
                      }}
                    />

                    {/* Ambient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                    {/* Center Large Play Button on Hover or when Paused */}
                    {!isVideoPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-0.5 sm:ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Top badges */}
                    <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
                        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center gap-1 sm:gap-1.5">
                          <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-400" />
                          {currentVideo.location}
                        </span>
                        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-primary-600/85 backdrop-blur-md text-white">
                          {currentVideo.category}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[10px] sm:text-xs font-mono bg-black/75 backdrop-blur-md text-slate-300 border border-white/10">
                        {currentVideo.year}
                      </span>
                    </div>

                    {/* Bottom Video Meta & Controls */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="space-y-1 max-w-xl">
                        <h3 className="text-sm sm:text-lg md:text-xl font-bold text-white leading-snug drop-shadow-md">
                          {currentVideo.title}
                        </h3>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm text-primary-300 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                          <span className="truncate">{currentVideo.specs}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto">
                        <button
                          onClick={handleToggleVideoPlay}
                          className="p-2 sm:p-2.5 rounded-full bg-primary-500/90 hover:bg-primary-500 text-white shadow-lg transition-transform hover:scale-105"
                          title={isVideoPlaying ? 'Tạm dừng' : 'Phát tiếp'}
                        >
                          {isVideoPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                        </button>
                        <button
                          onClick={handleToggleMute}
                          className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-colors"
                          title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
                        >
                          {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                        </button>
                        <button
                          onClick={handleFullscreen}
                          className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-colors"
                          title="Toàn màn hình"
                        >
                          <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Selector List (4 cols) with resilient thumbnail snapshots */}
                <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 sm:p-4 dark:border-white/10 dark:bg-slate-950/80 flex flex-col gap-2.5 w-full">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-primary-400" /> Danh sách ({totalVideos} video)
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-primary-400 font-bold font-mono">Tự cuộn 5s</span>
                  </div>

                  <div className="space-y-2 max-h-[300px] sm:max-h-[360px] lg:max-h-[390px] overflow-y-auto pr-1 custom-scrollbar">
                    {filteredVideos.map((vid, idx) => {
                      const isActive = idx === activeVideoIndex % totalVideos;
                      const fallbackImg =
                        FEATURED_PROJECT_IMAGES[idx % Math.max(1, FEATURED_PROJECT_IMAGES.length)]?.url;

                      return (
                        <button
                          key={vid.id}
                          onClick={() => {
                            setActiveVideoIndex(idx);
                            setIsVideoPlaying(true);
                          }}
                          className={`w-full text-left p-2 sm:p-2.5 rounded-xl border transition-all flex items-center gap-2.5 sm:gap-3 ${
                            isActive
                              ? 'bg-cyan-50 border-cyan-500 shadow-sm dark:bg-cyan-500/20 dark:border-cyan-400 dark:shadow-md'
                              : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-800 dark:border-white/5 dark:bg-slate-900/70 dark:hover:bg-slate-900 dark:hover:border-white/15 dark:text-slate-200'
                          }`}
                        >
                          <div className="relative w-16 h-11 min-w-[64px] rounded-lg overflow-hidden bg-black shrink-0 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                            <img
                              src={vid.thumbnail || fallbackImg}
                              alt=""
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                if (fallbackImg && (e.target as HTMLImageElement).src !== fallbackImg) {
                                  (e.target as HTMLImageElement).src = fallbackImg;
                                }
                              }}
                            />
                            {isActive ? (
                              <div className="absolute inset-0 bg-primary-500/30 flex items-center justify-center">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary-400 animate-ping" />
                              </div>
                            ) : (
                              <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                                <Play className="w-3 h-3 text-white fill-white" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <p
                                className={`text-xs font-semibold truncate ${
                                  isActive ? 'text-cyan-700 font-bold dark:text-cyan-300' : 'text-slate-900 dark:text-slate-100'
                                }`}
                              >
                                {vid.title}
                              </p>
                              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
                                {vid.location}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate mt-0.5">
                              {vid.specs}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. FULL GRID VIEW FOR VIDEOS */}
          {isVideoGridView && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredVideos.slice(0, visibleVideoCount).map((vid, idx) => {
                  const fallbackImg =
                    FEATURED_PROJECT_IMAGES[idx % Math.max(1, FEATURED_PROJECT_IMAGES.length)]?.url;

                  return (
                    <motion.div
                      key={vid.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: (idx % 6) * 0.04 }}
                      className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-cyan-500 transition-all shadow-md hover:shadow-xl dark:border-white/10 dark:bg-slate-900/90 dark:hover:border-primary-500/60 cursor-pointer"
                      onClick={() => {
                        const originalIdx = filteredVideos.findIndex((v) => v.id === vid.id);
                        setActiveVideoIndex(originalIdx !== -1 ? originalIdx : 0);
                        setIsVideoGridView(false);
                        setIsVideoPlaying(true);
                      }}
                    >
                      <div className="aspect-video w-full overflow-hidden bg-black relative">
                        <img
                          src={vid.thumbnail || fallbackImg}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            if (fallbackImg && (e.target as HTMLImageElement).src !== fallbackImg) {
                              (e.target as HTMLImageElement).src = fallbackImg;
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px]">
                          <span className="px-2 py-0.5 rounded-full bg-cyan-600/90 backdrop-blur-md text-white font-mono font-medium">
                            {vid.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-slate-200 font-mono">
                            {vid.location}
                          </span>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-brand-cyan to-blue-600 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 ml-0.5 fill-current" />
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 border-t border-slate-100 dark:bg-slate-900/90 dark:border-white/5">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-cyan-600 dark:group-hover:text-primary-300">
                          {vid.title}
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono truncate mt-1">
                          {vid.specs}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {visibleVideoCount < filteredVideos.length && (
                <div className="text-center pt-2">
                  <button
                    onClick={() => setVisibleVideoCount((prev) => prev + 12)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-600 text-slate-950 text-xs font-bold shadow-md hover:brightness-110 transition-all hover:scale-105"
                  >
                    <span>Xem thêm 12 video tiếp theo (Còn {filteredVideos.length - visibleVideoCount} video)</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* PART 2: COMPREHENSIVE PROJECT IMAGE GALLERY (179+ REAL PHOTOS) */}
        {/* ========================================================================= */}
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-xl backdrop-blur-xl relative space-y-5 sm:space-y-6 dark:border-white/10 dark:bg-[#071124]/90 dark:shadow-2xl">
          {/* Header row for Images Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-slate-200 dark:border-surface-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-accent-400 shrink-0">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">Hình Ảnh Công Trình Thực Tế</span>
                  <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-cyan-100 text-cyan-800 border border-cyan-300 font-bold dark:bg-accent-500/20 dark:text-accent-300 dark:border-accent-500/30">
                    {FEATURED_PROJECT_IMAGES.length} Ảnh Đã Tải Lên
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                  Tổng hợp {FEATURED_PROJECT_IMAGES.length} hình ảnh thực tế thi công khung, module LED, tủ điện Meanwell & nghiệm thu tại 34+ tỉnh thành
                </p>
              </div>
            </div>

            {/* View Mode & Carousel Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setIsGridView(!isGridView)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  isGridView
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-sm font-bold'
                    : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-950 dark:border-surface-700 dark:bg-surface-800/80 dark:hover:bg-surface-700 dark:text-slate-300'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isGridView ? 'Thu gọn Spotlight' : 'Xem Lưới Đầy Đủ 179 Ảnh'}</span>
                <span className="sm:hidden">{isGridView ? 'Spotlight' : 'Lưới'}</span>
              </button>

              {!isGridView && (
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-100 text-xs font-mono text-slate-700 dark:border-surface-700/50 dark:bg-surface-800/60 dark:text-slate-300">
                    <span>{totalImages > 0 ? (activeImageIndex % totalImages) + 1 : 0}/{totalImages}</span>
                  </div>
                  <button
                    onClick={prevImage}
                    className="p-1.5 sm:p-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-surface-700 dark:bg-surface-800 dark:hover:bg-surface-700 dark:text-slate-300 dark:hover:text-white transition-colors"
                    title="Ảnh trước"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="p-1.5 sm:p-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-surface-700 dark:bg-surface-800 dark:hover:bg-surface-700 dark:text-slate-300 dark:hover:text-white transition-colors"
                    title="Ảnh kế tiếp"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {imageCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveImageCategory(cat);
                  setActiveImageIndex(0);
                  setVisibleGridCount(16);
                }}
                className={`whitespace-nowrap px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  activeImageCategory === cat
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm font-semibold'
                    : 'border-slate-200 bg-slate-100/80 text-slate-700 hover:text-slate-950 hover:bg-slate-200 dark:border-surface-700/40 dark:bg-surface-800/50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-surface-800'
                }`}
              >
                {cat === 'all' ? `Tất cả (${FEATURED_PROJECT_IMAGES.length})` : cat}
              </button>
            ))}
          </div>

          {/* 1. AUTO-SCROLL SPOTLIGHT VIEW */}
          {!isGridView && (
            <div
              className="space-y-4"
              onMouseEnter={() => setIsImageAutoPaused(true)}
              onMouseLeave={() => setIsImageAutoPaused(false)}
            >
              <div className="w-full bg-slate-200 dark:bg-surface-800/80 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  key={activeImageIndex}
                  initial={{ width: '0%' }}
                  animate={{ width: isImageAutoPaused ? '100%' : '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <AnimatePresence mode="popLayout">
                  {visibleCarouselImages.map((img, idx) => (
                    <motion.div
                      key={`${img.id}-${activeImageIndex}-${idx}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-cyan-500 transition-all shadow-md hover:shadow-xl dark:border-white/10 dark:bg-slate-900/90 dark:hover:border-cyan-400/50 cursor-pointer"
                      onClick={() => {
                        const originalIndex = filteredImages.findIndex((i) => i.id === img.id);
                        handleOpenLightbox(originalIndex !== -1 ? originalIndex : 0);
                      }}
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                        <img
                          src={img.url}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                        <div className="absolute top-2 left-2 right-2 sm:top-2.5 sm:left-2.5 sm:right-2.5 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/75 backdrop-blur-md text-cyan-300 border border-white/15 truncate max-w-[140px]">
                            {img.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/75 backdrop-blur-md text-slate-200 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-cyan-400" />
                            {img.location}
                          </span>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-brand-cyan to-blue-600 text-slate-950 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                        </div>
                      </div>

                      <div className="p-3 sm:p-3.5 bg-slate-50 border-t border-slate-100 dark:bg-slate-900/90 dark:border-white/5">
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-relaxed group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {img.title}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setIsGridView(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl border border-cyan-500/40 bg-cyan-50 text-cyan-800 hover:bg-cyan-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-all shadow-sm"
                >
                  <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Mở rộng xem toàn bộ {FEATURED_PROJECT_IMAGES.length} hình ảnh thực tế</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 2. FULL GRID VIEW FOR IMAGES */}
          {isGridView && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredImages.slice(0, visibleGridCount).map((img, idx) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: (idx % 12) * 0.03 }}
                    className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-cyan-500 transition-all shadow-md hover:shadow-xl dark:border-white/10 dark:bg-slate-900/90 dark:hover:border-cyan-400/50 cursor-pointer"
                    onClick={() => handleOpenLightbox(idx)}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                      <img
                        src={img.url}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                      <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between text-[10px]">
                        <span className="px-2 py-0.5 rounded-full bg-black/75 text-cyan-300 font-mono truncate max-w-[100px] border border-white/10">
                          {img.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-black/75 text-slate-200 font-mono border border-white/10">
                          {img.location}
                        </span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-cyan to-blue-600 text-slate-950 flex items-center justify-center shadow-lg">
                          <Eye className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="p-2 sm:p-2.5 bg-slate-50 border-t border-slate-100 dark:bg-slate-900/90 dark:border-white/5">
                      <p className="text-[11px] font-bold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                        {img.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {visibleGridCount < filteredImages.length && (
                <div className="text-center pt-2 sm:pt-4">
                  <button
                    onClick={() => setVisibleGridCount((prev) => prev + 24)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-600 text-slate-950 text-xs font-bold shadow-md hover:brightness-110 transition-all hover:scale-105"
                  >
                    <span>Xem thêm 24 ảnh tiếp theo (Còn {filteredImages.length - visibleGridCount} ảnh)</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Lightbox Modal for High-Res Image View with Next/Prev Controls */}
        <AnimatePresence>
          {currentLightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
              onClick={() => setLightboxIndex(null)}
            >
              <div
                className="relative max-w-5xl w-full bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video sm:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src={currentLightboxImage.url}
                    alt=""
                    className="w-full h-full object-contain"
                  />

                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 rounded-full bg-black/70 text-white hover:bg-black border border-white/20 transition-colors z-10"
                    title="Đóng (ESC)"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  <button
                    onClick={handlePrevLightbox}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-all z-10 hover:scale-110"
                    title="Ảnh trước"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  <button
                    onClick={handleNextLightbox}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-all z-10 hover:scale-110"
                    title="Ảnh tiếp theo"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-2.5 py-1 rounded-full bg-black/70 text-white text-[11px] sm:text-xs font-mono border border-white/20">
                    {lightboxIndex !== null ? lightboxIndex + 1 : 0} / {totalImages}
                  </div>
                </div>

                <div className="p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-slate-900 border-t border-white/10">
                  <div>
                    <span className="text-[11px] sm:text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      {currentLightboxImage.category} · {currentLightboxImage.location}
                    </span>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mt-0.5">
                      {currentLightboxImage.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold self-end sm:self-auto transition-colors"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
