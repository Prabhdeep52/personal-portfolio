"use client";

import React, { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";

const COLOR_MAP: Record<number, string> = {
  0: "#161b22",
  1: "#0e4429",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
};

const GitHubContributionsChart: NextPage = () => {
  const username = "Prabhdeep52";
  const year = new Date().getFullYear().toString();
  const [data, setData] = useState<any | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const fetchContributions = async () => {
    try {
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`,
      );

      if (!res.ok) throw new Error("Failed to fetch contributions");

      const json = await res.json();

      if (!json || !json.contributions || !Array.isArray(json.contributions)) {
        throw new Error("Invalid data structure");
      }

      const formatted = json.contributions.map((item: any) => ({
        date: item.date,
        count: item.count,
        color: COLOR_MAP[item.level] || COLOR_MAP[0],
        intensity: item.level,
      }));

      setData({
        years: [{ year, total: json.total?.[year] || 0 }],
        contributions: formatted,
      });
    } catch (err) {
      console.warn("Contributions API unavailable, hiding chart.");
      setIsVisible(false);
      setData(null);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  useEffect(() => {
    if (!data || !canvasRef.current || !isVisible) return;

    (async () => {
      try {
        const mod = await import("github-contributions-canvas");
        const drawContributions = (mod as any).drawContributions;

        const tempCanvas = document.createElement("canvas");
        drawContributions(tempCanvas, {
          data,
          themeName: "githubDark",
          username: "",
          footerText: "",
          showMonthLabels: false,
          showDayLabels: false,
          showLegend: false,
        });

        const cropTop = 90;
        const cropBottom = 30;
        const cropLeft = 20;
        const cropRight = 150;

        const sx = cropLeft;
        const sy = cropTop;
        const sw = tempCanvas.width - cropLeft - cropRight;
        const sh = tempCanvas.height - cropTop - cropBottom;

        const croppedCanvas = document.createElement("canvas");
        croppedCanvas.width = sw;
        croppedCanvas.height = sh;

        const croppedCtx = croppedCanvas.getContext("2d");
        if (croppedCtx) {
          croppedCtx.drawImage(tempCanvas, sx, sy, sw, sh, 0, 0, sw, sh);
        }

        const mainCanvas = canvasRef.current;
        const mainCtx = mainCanvas?.getContext("2d");
        if (mainCanvas && mainCtx) {
          mainCanvas.width = sw;
          mainCanvas.height = sh;
          mainCtx.drawImage(croppedCanvas, 0, 0);
        }
      } catch {
        console.warn("Error drawing contributions chart — hiding component.");
        setIsVisible(false);
      }
    })();
  }, [data, isVisible]);

  // If API fails or no data, hide chart completely
  if (!isVisible || !data) {
    return <div style={{ padding: "12px" }} />; // maintain padding space
  }

  return (
    <div
      style={{
        backgroundColor: "#0d1117",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          maxWidth: "850px",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

export default GitHubContributionsChart;
