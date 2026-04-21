"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const COUNT = 20000;
const PARAMS: Record<string, number> = { orbscale: 6, uncert: 1, focus: 0, rotrate: 0.015 };
const addControl = (_id: string, _label: string, _min: number, _max: number, val: number) =>
  PARAMS[_id] ?? val;

export default function MobiusBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.01);

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 2000);
    camera.position.set(0, 0, 180);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(mount.clientWidth, mount.clientHeight),
      1.5, 0.4, 0.85
    );
    bloomPass.strength  = 1.8;
    bloomPass.radius    = 0.4;
    bloomPass.threshold = 0;
    composer.addPass(bloomPass);

    // Particles
    const dummy    = new THREE.Object3D();
    const color    = new THREE.Color();
    const target   = new THREE.Vector3();
    const geometry = new THREE.TetrahedronGeometry(0.25);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mesh     = new THREE.InstancedMesh(geometry, material, COUNT);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(mesh);

    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < COUNT; i++) {
      positions.push(new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
      ));
      mesh.setColorAt(i, color.setHex(0x00ff88));
    }

    // Animate
    const clock = new THREE.Clock();
    let raf: number;

    function animate() {
      raf = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      const orbScale  = addControl("orbscale", "", 1,   20,  6);
      const uncertCtl = addControl("uncert",   "", 0.1,  2.5, 1.0);
      const focusOrb  = addControl("focus",    "", 0,   14,  0);
      const rotRate   = addControl("rotrate",  "", 0,    1.5, 0.015);
      const NORB      = 14;
      const focusInt  = Math.round(focusOrb);

      for (let i = 0; i < COUNT; i++) {
        const orbG  = i % NORB;
        const shown = (focusInt === 0 || orbG === focusInt - 1) ? 1 : 0;

        const _a = Math.sin(i * 127.1  + 311.7) * 43758.5453; const hA = _a - Math.floor(_a);
        const _b = Math.sin(i * 269.5  + 183.3) * 43758.5453; const hB = _b - Math.floor(_b);
        const _c = Math.sin(i * 419.2  +  97.13) * 43758.5453; const hC = Math.max(_c - Math.floor(_c), 0.001);
        const _d = Math.sin(i * 573.1  + 214.7) * 43758.5453; const hD = Math.max(_d - Math.floor(_d), 0.001);

        const cosT = 2.0 * hA - 1.0;
        const sinT = Math.sqrt(Math.max(0, 1 - cosT * cosT));
        const phiA = 6.283185307 * hB;
        const cosP = Math.cos(phiA), sinP = Math.sin(phiA);

        let qn = 1, ql = 0, qm = 0, oHue = 0;
        if      (orbG === 0)  { qn=1; ql=0; qm=0; oHue=0.00; }
        else if (orbG === 1)  { qn=2; ql=0; qm=0; oHue=0.07; }
        else if (orbG === 2)  { qn=2; ql=1; qm=0; oHue=0.15; }
        else if (orbG === 3)  { qn=2; ql=1; qm=1; oHue=0.23; }
        else if (orbG === 4)  { qn=2; ql=1; qm=2; oHue=0.31; }
        else if (orbG === 5)  { qn=3; ql=0; qm=0; oHue=0.42; }
        else if (orbG === 6)  { qn=3; ql=1; qm=0; oHue=0.50; }
        else if (orbG === 7)  { qn=3; ql=1; qm=1; oHue=0.58; }
        else if (orbG === 8)  { qn=3; ql=1; qm=2; oHue=0.65; }
        else if (orbG === 9)  { qn=3; ql=2; qm=3; oHue=0.72; }
        else if (orbG === 10) { qn=3; ql=2; qm=4; oHue=0.78; }
        else if (orbG === 11) { qn=3; ql=2; qm=5; oHue=0.84; }
        else if (orbG === 12) { qn=3; ql=2; qm=6; oHue=0.90; }
        else                  { qn=3; ql=2; qm=7; oHue=0.96; }

        const rMeanAU = (3 * qn * qn - ql * (ql + 1)) * 0.5;
        const rAU     = Math.max(0.001, -(rMeanAU * 0.5) * (Math.log(hC) + Math.log(hD)) * uncertCtl);
        const eRn     = Math.exp(-rAU / qn);

        let Rw: number;
        if      (qn===1)           Rw = eRn;
        else if (qn===2 && ql===0) Rw = (2 - rAU) * eRn;
        else if (qn===2)           Rw = rAU * eRn;
        else if (ql===0)           Rw = (27 - 18*rAU + 2*rAU*rAU) * eRn;
        else if (ql===1)           Rw = rAU * (6 - rAU) * eRn;
        else                       Rw = rAU * rAU * eRn;

        const Rwt = 1 - Math.exp(-Math.abs(Rw) * 4);
        const cT2 = cosT * cosT, sT2 = sinT * sinT;
        const c2P = cosP * cosP - sinP * sinP, s2P = 2 * sinP * cosP;

        let aD = 1.0;
        if (ql===1) {
          if      (qm===0) aD = cT2;
          else if (qm===1) aD = sT2 * cosP * cosP;
          else             aD = sT2 * sinP * sinP;
        } else if (ql===2) {
          const dz2 = 3 * cT2 - 1;
          if      (qm===3) aD = 0.25 * dz2 * dz2;
          else if (qm===4) aD = 4 * sT2 * cT2 * cosP * cosP;
          else if (qm===5) aD = 4 * sT2 * cT2 * sinP * sinP;
          else if (qm===6) aD = sT2 * sT2 * c2P * c2P;
          else             aD = sT2 * sT2 * s2P * s2P;
        }

        const probD = aD * Rwt;
        const rotA  = time * rotRate;
        const cRot  = Math.cos(rotA), sRot = Math.sin(rotA);
        const brt   = 1 + 0.06 * Math.sin(time * 0.8 + orbG * 0.45);
        const rW    = rAU * orbScale * brt;
        const xR    = rW * sinT * cosP;
        const yR    = rW * cosT;
        const zR    = rW * sinT * sinP;

        target.set(xR * cRot + zR * sRot, yR, zR * cRot - xR * sRot);

        const lum = shown ? Math.min(0.85, 0.04 + probD * 0.78) : 0;
        color.setHSL(oHue, shown ? 0.95 : 0, lum);

        positions[i]!.lerp(target, 0.1);
        dummy.position.copy(positions[i]!);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i, color);
      }

      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

      controls.update();
      composer.render();
    }

    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      controls.dispose();
      composer.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />;
}
