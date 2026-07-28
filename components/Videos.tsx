"use client";

import { useEffect, useState } from "react";
import { STR, useLang, lt } from "@/lib/i18n";
import type { Video } from "@/lib/types";
import Icon from "./Icon";
import SectionHead from "./SectionHead";

function VideoCard({ v, watch }: { v: Video; watch: string }) {
  const { lang } = useLang();
  const [playing, setPlaying] = useState(false);
  // maxresdefault is the sharpest 16:9 frame; fall back to hqdefault if absent.
  const [thumbHi, setThumbHi] = useState(true);
  const canPlay = Boolean(v.youtubeId);
  const thumb = v.youtubeId
    ? `https://img.youtube.com/vi/${v.youtubeId}/${thumbHi ? "maxresdefault" : "hqdefault"}.jpg`
    : "";

  return (
    <div className="card video-card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden", flexShrink: 0, background: "#000" }}>
        {playing && v.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
            title={lt(v, "title", lang)}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <button
            type="button"
            aria-label={`${watch}: ${lt(v, "title", lang)}`}
            onClick={() => {
              if (canPlay) setPlaying(true);
              else if (v.url) window.open(v.url, "_blank", "noopener");
            }}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              padding: 0, border: 0, cursor: "pointer", background: "#000",
            }}
          >
            {thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumb}
                alt={lt(v, "title", lang)}
                loading="lazy"
                onError={() => thumbHi && setThumbHi(false)}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : (
              <div className="ph" data-label={v.platform} style={{ position: "absolute", inset: 0 }} />
            )}
            <span
              style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.18)",
              }}
            >
              <span
                className="video-play"
                style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: "rgba(255,255,255,0.94)", color: "var(--accent)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)", paddingLeft: 4,
                }}
              >
                <Icon name="play" size={24} />
              </span>
            </span>
            <span
              className="mono"
              style={{
                position: "absolute", top: 10, left: 10,
                fontSize: 11, padding: "3px 8px", borderRadius: 999,
                background: "rgba(0,0,0,0.65)", color: "#fff", letterSpacing: "0.04em",
              }}
            >
              {v.platform}
            </span>
          </button>
        )}
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <h4 style={{ fontSize: 15, lineHeight: 1.35, fontWeight: 600, flex: 1 }}>
          {lt(v, "title", lang)}
        </h4>
        <div
          className="mono"
          style={{ fontSize: 12, color: "var(--ink-muted)", letterSpacing: "0.06em" }}
        >
          {lt(v, "date", lang)}
        </div>
      </div>
    </div>
  );
}

export default function Videos() {
  const { t } = useLang();
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(Array.isArray(data) ? data : []))
      .catch(() => setVideos([]));
  }, []);

  return (
    <section
      id="videos"
      className="section"
      style={{
        background: "var(--bg-soft)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="container-x">
        <SectionHead
          num="04"
          kicker={t(STR.videosKicker)}
          title={t(STR.videosTitle)}
          sub={t(STR.videosSub)}
        />

        {videos.length === 0 ? (
          <div
            style={{
              padding: 40, textAlign: "center", color: "var(--ink-muted)",
              fontSize: 14, border: "1px dashed var(--line)", borderRadius: 12,
            }}
          >
            {t(STR.videosEmpty)}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: 20,
            }}
          >
            {videos.map((v) => (
              <VideoCard key={v.id} v={v} watch={t(STR.videosWatch)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
