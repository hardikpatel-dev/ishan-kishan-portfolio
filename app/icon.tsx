import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#05070f",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#eaf0ff",
          fontFamily: "serif",
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        <span style={{ color: "#ff9933" }}>I</span>K
      </div>
    ),
    { ...size },
  );
}
