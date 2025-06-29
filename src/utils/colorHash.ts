export function generateColorScheme(seed: string) {
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Generate colors based on hash
  const hue = Math.abs(hash) % 360;
  const saturation = 60 + (Math.abs(hash >> 8) % 30); // 60-90%
  const lightness = 45 + (Math.abs(hash >> 16) % 20); // 45-65%

  const frame = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const door = `hsl(${hue}, ${saturation - 10}%, ${lightness + 10}%)`;
  const interior = `hsl(${hue}, ${saturation - 20}%, ${lightness + 20}%)`;
  const accent = `hsl(${(hue + 30) % 360}, ${saturation}%, ${lightness - 10}%)`;
  const handle = `hsl(${hue}, ${saturation - 30}%, ${lightness - 15}%)`;
  const compartment = `hsl(${hue}, ${saturation - 15}%, ${lightness + 15}%)`;

  return {
    frame,
    door,
    interior,
    accent,
    handle,
    compartment,
  };
}