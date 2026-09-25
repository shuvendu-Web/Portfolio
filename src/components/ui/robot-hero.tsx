"use client";

import React, { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { FolderGit2, ArrowRight, ArrowUpRight, FileText, Download } from "lucide-react";
import { WhatsappIcon } from "@/components/ui/SocialIcons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { AIChatInput } from "@/components/ui/ai-chat-input";

class HeartCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    t = t * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    return optionalTarget.set(x * 0.002, (y + 6) * 0.002, 0);
  }
}

const sharedHeartCurve = new HeartCurve();

function ResponsiveGroup({
  children,
  scale = 1,
}: {
  children: React.ReactNode;
  scale?: number;
}) {
  const { viewport } = useThree();
  const width = viewport.width || 4.0;
  const s = Math.max(0.7, Math.min(1.15, width / 3.2)) * scale;
  return <group scale={s}>{children}</group>;
}

function GlassCapsule({
  color,
  power,
  intensity,
}: {
  color: string;
  power: number;
  intensity: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      color: { value: new THREE.Color("#ffffff") },
      power: { value: 2.5 },
      intensity: { value: 0.6 },
    }),
    [],
  );

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.color.value.set(color);
      materialRef.current.uniforms.power.value = power;
      materialRef.current.uniforms.intensity.value = intensity;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[0.3, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform float power;
          uniform float intensity;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
            fresnel = pow(fresnel, power);
            gl_FragColor = vec4(color, fresnel * intensity);
          }
        `}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

const earBaseMat = new THREE.MeshStandardMaterial({
  color: "#f0f0f0",
  roughness: 0.5,
});
const earRingMat = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0.3,
});
const earCenterMat = new THREE.MeshStandardMaterial({
  color: "#cccccc",
  roughness: 0.8,
});
const antennaBaseMat = new THREE.MeshStandardMaterial({
  color: "#999999",
  roughness: 0.4,
  metalness: 0.5,
});
const antennaStickMat = new THREE.MeshStandardMaterial({
  color: "#d0d0d0",
  roughness: 0.4,
  metalness: 0.2,
});
const antennaTipMat = new THREE.MeshStandardMaterial({
  color: "#ff3366",
  roughness: 0.2,
  toneMapped: false,
});

function RobotEar({
  position,
  scale = 1,
  isLeft = false,
}: {
  position: [number, number, number];
  scale?: number;
  isLeft?: boolean;
}) {
  const dir = isLeft ? -1 : 1;

  return (
    <group position={position} scale={scale}>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earBaseMat}
      >
        <cylinderGeometry args={[0.04, 0.04, 0.025, 32]} />
      </mesh>

      <mesh
        position={[dir * 0.012, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earRingMat}
      >
        <torusGeometry args={[0.032, 0.008, 16, 32]} />
      </mesh>

      <mesh
        position={[dir * 0.012, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earCenterMat}
      >
        <cylinderGeometry args={[0.03, 0.03, 0.005, 32]} />
      </mesh>

      <group position={[dir * 0.015, 0.035, 0]} rotation={[-0.4, 0, 0]}>
        <mesh
          position={[0, 0.01, 0]}
          castShadow
          receiveShadow
          material={antennaBaseMat}
        >
          <cylinderGeometry args={[0.006, 0.008, 0.02, 16]} />
        </mesh>
        <mesh
          position={[0, 0.06, 0]}
          castShadow
          receiveShadow
          material={antennaStickMat}
        >
          <cylinderGeometry args={[0.003, 0.003, 0.1, 8]} />
        </mesh>
        <mesh
          position={[0, 0.11, 0]}
          castShadow
          receiveShadow
          material={antennaTipMat}
        >
          <sphereGeometry args={[0.006, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

const eyeMat = new THREE.MeshBasicMaterial({
  color: new THREE.Color(2, 2, 2),
  toneMapped: false,
  transparent: true,
});
const heartMat = new THREE.MeshBasicMaterial({
  color: "#ff3366",
  toneMapped: false,
});

function RobotEye({
  position,
  rotation,
  scale = 1,
  blinkDuration = 0.15,
  blinkCycle = 3.0,
  isLovedRef,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  blinkDuration?: number;
  blinkCycle?: number;
  isLovedRef: React.MutableRefObject<boolean>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const normalEyesRef = useRef<THREE.Group>(null);
  const heartEyeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !normalEyesRef.current || !heartEyeRef.current)
      return;

    const isHeart = isLovedRef.current;

    normalEyesRef.current.visible = !isHeart;
    heartEyeRef.current.visible = isHeart;

    const cycle = clock.getElapsedTime() % blinkCycle;

    let targetScaleY = 1;

    if (cycle < blinkDuration && !isHeart) {
      const progress = cycle / blinkDuration;
      const blinkClose = Math.sin(progress * Math.PI);

      targetScaleY = Math.max(0.05, 1.0 - blinkClose);
    }

    groupRef.current.scale.set(scale, scale * targetScaleY, scale);
  });

  const { topPath, bottomPath } = useMemo(() => {
    const w = 0.025;
    const h = 0.035;
    const r = 0.02;
    const g = 0.005;

    const tPath = new THREE.CurvePath<THREE.Vector3>();
    tPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(-w, g, 0),
        new THREE.Vector3(-w, h - r, 0),
      ),
    );
    tPath.add(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-w, h - r, 0),
        new THREE.Vector3(-w, h, 0),
        new THREE.Vector3(-w + r, h, 0),
      ),
    );
    tPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(-w + r, h, 0),
        new THREE.Vector3(w - r, h, 0),
      ),
    );
    tPath.add(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(w - r, h, 0),
        new THREE.Vector3(w, h, 0),
        new THREE.Vector3(w, h - r, 0),
      ),
    );
    tPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(w, h - r, 0),
        new THREE.Vector3(w, g, 0),
      ),
    );

    const bPath = new THREE.CurvePath<THREE.Vector3>();
    bPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(-w, -g, 0),
        new THREE.Vector3(-w, -(h - r), 0),
      ),
    );
    bPath.add(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-w, -(h - r), 0),
        new THREE.Vector3(-w, -h, 0),
        new THREE.Vector3(-w + r, -h, 0),
      ),
    );
    bPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(-w + r, -h, 0),
        new THREE.Vector3(w - r, -h, 0),
      ),
    );
    bPath.add(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(w - r, -h, 0),
        new THREE.Vector3(w, -h, 0),
        new THREE.Vector3(w, -(h - r), 0),
      ),
    );
    bPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(w, -(h - r), 0),
        new THREE.Vector3(w, -g, 0),
      ),
    );

    return { topPath: tPath, bottomPath: bPath };
  }, []);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh ref={heartEyeRef} visible={false} material={heartMat}>
        <tubeGeometry args={[sharedHeartCurve, 64, 0.0035, 8, true]} />
      </mesh>

      <group ref={normalEyesRef}>
        <mesh material={eyeMat}>
          <tubeGeometry args={[topPath, 20, 0.0035, 8, false]} />
        </mesh>
        <mesh material={eyeMat}>
          <tubeGeometry args={[bottomPath, 20, 0.0035, 8, false]} />
        </mesh>
      </group>
    </group>
  );
}

function createSyncPbrTextures(): {
  colorMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  const size = 256;
  const canvasC = document.createElement("canvas");
  const canvasB = document.createElement("canvas");
  canvasC.width = canvasB.width = size;
  canvasC.height = canvasB.height = size;
  const ctxC = canvasC.getContext("2d");
  const ctxB = canvasB.getContext("2d");

  if (ctxC && ctxB) {
    ctxC.fillStyle = "#dcdcdc";
    ctxC.fillRect(0, 0, size, size);
    ctxB.fillStyle = "#808080";
    ctxB.fillRect(0, 0, size, size);

    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = 0.5 + Math.random() * 1.5;
      const isDark = Math.random() > 0.15;

      ctxC.beginPath();
      ctxC.arc(x, y, r, 0, Math.PI * 2);
      ctxC.fillStyle = isDark ? "#222222" : "#dddddd";
      ctxC.fill();

      ctxB.beginPath();
      ctxB.arc(x, y, r, 0, Math.PI * 2);
      ctxB.fillStyle = isDark ? "#000000" : "#ffffff";
      ctxB.fill();
    }
  }

  const texC = new THREE.CanvasTexture(canvasC);
  const texB = new THREE.CanvasTexture(canvasB);
  texC.wrapS = texB.wrapS = THREE.RepeatWrapping;
  texC.wrapT = texB.wrapT = THREE.RepeatWrapping;
  texC.repeat.set(6, 3);
  texB.repeat.set(6, 3);
  texC.needsUpdate = true;
  texB.needsUpdate = true;

  return { colorMap: texC, bumpMap: texB };
}

function RobotPrototype({
  neckParams = {
    baseR: 0.25,
    baseH: -0.01,
    midR: 0.23,
    midH: 0.02,
    lipBottomR: 0.27,
    lipBottomH: 0.025,
    lipTopR: 0.28,
    lipTopH: 0.05,
    innerR: 0.24,
    innerDropH: 0.03,
  },
  bodyParams = { bodyBevelR: 0.21, bodyBevelY: 0.38, bodyBevelT: 0.015 },
  color = "#c4c4c4",
  pantallaColor = "#00ffc6",
  pantallaBrillo = 1.2,
  blinkCycle = 3.0,
  metalness = 0.0,
}: {
  neckParams?: Record<string, number>;
  bodyParams?: Record<string, number>;
  color?: string;
  pantallaColor?: string;
  pantallaBrillo?: number;
  blinkCycle?: number;
  metalness?: number;
}) {
  const isLovedRef = useRef(false);
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const textures = useMemo(() => createSyncPbrTextures(), []);

  const design = {
    pantallaColor: pantallaColor,
    pantallaGrosor: 3.8,
    pantallaBrillo: pantallaBrillo,
    separacionOjos: 0.07,
    tamañoOrejas: 1.3,
    escalaOjos: 1.1,
    parpadeoFrecuencia: blinkCycle,
    parpadeoDuracion: 0.45,
    colorChasis: color,
    alturaCabeza: 0.6,
  };

  const config = {
    moveSpeed: 0.35,
    bodyRotSpeed: 10.0,
    headRotSpeed: 20.0,
    bodyTiltX: 0.0,
    bodyTiltY: 0.95,
    headLookX: 0.3,
    headLookY: 1.8,
  };

  const introTimeRef = useRef(0);
  const INTRO_DURATION = 3.2; // 3.2s for 3 happy jumps + 1 full 360 rotation

  useFrame((state, delta) => {
    if (!bodyRef.current || !headRef.current) return;

    const dt = Math.min(delta, 0.1);

    // 1st View Intro Animation: 3 Happy Jumps + 1 Full 360° Rotation
    if (introTimeRef.current < INTRO_DURATION) {
      introTimeRef.current += dt;
      const progress = Math.min(1.0, introTimeRef.current / INTRO_DURATION);

      // Happy heart eye emotion during intro jumps
      isLovedRef.current = true;

      // 3 Happy Jumps (sinusoidal bounce arcs)
      const bounce = Math.abs(Math.sin(progress * Math.PI * 3));
      bodyRef.current.position.y = -0.3 + bounce * 0.45;

      // 1 Full 360° Rotation
      bodyRef.current.rotation.y = progress * Math.PI * 2;

      // Playful head tilt during jump
      headRef.current.rotation.x = Math.sin(progress * Math.PI * 6) * 0.15;
      headRef.current.rotation.y = Math.sin(progress * Math.PI * 3) * 0.2;

      // End of intro: clear heart eyes
      if (progress >= 1.0) {
        isLovedRef.current = false;
      }
    } else {
      // Interactive Mouse Tracking after intro finishes
      const tx = state.pointer.x;
      const ty = state.pointer.y;

      const maxMoveX = state.viewport.width / 3.5;
      const targetPosX = tx * maxMoveX;
      bodyRef.current.position.x = THREE.MathUtils.lerp(
        bodyRef.current.position.x,
        targetPosX,
        config.moveSpeed * dt,
      );

      bodyRef.current.position.y = THREE.MathUtils.lerp(
        bodyRef.current.position.y,
        -0.3,
        config.moveSpeed * dt * 2.0,
      );

      const relativeX = tx - bodyRef.current.position.x / 2.5;

      const bodyTargetRotY = -relativeX * config.bodyTiltY;
      const bodyTargetRotX = relativeX * relativeX * config.bodyTiltX - ty * 0.25;
      const bodyTargetRotZ = -relativeX * 0.15;

      bodyRef.current.rotation.y = THREE.MathUtils.lerp(
        bodyRef.current.rotation.y,
        bodyTargetRotY,
        config.bodyRotSpeed * dt,
      );
      bodyRef.current.rotation.x = THREE.MathUtils.lerp(
        bodyRef.current.rotation.x,
        bodyTargetRotX,
        config.bodyRotSpeed * dt,
      );
      bodyRef.current.rotation.z = THREE.MathUtils.lerp(
        bodyRef.current.rotation.z,
        bodyTargetRotZ,
        config.bodyRotSpeed * dt,
      );

      const headTargetRotY = relativeX * config.headLookY;
      const headTargetRotX = -ty * config.headLookX;

      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        headTargetRotY,
        config.headRotSpeed * dt,
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        headTargetRotX,
        config.headRotSpeed * dt,
      );
    }
  });

  const handlePointerDown = (
    e: import("@react-three/fiber").ThreeEvent<PointerEvent>,
  ) => {
    e.stopPropagation();
    introTimeRef.current = 0;
  };

  const neckProfile = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(neckParams.innerR, neckParams.baseH));
    points.push(new THREE.Vector2(neckParams.baseR, neckParams.baseH));
    points.push(new THREE.Vector2(neckParams.midR, neckParams.midH));
    points.push(new THREE.Vector2(neckParams.lipBottomR, neckParams.lipBottomH));
    points.push(new THREE.Vector2(neckParams.lipTopR, neckParams.lipTopH));
    points.push(new THREE.Vector2(neckParams.innerR, neckParams.lipTopH));
    points.push(
      new THREE.Vector2(
        neckParams.innerR,
        neckParams.lipTopH - neckParams.innerDropH,
      ),
    );
    return points;
  }, [neckParams]);

  const headMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#111111",
      roughness: 1.0,
      metalness: 0.0,
    });
  }, []);

  return (
    <group
      ref={bodyRef}
      position={[0, -0.3, 0]}
      onPointerDown={handlePointerDown}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <mesh castShadow receiveShadow>
        <sphereGeometry
          args={[0.43, 64, 64, 0, Math.PI * 2, Math.PI * 0.15, Math.PI * 0.85]}
        />
        <meshStandardMaterial
          color={design.colorChasis}
          map={textures.colorMap || undefined}
          bumpMap={textures.bumpMap || undefined}
          bumpScale={0.005}
          roughness={1.0}
          metalness={metalness}
          envMapIntensity={0.0}
        />
      </mesh>

      {bodyParams.bodyBevelT > 0 && (
        <mesh
          position={[0, bodyParams.bodyBevelY, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
        >
          <torusGeometry
            args={[bodyParams.bodyBevelR, bodyParams.bodyBevelT, 32, 64]}
          />
          <meshStandardMaterial
            color={design.colorChasis}
            map={textures.colorMap || undefined}
            bumpMap={textures.bumpMap || undefined}
            bumpScale={0.005}
            roughness={1.0}
            metalness={metalness}
            envMapIntensity={0.0}
          />
        </mesh>
      )}

      <mesh position={[0, 0.38, 0]} receiveShadow castShadow>
        <latheGeometry args={[neckProfile, 64]} />
        <meshStandardMaterial
          color={design.colorChasis}
          map={textures.colorMap || undefined}
          bumpMap={textures.bumpMap || undefined}
          bumpScale={0.005}
          roughness={1.0}
          metalness={metalness}
          envMapIntensity={0.0}
        />
      </mesh>

      <group ref={headRef} position={[0, design.alturaCabeza, 0]}>
        <mesh material={headMat} castShadow receiveShadow>
          <sphereGeometry args={[0.28, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
        </mesh>

        <GlassCapsule
          color={design.pantallaColor}
          power={design.pantallaGrosor}
          intensity={design.pantallaBrillo}
        />

        <group position={[0, -0.02, 0.29]}>
          <RobotEye
            position={[-design.separacionOjos, 0, 0]}
            rotation={[0, -0.2, 0]}
            scale={design.escalaOjos}
            blinkDuration={design.parpadeoDuracion}
            blinkCycle={design.parpadeoFrecuencia}
            isLovedRef={isLovedRef}
          />
          <RobotEye
            position={[design.separacionOjos, 0, 0]}
            rotation={[0, 0.2, 0]}
            scale={design.escalaOjos}
            blinkDuration={design.parpadeoDuracion}
            blinkCycle={design.parpadeoFrecuencia}
            isLovedRef={isLovedRef}
          />
        </group>

        <RobotEar
          position={[-0.29, 0, 0]}
          isLeft={true}
          scale={design.tamañoOrejas}
        />
        <RobotEar
          position={[0.29, 0, 0]}
          isLeft={false}
          scale={design.tamañoOrejas}
        />
      </group>
    </group>
  );
}

export interface RobotHeroProps {
  backgroundText?: string;
  subtitle?: string;
  color?: string;
  scale?: number;
  pantallaColor?: string;
  pantallaBrillo?: number;
  blinkCycle?: number;
  metalness?: number;
}

export function RobotHero({
  backgroundText = "SHUVENDU DHENKI",
  subtitle = "UI/UX Consultant & Frontend Developer",
  color = "#c4c4c4",
  scale = 1,
  pantallaColor = "#00f0ff",
  pantallaBrillo = 1.2,
  blinkCycle = 3.0,
  metalness = 0.0,
}: RobotHeroProps = {}) {
  const containerRef = useRef<HTMLElement>(null);

  const entorno = {
    fondoArriba: "#e0f2fe",
    fondoMedio: "#bae6fd",
    fondoAbajo: "#7dd3fc",
    luzAmbiente: 0.85,
    luzPrincipal: 0.6,
    luzPrincipalColor: "#38bdf8",
    luzRelleno: 0.3,
    luzRellenoColor: "#0ea5e9",
    sombraOpacidad: 0.75,
    sombraBlur: 1.8,
    sombraColor: "#0284c7",
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[500px] sm:min-h-[600px] overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${entorno.fondoArriba} 0%, ${entorno.fondoMedio} 45%, ${entorno.fondoAbajo} 100%)`,
      }}
    >
      {/* Background Typography - Sky Blue Glassmorphism */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-start pt-[15vh] sm:justify-center sm:pt-0 text-center pointer-events-none overflow-hidden px-4"
        style={{ zIndex: 0 }}
      >
        <h1
          className="font-sans font-black select-none whitespace-nowrap neu-hero-text text-center tracking-tight"
          style={{
            fontSize: "clamp(2.2rem, 7.5vw, 6.5rem)",
            lineHeight: 1,
          }}
        >
          {backgroundText}
        </h1>

        {subtitle && (
          <h2
            className="mt-3 sm:mt-4 font-mono font-extrabold tracking-[0.25em] uppercase select-none text-sky-800/80 text-center drop-shadow-sm"
            style={{
              fontSize: "clamp(0.7rem, 1.8vw, 1.15rem)",
              textShadow: "0 2px 10px rgba(255, 255, 255, 0.9)",
            }}
          >
            {subtitle}
          </h2>
        )}

      </div>

      {/* AI Chat Input Component */}
      <div className={`absolute bottom-[140px] sm:bottom-32 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-20 pointer-events-auto`}>
        <AIChatInput />
      </div>

      {/* Extreme Bottom 3 Action Buttons - Glassmorphism & Neumorphism Hybrid Style */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-30 flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4 pointer-events-auto scale-90 sm:scale-100 origin-bottom">
        {/* Button 1: View Projects - Sky Blue Glassmorphism & Neumorphism */}
        <a
          href="#projects"
          className="neu-glass-btn neu-glass-sky group"
        >
          <FolderGit2 className="w-4.5 h-4.5 text-sky-700 group-hover:scale-110 transition-transform" />
          <span className="font-extrabold text-sky-900 tracking-wide">View Projects</span>
          <ArrowRight className="w-4 h-4 text-sky-700 group-hover:translate-x-1 transition-transform" />
        </a>

        {/* Button 2: Let's Chat - WhatsApp Teal #128c7e Glassmorphism & Neumorphism */}
        <a
          href={PORTFOLIO_DATA.personal.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="neu-glass-btn neu-glass-whatsapp group"
        >
          <WhatsappIcon className="w-4.5 h-4.5 text-[#128c7e] group-hover:scale-110 transition-transform" />
          <span className="font-extrabold text-[#0b544b] tracking-wide">Let's Chat</span>
          <ArrowUpRight className="w-4 h-4 text-[#128c7e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        {/* Button 3: Download CV - Emerald Mint Glassmorphism & Neumorphism */}
        <a
          href={PORTFOLIO_DATA.personal.resumeUrl}
          download="Shuvendu_Dhenki_Resume_Ui.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="neu-glass-btn neu-glass-emerald group cursor-pointer"
        >
          <FileText className="w-4.5 h-4.5 text-emerald-700 group-hover:scale-110 transition-transform" />
          <span className="font-extrabold text-emerald-950 tracking-wide">Download CV</span>
          <Download className="w-4 h-4 text-emerald-700 group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* 3D Interactive Canvas Scene */}
      <div className="absolute inset-0 z-10">
        <Canvas
          shadows
          camera={{ position: [0, 0.2, 5.8], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={1.0} color="#ffffff" />
          <hemisphereLight intensity={0.9} color="#ffffff" groundColor="#38bdf8" />
          
          <directionalLight
            position={[0, 6, 3]}
            intensity={1.2}
            color={entorno.luzPrincipalColor}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0005}
          >
            <orthographicCamera
              attach="shadow-camera"
              args={[-1.5, 1.5, 1.5, -1.5, 0.1, 20]}
            />
          </directionalLight>

          <directionalLight
            position={[-5, 2, -5]}
            intensity={0.6}
            color={entorno.luzRellenoColor}
          />

          <pointLight position={[3, 4, 4]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-3, -2, 2]} intensity={0.8} color="#00f0ff" />

          <Suspense fallback={null}>
            <Environment preset="studio" blur={0.5} />
          </Suspense>

          <ResponsiveGroup scale={scale}>
            <ContactShadows
              position={[0, -0.79, 0]}
              opacity={entorno.sombraOpacidad}
              scale={15}
              resolution={1024}
              blur={entorno.sombraBlur}
              far={2.5}
              color={entorno.sombraColor}
            />
            <Suspense fallback={null}>
              <RobotPrototype
                neckParams={{
                  baseR: 0.215,
                  baseH: -0.05,
                  midR: 0.28,
                  midH: 0.02,
                  lipBottomR: 0.295,
                  lipBottomH: 0.045,
                  lipTopR: 0.27,
                  lipTopH: 0.055,
                  innerR: 0.1,
                  innerDropH: 0.0,
                }}
                bodyParams={{
                  bodyBevelR: 0.235,
                  bodyBevelY: 0.34,
                  bodyBevelT: 0.025,
                }}
                color={color}
                pantallaColor={pantallaColor}
                pantallaBrillo={pantallaBrillo}
                blinkCycle={blinkCycle}
                metalness={metalness}
              />
            </Suspense>
          </ResponsiveGroup>
        </Canvas>
      </div>
    </section>
  );
}

export default RobotHero;
