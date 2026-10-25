// Fictional personalities and lucky numbers, authored for the club exhibit.
// The selector is real π data; the interpretation is deliberately just for fun.
export const PI_SIGNS = Object.freeze([
  {digit:'0', name:'The Origin', trait:'Imaginative · Open-minded · Original', description:'You see possibility in a blank page. When everyone else sees nothing, you see the beginning of something interesting.', luckyNumber:11},
  {digit:'1', name:'The Trailblazer', trait:'Independent · Brave · Driven', description:'You’re happy to take the first step. A new idea, an unfamiliar path, a tricky problem: you give it a go and make room for others to follow.', luckyNumber:19},
  {digit:'2', name:'The Connector', trait:'Thoughtful · Collaborative · Kind', description:'You notice what brings people together. You’re the one who turns separate ideas into a shared discovery, and makes sure everyone has a place.', luckyNumber:23},
  {digit:'3', name:'The Spark', trait:'Creative · Expressive · Playful', description:'You bring a fresh angle and a little unexpected energy. A doodle, a question, a wonderfully weird idea: you help ordinary moments become interesting.', luckyNumber:31},
  {digit:'4', name:'The Architect', trait:'Patient · Practical · Steady', description:'You like making ideas work in the real world. You build carefully, spot the missing piece, and keep going when a good solution takes a few more tries.', luckyNumber:41},
  {digit:'5', name:'The Explorer', trait:'Adventurous · Curious · Adaptable', description:'You’re drawn to the question nobody has asked yet. A detour can be the best part of the journey, especially when it leads to something new.', luckyNumber:53},
  {digit:'6', name:'The Harmonist', trait:'Caring · Balanced · Encouraging', description:'You bring a little calm to a noisy world. You notice when someone needs a hand and help a group find a rhythm that works for everyone.', luckyNumber:67},
  {digit:'7', name:'The Seeker', trait:'Reflective · Observant · Inquisitive', description:'You enjoy looking beneath the surface. You’re willing to sit with a puzzling question, follow a subtle clue, and discover what a quick glance might miss.', luckyNumber:73},
  {digit:'8', name:'The Strategist', trait:'Resourceful · Focused · Inventive', description:'You see how the pieces might fit together. You enjoy turning a big challenge into smaller moves, and you’re ready to change the plan when a better idea appears.', luckyNumber:83},
  {digit:'9', name:'The Visionary', trait:'Hopeful · Big-picture · Generous', description:'You’re good at imagining what could come next. You connect today’s small discoveries to bigger possibilities and invite other people to dream along with you.', luckyNumber:97}
].map(sign => Object.freeze(sign)));

export function getPiSign(result) {
  if (!result || !Number.isInteger(result.position) || result.position < 1 || typeof result.nextDigit !== 'string' || !/^[0-9]$/.test(result.nextDigit)) return null;
  return PI_SIGNS[Number(result.nextDigit)];
}
