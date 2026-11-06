// Fictional personalities and lucky numbers, authored for the club exhibit.
// The selector is real π data; the interpretation is deliberately just for fun.
export const PI_SIGNS = Object.freeze([
  {digit:'0', name:'The Origin', trait:'Imaginative · Open-minded · Original', description:'You see fresh possibilities where others see only a blank page.', luckyNumber:11},
  {digit:'1', name:'The Trailblazer', trait:'Independent · Brave · Driven', description:'You take the first step and inspire others to follow your lead.', luckyNumber:19},
  {digit:'2', name:'The Connector', trait:'Thoughtful · Collaborative · Kind', description:'You bring people and ideas together so everyone has a place.', luckyNumber:23},
  {digit:'3', name:'The Spark', trait:'Creative · Expressive · Playful', description:'You turn ordinary moments into something creative and unexpected.', luckyNumber:31},
  {digit:'4', name:'The Architect', trait:'Patient · Practical · Steady', description:'You build ideas patiently and keep going until the pieces fit.', luckyNumber:41},
  {digit:'5', name:'The Explorer', trait:'Adventurous · Curious · Adaptable', description:'You follow your curiosity and find possibilities in every detour.', luckyNumber:53},
  {digit:'6', name:'The Harmonist', trait:'Caring · Balanced · Encouraging', description:'You bring calm, encouragement, and balance to the people around you.', luckyNumber:67},
  {digit:'7', name:'The Seeker', trait:'Reflective · Observant · Inquisitive', description:'You look beneath the surface and notice what others might miss.', luckyNumber:73},
  {digit:'8', name:'The Strategist', trait:'Resourceful · Focused · Inventive', description:'You turn big challenges into small steps and inventive solutions.', luckyNumber:83},
  {digit:'9', name:'The Visionary', trait:'Hopeful · Big-picture · Generous', description:'You connect small discoveries to bigger possibilities for everyone.', luckyNumber:97}
].map(sign => Object.freeze(sign)));

export function getPiSign(result) {
  if (!result || !Number.isInteger(result.position) || result.position < 1 || typeof result.nextDigit !== 'string' || !/^[0-9]$/.test(result.nextDigit)) return null;
  return PI_SIGNS[Number(result.nextDigit)];
}
