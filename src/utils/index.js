export const formatTime = (time) => {
  if (time > 11 && time < 24) {
    return time - 12 !== 0 ? `${time - 12} PM` : '12 PM';
  } else if (time === 24) return `12 AM`;
  return `${time} AM`;
};

export const excludeObjNullValues = (obj)=>{
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null)
  );
}