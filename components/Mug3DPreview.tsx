"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { ProductArt } from "./ProductArt";

export type MugGlaze = { id: string; label: string; hex: string; dark: boolean };
export type MugInk = { id: string; label: string; hex: string };
export type MugFont = "roman" | "serif" | "sans";
export type MugWrap = "front" | "both" | "full";
export type MugPhotoFit = "contain" | "cover";

export const MUG_GLAZES: MugGlaze[] = [
  { id: "cream", label: "Aged Vellum", hex: "#F5ECDC", dark: false },
  { id: "stoneware", label: "Judean Clay", hex: "#D9C7AB", dark: false },
  { id: "pine", label: "Galilee Cypress", hex: "#1E3526", dark: true },
  { id: "velvet", label: "Crimson Wax", hex: "#841C21", dark: true },
  { id: "navy", label: "Midnight Indigo", hex: "#1B263B", dark: true },
];

export const MUG_INKS: MugInk[] = [
  { id: "pine", label: "Cypress Green", hex: "#1E3526" },
  { id: "velvet", label: "Crimson Wax", hex: "#841C21" },
  { id: "gold", label: "Illuminated Gold", hex: "#C29338" },
  { id: "ivory", label: "Parchment Ivory", hex: "#F7EFE0" },
  { id: "espresso", label: "Iron-Gall Ink", hex: "#241D17" },
];

export type Mug3DPreviewProps = {
  text: string;
  photoUrl?: string;
  glazeHex: string;
  inkHex: string;
  fontStyle: MugFont;
  wrapMode: MugWrap;
  photoFit: MugPhotoFit;
  photoScale: number; // 0.6 to 1.0
  showCross: boolean;
};

// Exact physical cylinder aspect ratio: circumference (2 * PI * 0.8625 = 5.4192) / height (1.66) = 3.2646
// Using 2400 x 735 guarantees 1:1 zero-distortion texel aspect ratio around the curved ceramic wall.
const MUG_RADIUS = 0.86;
const SLEEVE_RADIUS = MUG_RADIUS + 0.0025;
const SLEEVE_HEIGHT = 1.66;
const CANVAS_W = 2400;
const CANVAS_H = Math.round(CANVAS_W / ((2 * Math.PI * SLEEVE_RADIUS) / SLEEVE_HEIGHT)); // 735

