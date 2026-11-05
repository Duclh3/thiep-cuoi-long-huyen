import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { StyleId, THEMES } from '../data/weddingData';

interface ThreeWeddingSceneProps {
  styleId: StyleId;
}

export const ThreeWeddingScene: React.FC<ThreeWeddingSceneProps> = ({ styleId }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const theme = THEMES[styleId];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 9.5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Nhóm 3D trung tâm: Cặp Nhẫn Cưới Vàng Kim Lồng Nhau + Viên Kim Cương
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const ringColor = new THREE.Color(theme.accentHex);
    const secondaryColor = new THREE.Color(theme.secondaryHex);

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: ringColor,
      metalness: 0.88,
      roughness: 0.18,
      emissive: ringColor,
      emissiveIntensity: 0.14,
    });

    const roseGoldMaterial = new THREE.MeshStandardMaterial({
      color: secondaryColor,
      metalness: 0.82,
      roughness: 0.22,
      emissive: ringColor,
      emissiveIntensity: 0.1,
    });

    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 1,
      metalness: 0.1,
      roughness: 0.05,
      ior: 2.4,
      reflectivity: 1,
      emissive: 0xfff3d1,
      emissiveIntensity: 0.25,
    });

    // Nhẫn Chú Rể (Lớn hơn một chút)
    const groomRingGeo = new THREE.TorusGeometry(1.35, 0.085, 32, 100);
    const groomRing = new THREE.Mesh(groomRingGeo, goldMaterial);
    groomRing.position.set(-0.55, 0.15, 0);
    groomRing.rotation.set(0.65, 0.4, 0.2);
    mainGroup.add(groomRing);

    // Nhẫn Cô Dâu (Lồng vào nhẫn Chú Rể + Đính Kim Cương)
    const brideRingGroup = new THREE.Group();
    const brideRingGeo = new THREE.TorusGeometry(1.18, 0.072, 32, 100);
    const brideRing = new THREE.Mesh(brideRingGeo, roseGoldMaterial);
    brideRingGroup.add(brideRing);

    // Viên Kim Cương đa giác trên đỉnh nhẫn Cô Dâu
    const diamondGeo = new THREE.OctahedronGeometry(0.24, 1);
    const diamond = new THREE.Mesh(diamondGeo, diamondMaterial);
    diamond.position.set(0, 1.32, 0);
    diamond.scale.set(1, 1.25, 1);
    brideRingGroup.add(diamond);

    brideRingGroup.position.set(0.55, -0.15, 0.25);
    brideRingGroup.rotation.set(-0.55, -0.35, -0.2);
    mainGroup.add(brideRingGroup);

    // Vòng Hào Quang Thiên Hà Mảnh Xung Quanh
    const haloGeo = new THREE.TorusGeometry(3.2, 0.012, 16, 120);
    const haloMat = new THREE.MeshBasicMaterial({
      color: ringColor,
      transparent: true,
      opacity: 0.28,
    });
    const haloRing = new THREE.Mesh(haloGeo, haloMat);
    haloRing.rotation.x = Math.PI / 2.6;
    mainGroup.add(haloRing);

    // Hệ thống Hạt Sáng 3D (3D Starfield & Floating Dust)
    const particleCount = 320;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMat = new THREE.PointsMaterial({
      color: ringColor,
      size: 0.075,
      transparent: true,
      opacity: 0.55,
    });
    const starSystem = new THREE.Points(starsGeo, starsMat);
    scene.add(starSystem);

    // Hệ thống Ánh Sáng 3D
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xfff0c2, 4.5, 25);
    pointLight1.position.set(4, 5, 6);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffb6c1, 3.2, 25);
    pointLight2.position.set(-5, -4, 5);
    scene.add(pointLight2);

    // Tương tác Cuộn Trang & Chạm Tay (Touch / Mouse)
    let targetRotX = 0;
    let targetRotY = 0;
    let scrollY = window.scrollY;

    const handlePointerMove = (clientX: number, clientY: number) => {
      targetRotY = ((clientX / width) - 0.5) * 0.9;
      targetRotX = ((clientY / height) - 0.5) * 0.6;
    };

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const scrollFactor = scrollY * 0.0022;

      // Xoay cặp nhẫn 3D mượt mà theo thời gian + theo nhịp vuốt màn hình điện thoại
      mainGroup.rotation.y += (targetRotY + scrollFactor + elapsed * 0.32 - mainGroup.rotation.y) * 0.06;
      mainGroup.rotation.x += (targetRotX + Math.sin(elapsed * 0.5) * 0.18 - mainGroup.rotation.x) * 0.06;

      // Nhịp thở bồng bềnh của cặp nhẫn 3D
      mainGroup.position.y = Math.sin(elapsed * 1.1) * 0.25;
      diamond.rotation.y = elapsed * 1.8;
      haloRing.rotation.z = elapsed * 0.4;

      // Xoay nhẹ thiên hà sao 3D
      starSystem.rotation.y = elapsed * 0.05 + scrollFactor * 0.25;
      starSystem.position.y = (scrollY * 0.004) % 4;

      // Đèn di chuyển tạo ánh kim lấp lánh trên nhẫn
      pointLight1.position.x = Math.cos(elapsed * 0.9) * 5;
      pointLight1.position.y = Math.sin(elapsed * 0.9) * 5;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [styleId]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-15 opacity-65"
      aria-hidden="true"
    />
  );
};
