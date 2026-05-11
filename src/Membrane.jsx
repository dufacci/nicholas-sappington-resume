import { useEffect, useRef } from 'react';

const VS = `attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos,0.0,1.0); }`;

const FS = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform vec2  u_beats[8];
uniform float u_beat_times[8];
uniform int   u_beat_count;
uniform float u_energy;

#define PI 3.14159265358979

float chladni(vec2 uv, float m, float n, float phase) {
  return cos(m * PI * uv.x + phase) * cos(n * PI * uv.y)
       - cos(n * PI * uv.x) * cos(m * PI * uv.y + phase);
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5); }

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;
  float ar = u_res.x / u_res.y;
  vec2 suv = vec2(uv.x * ar, uv.y);
  vec2 sm  = vec2(u_mouse.x * ar, u_mouse.y);

  vec2 d = suv - sm;
  float mouseDist = length(d);
  vec2 warp = d * exp(-mouseDist * 3.0) * 0.12;
  vec2 wuv = uv + warp;

  float mx = u_mouse.x * 6.0 + 1.0;
  float my = u_mouse.y * 6.0 + 1.0;
  float phase = u_time * 0.45;

  float membrane = 0.0;
  membrane += chladni(wuv, mx, my, phase) * 0.5;
  membrane += chladni(wuv, mx * 0.5 + 1.0, my * 0.5 + 1.0, -phase * 0.7) * 0.3;
  membrane += chladni(wuv, floor(mx) + 2.0, floor(my) + 2.0, phase * 1.3) * 0.2;

  float beatAmp = 0.0;
  for (int i = 0; i < 8; i++) {
    if (i >= u_beat_count) break;
    float age  = u_time - u_beat_times[i];
    vec2  bpos = vec2(u_beats[i].x * ar, u_beats[i].y);
    float dist = length(suv - bpos);
    float ring = sin(dist * 30.0 - age * 3.0) * exp(-dist * 2.0 - age * 0.375);
    beatAmp += ring;
  }
  membrane += beatAmp * 0.8;

  float nodal = smoothstep(0.04, 0.0, abs(membrane));

  float glow = clamp(u_energy * 0.4, 0.0, 1.0);

  vec3 c0    = vec3(0.02, 0.04, 0.0);
  vec3 c1    = vec3(0.08, 0.32, 0.0);
  vec3 c2    = vec3(0.42, 0.95, 0.0);
  vec3 c3    = vec3(0.85, 1.0, 0.5);
  vec3 nodal_col = vec3(0.6, 1.0, 0.1);

  float mn = clamp(membrane * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = mix(c0, c1, mn);
  col = mix(col, c2, pow(mn, 2.0));
  col = mix(col, c3, pow(mn, 5.0));

  col = mix(col, nodal_col, nodal * 0.9);

  col += beatAmp * vec3(0.3, 0.8, 0.1) * 0.3;
  col += glow * vec3(0.2, 0.5, 0.0) * 0.4;

  float vig = 1.0 - pow(length(uv - 0.5) * 1.5, 2.0);
  col *= max(vig, 0.0);

  float grain = (hash(uv + u_time * 0.01) - 0.5) * 0.04;
  col += grain;

  gl_FragColor = vec4(col, 1.0);
}
`;

const Membrane = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return;

    const mkShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uBeats = gl.getUniformLocation(prog, 'u_beats');
    const uBeatTimes = gl.getUniformLocation(prog, 'u_beat_times');
    const uBeatCount = gl.getUniformLocation(prog, 'u_beat_count');
    const uEnergy = gl.getUniformLocation(prog, 'u_energy');

    let targetMouse = [0.5, 0.5];
    let mouse = [0.5, 0.5];
    let beats = [];
    let energy = 0;
    const MAX = 8;
    const MOUSE_LERP = 0.06; // ~25% speed feel — lower = slower trail
    let rafId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const onMouseMove = (e) => {
      targetMouse = [e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight];
    };
    const onClick = (e) => {
      const t = performance.now() / 1000;
      beats.push({
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
        t,
      });
      if (beats.length > MAX) beats.shift();
      energy = 5.0;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    const render = (ts) => {
      const t = ts / 1000;
      energy = Math.max(0, energy - 0.04);

      // Lerp the membrane's tracked mouse toward the cursor for slow-motion trail
      mouse[0] += (targetMouse[0] - mouse[0]) * MOUSE_LERP;
      mouse[1] += (targetMouse[1] - mouse[1]) * MOUSE_LERP;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.uniform1f(uEnergy, energy);

      const now = t;
      beats = beats.filter((b) => now - b.t < 5);

      const flatPos = [];
      const flatTimes = [];
      for (let i = 0; i < MAX; i++) {
        if (i < beats.length) {
          flatPos.push(beats[i].x, beats[i].y);
          flatTimes.push(beats[i].t);
        } else {
          flatPos.push(0, 0);
          flatTimes.push(0);
        }
      }
      gl.uniform2fv(uBeats, flatPos);
      gl.uniform1fv(uBeatTimes, flatTimes);
      gl.uniform1i(uBeatCount, beats.length);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 block bg-black"
    />
  );
};

export default Membrane;