export function Mug3DPreview({
  text,
  photoUrl,
  glazeHex,
  inkHex,
  fontStyle,
  wrapMode,
  photoFit,
  photoScale,
  showCross,
}: Mug3DPreviewProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [autoSpin, setAutoSpin] = useState(false);

  const apiRef = useRef<{
    glazeMat: THREE.MeshPhysicalMaterial;
    printCanvas: HTMLCanvasElement;
    printTex: THREE.CanvasTexture;
    controls: OrbitControls;
    camera: THREE.PerspectiveCamera;
    setAngle: (azimuth: number, polar?: number) => void;
  } | null>(null);
  const autoSpinRef = useRef(autoSpin);
  const loadedPhotoRef = useRef<{ url: string; img: HTMLImageElement } | null>(null);

  useEffect(() => {
    autoSpinRef.current = autoSpin;
  }, [autoSpin]);

  useEffect(() => {
    const container = hostRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setWebglFailed(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.setSize(container.clientWidth || 480, container.clientHeight || 440, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "none";
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    scene.environmentIntensity = 0.62;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 440;
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 30);
    camera.position.set(0.18, 0.62, 4.35);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.065;
    controls.enablePan = false;
    controls.minDistance = 3.1;
    controls.maxDistance = 6.2;
    controls.minPolarAngle = Math.PI * 0.22;
    controls.maxPolarAngle = Math.PI * 0.68;
    controls.target.set(0.08, 0.02, 0);
    controls.update();

    const ambient = new THREE.AmbientLight(0xfff8ee, 0.45);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff6e8, 1.35);
    keyLight.position.set(-3.4, 4.2, 3.6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf6efe4, 0.55);
    fillLight.position.set(3.2, 1.8, 2.2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffe6bd, 0.65);
    rimLight.position.set(1.5, 2.8, -3.5);
    scene.add(rimLight);

    const mugGroup = new THREE.Group();
    scene.add(mugGroup);

    const profile: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -0.99),
      new THREE.Vector2(0.64, -0.99),
      new THREE.Vector2(0.73, -1.03),
      new THREE.Vector2(0.79, -1.03),
      new THREE.Vector2(0.845, -0.96),
      new THREE.Vector2(MUG_RADIUS, -0.84),
      new THREE.Vector2(MUG_RADIUS, 0.94),
      new THREE.Vector2(0.855, 1.005),
      new THREE.Vector2(0.822, 1.035),
      new THREE.Vector2(0.788, 1.005),
      new THREE.Vector2(0.775, 0.92),
      new THREE.Vector2(0.768, -0.86),
      new THREE.Vector2(0.70, -0.93),
      new THREE.Vector2(0.0, -0.935),
    ];
    const bodyGeo = new THREE.LatheGeometry(profile, 80);
    bodyGeo.computeVertexNormals();

    const glazeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(glazeHex),
      roughness: 0.14,
      metalness: 0.02,
      clearcoat: 0.88,
      clearcoatRoughness: 0.11,
      reflectivity: 0.85,
    });

    const bodyMesh = new THREE.Mesh(bodyGeo, glazeMat);
    mugGroup.add(bodyMesh);

    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.80, 0.56, 0),
      new THREE.Vector3(1.16, 0.59, 0),
      new THREE.Vector3(1.37, 0.34, 0),
      new THREE.Vector3(1.39, -0.02, 0),
      new THREE.Vector3(1.33, -0.39, 0),
      new THREE.Vector3(1.14, -0.60, 0),
      new THREE.Vector3(0.80, -0.56, 0),
    ]);
    const handleGeo = new THREE.TubeGeometry(handleCurve, 56, 0.092, 24, false);
    const handleMesh = new THREE.Mesh(handleGeo, glazeMat);
    mugGroup.add(handleMesh);

    const printCanvas = document.createElement("canvas");
    printCanvas.width = CANVAS_W;
    printCanvas.height = CANVAS_H;

    const printTex = new THREE.CanvasTexture(printCanvas);
    printTex.colorSpace = THREE.SRGBColorSpace;
    printTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

    // Seam tucked invisibly behind handle at +X (phiStart = PI/2); u=0.75 faces +Z front, u=0.50 faces -X (opposite handle), u=0.25 faces -Z back
    const sleeveGeo = new THREE.CylinderGeometry(
      SLEEVE_RADIUS,
      SLEEVE_RADIUS,
      SLEEVE_HEIGHT,
      96,
      1,
      true,
      Math.PI / 2,
      Math.PI * 2,
    );

    const sleeveMat = new THREE.MeshPhysicalMaterial({
      map: printTex,
      transparent: true,
      roughness: 0.16,
      metalness: 0.02,
      clearcoat: 0.86,
      clearcoatRoughness: 0.12,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    });

    const sleeveMesh = new THREE.Mesh(sleeveGeo, sleeveMat);
    sleeveMesh.position.y = 0.02;
    mugGroup.add(sleeveMesh);

    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext("2d")!;
    const grad = sctx.createRadialGradient(128, 128, 22, 128, 128, 122);
    grad.addColorStop(0, "rgba(29, 26, 22, 0.28)");
    grad.addColorStop(0.55, "rgba(29, 26, 22, 0.10)");
    grad.addColorStop(1, "rgba(29, 26, 22, 0)");
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0.12, -1.035, 0);
    scene.add(shadowMesh);

    let tweenTarget: { azimuth: number; polar: number; dist: number } | null = null;
    const setAngle = (azimuth: number, polar = 1.41) => {
      const offset = camera.position.clone().sub(controls.target);
      tweenTarget = { azimuth, polar, dist: offset.length() };
    };

    const stopTween = () => {
      tweenTarget = null;
    };
    controls.addEventListener("start", stopTween);

    apiRef.current = { glazeMat, printCanvas, printTex, controls, camera, setAngle };

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect || rect.width < 10 || rect.height < 10) return;
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height, false);
    });
    ro.observe(container);

    const clock = new THREE.Clock();
    let rafId = 0;
    const spherical = new THREE.Spherical();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);

      if (tweenTarget) {
        const offset = camera.position.clone().sub(controls.target);
        spherical.setFromVector3(offset);
        let dAz = tweenTarget.azimuth - spherical.theta;
        while (dAz > Math.PI) dAz -= Math.PI * 2;
        while (dAz < -Math.PI) dAz += Math.PI * 2;
        spherical.theta += dAz * Math.min(1, dt * 8);
        spherical.phi += (tweenTarget.polar - spherical.phi) * Math.min(1, dt * 8);
        spherical.radius += (tweenTarget.dist - spherical.radius) * Math.min(1, dt * 8);
        camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
        if (Math.abs(dAz) < 0.008 && Math.abs(tweenTarget.polar - spherical.phi) < 0.008) {
          tweenTarget = null;
        }
      } else if (autoSpinRef.current) {
        mugGroup.rotation.y += dt * 0.55;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      controls.removeEventListener("start", stopTween);
      controls.dispose();
      bodyGeo.dispose();
      handleGeo.dispose();
      sleeveGeo.dispose();
      shadowGeo.dispose();
      glazeMat.dispose();
      sleeveMat.dispose();
      shadowMat.dispose();
      printTex.dispose();
      shadowTex.dispose();
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
      apiRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    api.glazeMat.color.set(glazeHex);
  }, [glazeHex]);

  // Smoothly turn the mug to face the active print center whenever wrap mode switches
  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    setAutoSpin(false);
    api.setAngle(wrapMode === "full" ? -Math.PI * 0.5 : 0.04, 1.41);
  }, [wrapMode]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;

    const redraw = (photoImg: HTMLImageElement | null) => {
      drawMugPrintCanvas(api.printCanvas, {
        text,
        photoImg,
        inkHex,
        fontStyle,
        wrapMode,
        photoFit,
        photoScale,
        showCross,
      });
      api.printTex.needsUpdate = true;
    };

    if (!photoUrl) {
      loadedPhotoRef.current = null;
      redraw(null);
      return;
    }

    if (loadedPhotoRef.current?.url === photoUrl) {
      redraw(loadedPhotoRef.current.img);
      return;
    }

    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      loadedPhotoRef.current = { url: photoUrl, img };
      redraw(img);
    };
    img.src = photoUrl;
    return () => {
      cancelled = true;
    };
  }, [text, photoUrl, inkHex, fontStyle, wrapMode, photoFit, photoScale, showCross]);

  if (webglFailed) {
    return <ProductArt art="mug" photo={photoUrl} text={text} />;
  }

  return (
    <div className="mug-3d-shell">
      <div
        ref={hostRef}
        className="mug-3d-canvas"
        role="img"
        aria-label={`Interactive 3D preview of custom printed ceramic mug${text ? ` reading “${text}”` : ""}`}
      />

      <div className="mug-3d-toolbar">
        <span className="mug-3d-hint">Drag to rotate 360° · Pinch or scroll to zoom</span>
        <div className="mug-3d-views">
          <button
            type="button"
            className="mug-view-btn"
            onClick={() => {
              setAutoSpin(false);
              apiRef.current?.setAngle(0.04, 1.41);
            }}
          >
            Front
          </button>
          <button
            type="button"
            className="mug-view-btn"
            onClick={() => {
              setAutoSpin(false);
              apiRef.current?.setAngle(-Math.PI * 0.5, 1.41);
            }}
          >
            Side Wrap
          </button>
          <button
            type="button"
            className="mug-view-btn"
            onClick={() => {
              setAutoSpin(false);
              apiRef.current?.setAngle(Math.PI, 1.41);
            }}
          >
            Back
          </button>
          <button
            type="button"
            className={autoSpin ? "mug-view-btn active" : "mug-view-btn"}
            aria-pressed={autoSpin}
            onClick={() => setAutoSpin((s) => !s)}
          >
            {autoSpin ? "Pause Spin" : "Spin 360°"}
          </button>
        </div>
      </div>
    </div>
  );
}

