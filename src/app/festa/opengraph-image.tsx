import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { FESTA } from "./config";

export const alt = `${FESTA.title}: ${FESTA.dateLabel}, ${FESTA.timeLabel}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The card WhatsApp shows when the invite link is shared. */
export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public", FESTA.heroPhoto.src));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const dots = [
    [520, 60, 70], [1100, 90, 50], [1080, 500, 90], [560, 520, 44], [820, 30, 34],
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(160deg, #f1ecfb 0%, #fbedef 45%, #fbf3e6 75%, #eaf2fc 100%)",
          color: "#2b2540",
          position: "relative",
          padding: "0 60px",
        }}
      >
        {dots.map(([x, y, s], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: s,
              height: s,
              borderRadius: s,
              background: "radial-gradient(circle at 32% 30%, #ffffff, #e2daf2 55%, #b9a5ee)",
              opacity: 0.8,
            }}
          />
        ))}
        <div
          style={{
            width: 400,
            height: 520,
            borderRadius: "200px 200px 32px 32px",
            border: "10px solid #ffffff",
            overflow: "hidden",
            display: "flex",
            boxShadow: "0 20px 50px rgba(91,74,158,0.25)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" width={1000} height={562} style={{ height: 520, width: 924, objectFit: "cover", marginLeft: -170 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 56, flex: 1 }}>
          <div style={{ fontSize: 40, color: "#5b4a9e", display: "flex" }}>oieee! esse é um convite pro</div>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, display: "flex", marginTop: 8 }}>
            {FESTA.title}
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 34,
              background: "#ffffff",
              borderRadius: 999,
              padding: "14px 30px",
              display: "flex",
              alignSelf: "flex-start",
            }}
          >
            {FESTA.dateLabel}, {FESTA.timeLabel}
          </div>
          <div style={{ marginTop: 18, fontSize: 28, color: "#5a5370", display: "flex" }}>
            confirma até {FESTA.deadlineLabel}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
