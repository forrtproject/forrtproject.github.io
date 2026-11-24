/* Renders a clean PNG postcard of the visitor's finished tower and triggers a download. */

export const STRIPES = ['#7046a3', '#2672b8', '#2b985b', '#e8b52c', '#e98434', '#ce4742'];

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function renderPostcardCanvas({ sourceCanvas, title, bricks, courses, stability, blueprintDone }) {
  const W = 1200, H = 900;
  const out = document.createElement('canvas');
  out.width = W;
  out.height = H;
  const ctx = out.getContext('2d');

  // Soft FORRT sage backdrop.
  ctx.fillStyle = '#e3efec';
  ctx.fillRect(0, 0, W, H);

  // Crisp inner postcard frame.
  const pad = 36;
  const cardX = pad, cardY = pad, cardW = W - pad * 2, cardH = H - pad * 2;
  ctx.save();
  ctx.shadowColor = 'rgba(38, 45, 53, 0.14)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  roundRect(ctx, cardX, cardY, cardW, cardH, 24);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();

  // Clip inner card for top pride stripe bar + soft stage tint.
  ctx.save();
  roundRect(ctx, cardX, cardY, cardW, cardH, 24);
  ctx.clip();

  const stripeH = 10;
  const sw = cardW / STRIPES.length;
  STRIPES.forEach((hex, idx) => {
    ctx.fillStyle = hex;
    ctx.fillRect(cardX + idx * sw, cardY, Math.ceil(sw) + 1, stripeH);
  });

  // Soft stage ground behind the 3D tower.
  const footH = 136;
  const stageY = cardY + stripeH;
  const stageH = cardH - stripeH - footH;
  const grad = ctx.createLinearGradient(0, stageY, 0, stageY + stageH);
  grad.addColorStop(0, '#eaf4f1');
  grad.addColorStop(1, '#dcebe7');
  ctx.fillStyle = grad;
  ctx.fillRect(cardX, stageY, cardW, stageH);

  // Composite the freshly rendered 3D canvas centred inside the stage area.
  const srcW = sourceCanvas.width || 1;
  const srcH = sourceCanvas.height || 1;
  const scale = Math.min((cardW - 48) / srcW, (stageH - 24) / srcH);
  const drawW = srcW * scale;
  const drawH = srcH * scale;
  const drawX = cardX + (cardW - drawW) / 2;
  const drawY = stageY + (stageH - drawH) / 2;
  ctx.drawImage(sourceCanvas, drawX, drawY, drawW, drawH);

  // Subtle hairline separating stage and postcard footer.
  const footY = cardY + cardH - footH;
  ctx.fillStyle = '#d7e2e0';
  ctx.fillRect(cardX, footY, cardW, 1.5);

  // Postcard text footer.
  ctx.fillStyle = '#262d35';
  ctx.font = "500 38px 'Newsreader', Georgia, serif";
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(title, cardX + 40, footY + 56);

  const brickWord = bricks === 1 ? 'brick' : 'bricks';
  const courseWord = courses === 1 ? 'course' : 'courses';
  const statsText = `${bricks} ${brickWord}  ·  ${courses} ${courseWord} high  ·  ${stability}% stable`;
  ctx.fillStyle = '#4c5e72';
  ctx.font = "600 22px 'Source Sans 3', system-ui, sans-serif";
  ctx.fillText(statsText, cardX + 40, footY + 98);

  if (blueprintDone) {
    const label = 'Blueprint complete';
    ctx.font = "600 19px 'Source Sans 3', system-ui, sans-serif";
    const tw = ctx.measureText(label).width;
    const bx = cardX + cardW - 40 - tw - 28;
    const by = footY + 26;
    roundRect(ctx, bx, by, tw + 28, 36, 18);
    ctx.fillStyle = '#e3f1e7';
    ctx.fill();
    ctx.fillStyle = '#2b7a4b';
    ctx.fillText(label, bx + 14, by + 24);
  }

  ctx.fillStyle = '#2d5750';
  ctx.font = "600 20px 'Source Sans 3', system-ui, sans-serif";
  ctx.textAlign = 'right';
  ctx.fillText('Built on forrt.org', cardX + cardW - 40, footY + 98);
  ctx.restore();

  return out;
}

export function downloadPostcard(canvas, filename = 'forrt-tower.png') {
  return new Promise((resolve) => {
    const trigger = (href, revoke) => {
      const a = document.createElement('a');
      a.href = href;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      if (revoke) setTimeout(() => URL.revokeObjectURL(href), 2000);
      resolve(true);
    };
    if (canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (blob) trigger(URL.createObjectURL(blob), true);
        else trigger(canvas.toDataURL('image/png'), false);
      }, 'image/png');
    } else {
      trigger(canvas.toDataURL('image/png'), false);
    }
  });
}