function drawMugPrintCanvas(
  canvas: HTMLCanvasElement,
  opts: {
    text: string;
    photoImg: HTMLImageElement | null;
    inkHex: string;
    fontStyle: MugFont;
    wrapMode: MugWrap;
    photoFit: MugPhotoFit;
    photoScale: number;
    showCross: boolean;
  },
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Cylinder UV mapping (phiStart = PI/2 behind handle):
  //   u = 0.00 / 1.00 -> +X (handle, keep unprinted margin ~10% each side)
  //   u = 0.25        -> -Z (back face)
  //   u = 0.50        -> -X (side directly opposite handle — center of full panoramic wrap!)
  //   u = 0.75        -> +Z (front face facing camera)
  const displayText = opts.text.trim();
  const isPlaceholder = !displayText && !opts.photoImg;
  const activeText = displayText || (isPlaceholder ? "Your Bible Verse or Name" : "");

  // In "full" wrap mode with a photo, center across the 270° printable zone opposite the handle,
  // or keep centered on the front (+Z) if aspect ratio fits comfortably on front-to-side!
  // Actually: centering at u=0.75 (+Z front) for front/both, and u=0.50 (-X opposite handle) for full 270° panoramic wrap
  // Wait: when the shopper looks at the mug from the default Front view (+Z), centering Full Wrap at u=0.75 would cross the handle at u=1.0!
  // Let's check exact distance from u=0.75 to handle (u=1.0): 0.25 * 2400 = 600px on the right, so max symmetric width centered at u=0.75 without hitting handle is ~960px (144°)!
  // Meanwhile centered at u=0.50 (-X opposite handle), distance to handle on BOTH left and right is 0.50 * 2400 = 1200px, giving a massive 1920px (288°) panoramic sublimation wrap!
  const isFullWrap = opts.wrapMode === "full";
  const centers = isFullWrap
    ? [0.5 * canvas.width]
    : opts.wrapMode === "both"
      ? [0.75 * canvas.width, 0.25 * canvas.width]
      : [0.75 * canvas.width];

  // Safe horizontal print width per face without ever clipping into the handle zone
  const maxZoneW = isFullWrap ? canvas.width * 0.76 : canvas.width * 0.36;
  const safePadY = 48;

  for (const cx of centers) {
    ctx.save();

    if (opts.photoImg) {
      const img = opts.photoImg;
      const scaleFactor = Math.max(0.55, Math.min(1, opts.photoScale));
      const availW = maxZoneW * scaleFactor;
      const availH = (activeText ? canvas.height * 0.58 : canvas.height - safePadY * 2) * scaleFactor;

      if (opts.photoFit === "contain") {
        // Aspect-ratio-preserving auto-fit: NEVER crops or distorts any user photo
        const fitScale = Math.min(availW / img.width, availH / img.height);
        const drawW = img.width * fitScale;
        const drawH = img.height * fitScale;
        const drawX = cx - drawW / 2;
        const drawY = activeText
          ? safePadY + (availH - drawH) / 2
          : (canvas.height - drawH) / 2;

        ctx.save();
        roundRectPath(ctx, drawX, drawY, drawW, drawH, 10);
        ctx.clip();
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
        ctx.restore();
      } else {
        // Framed Cover mode: fills an archival frame cleanly (user opt-in)
        const frameW = availW;
        const frameH = availH;
        const leftX = cx - frameW / 2;
        const topY = activeText ? safePadY : (canvas.height - frameH) / 2;

        ctx.save();
        roundRectPath(ctx, leftX, topY, frameW, frameH, 14);
        ctx.clip();
        const coverScale = Math.max(frameW / img.width, frameH / img.height);
        const dw = img.width * coverScale;
        const dh = img.height * coverScale;
        ctx.drawImage(img, cx - dw / 2, topY + (frameH - dh) / 2, dw, dh);
        ctx.restore();

        ctx.strokeStyle = opts.inkHex;
        ctx.globalAlpha = 0.32;
        ctx.lineWidth = 3.5;
        roundRectPath(ctx, leftX, topY, frameW, frameH, 14);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    } else if (opts.showCross) {
      const crossY = activeText ? 175 : canvas.height / 2;
      ctx.strokeStyle = opts.inkHex;
      ctx.globalAlpha = isPlaceholder ? 0.45 : 0.92;
      ctx.lineWidth = 6.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx, crossY - 40);
      ctx.lineTo(cx, crossY + 46);
      ctx.moveTo(cx - 28, crossY - 12);
      ctx.lineTo(cx + 28, crossY - 12);
      ctx.stroke();

      ctx.lineWidth = 2.2;
      ctx.globalAlpha = isPlaceholder ? 0.25 : 0.4;
      ctx.beginPath();
      ctx.moveTo(cx - 115, crossY + 4);
      ctx.lineTo(cx - 50, crossY + 4);
      ctx.moveTo(cx + 50, crossY + 4);
      ctx.lineTo(cx + 115, crossY + 4);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    if (activeText) {
      const fontFamily =
        opts.fontStyle === "roman"
          ? '"Cinzel", Georgia, serif'
          : opts.fontStyle === "serif"
            ? '"EB Garamond", Georgia, serif'
            : '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif';

      const renderedText = opts.fontStyle === "roman" ? activeText.toUpperCase() : activeText;
      const textMaxW = Math.min(maxZoneW - 36, 900);
      let fontSize = opts.photoImg ? 54 : renderedText.length <= 16 ? 88 : renderedText.length <= 34 ? 68 : 56;
      const weight = opts.fontStyle === "sans" ? "600" : "700";
      ctx.font = `${weight} ${fontSize}px ${fontFamily}`;

      let lines = wrapText(ctx, renderedText, textMaxW);
      while (lines.length > (opts.photoImg ? 2 : 4) && fontSize > 34) {
        fontSize -= 5;
        ctx.font = `${weight} ${fontSize}px ${fontFamily}`;
        lines = wrapText(ctx, renderedText, textMaxW);
      }

      const lineHeight = fontSize * 1.18;
      const totalH = lines.length * lineHeight;
      const baseCenterY = opts.photoImg ? canvas.height * 0.78 : opts.showCross ? 430 : canvas.height / 2;
      const startY = baseCenterY - totalH / 2 + lineHeight * 0.72;

      ctx.fillStyle = opts.inkHex;
      ctx.globalAlpha = isPlaceholder ? 0.38 : 0.95;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";

      lines.forEach((line, i) => {
        ctx.fillText(line, cx, startY + i * lineHeight);
      });
    }

    ctx.restore();
  }
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      if (ctx.measureText(word).width > maxWidth) {
        let chunk = "";
        for (const ch of word) {
          if (ctx.measureText(chunk + ch).width > maxWidth && chunk) {
            lines.push(chunk);
            chunk = ch;
          } else {
            chunk += ch;
          }
        }
        current = chunk;
      } else {
        current = word;
      }
    }
  }
  if (current) lines.push(current);
  return lines;
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
