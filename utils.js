export function clamp (num, min, max) {
  const result = Math.min(Math.max(num, min), max)
  const clamped = num != result
  return [result, clamped]
}

// Test For Hit
// A basic AABB check between two different squares
export function boxesHitEachOther(object1, object2)
{
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}