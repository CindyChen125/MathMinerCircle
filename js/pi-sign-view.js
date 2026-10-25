import {PI_SIGNS, getPiSign} from './pi-signs.js';
import {node} from './ui.js';

function signSeal(digit) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 120 120');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('sign-seal');
  // A ten-point instrument dial; the active point corresponds to the actual following digit.
  const circle = document.createElementNS(svg.namespaceURI, 'circle');
  circle.setAttribute('cx','60'); circle.setAttribute('cy','60'); circle.setAttribute('r','43');
  circle.setAttribute('class','sign-dial'); svg.append(circle);
  for (let i=0; i<10; i++) {
    const angle = (i/10)*Math.PI*2-Math.PI/2;
    const dot = document.createElementNS(svg.namespaceURI, 'circle');
    dot.setAttribute('cx',String(60+43*Math.cos(angle))); dot.setAttribute('cy',String(60+43*Math.sin(angle)));
    dot.setAttribute('r', i===Number(digit)?'4':'2');
    dot.setAttribute('class',i===Number(digit)?'sign-point active':'sign-point'); svg.append(dot);
  }
  const text = document.createElementNS(svg.namespaceURI,'text');
  text.setAttribute('x','60'); text.setAttribute('y','73'); text.setAttribute('text-anchor','middle'); text.textContent=digit;
  svg.append(text); return svg;
}

function catalog(selectedDigit) {
  const details=node('details',undefined,'sign-catalog');
  details.append(node('summary','Meet all 10 π Signs'));
  const list=node('ol'); list.start=0;
  for (const sign of PI_SIGNS) {
    const item=node('li');
    if(sign.digit===selectedDigit) item.classList.add('your-sign');
    const heading=node('h4',`${sign.digit} / ${sign.name}${sign.digit===selectedDigit?' · Your sign':''}`);
    item.append(heading,node('p',sign.trait,'sign-traits'),node('p',sign.description),node('p',`Lucky number: ${sign.luckyNumber}`,'sign-catalog-lucky'));
    list.append(item);
  }
  details.append(list); return details;
}

export function renderPiSign(host,result) {
  host.replaceChildren();
  host.hidden=false;
  host.append(node('h2','Your π Sign'));
  const sign=getPiSign(result);
  if (!sign) {
    host.append(node('p',result.position===null?'A π Sign needs a birthday match first. Your sequence wasn’t found in this million-digit window, so there’s no following digit to read.':'Your match reaches the end of this dataset. The next digit is outside our verified window, so we can’t assign a π Sign.','sign-intro'),node('p','Fictional personalities and lucky numbers, just for fun. Your prediction score is unchanged.','sign-disclaimer'),catalog(null));
    return;
  }
  host.append(node('p','One digit after your birthday. One playful alter ego.','sign-intro'));
  const reveal=node('button','REVEAL MY π SIGN','secondary-button sign-reveal');
  reveal.type='button'; reveal.setAttribute('aria-expanded','false'); reveal.setAttribute('aria-controls','sign-reading');
  const reading=node('div',undefined,'sign-reading'); reading.id='sign-reading'; reading.hidden=true;
  reading.tabIndex=-1;
  reading.append(signSeal(sign.digit),node('h3',sign.name),node('p',sign.trait,'sign-traits'),node('p',sign.description,'sign-description'));
  const lucky=node('div',undefined,'sign-lucky');
  lucky.append(node('span','Your lucky number'),node('strong',String(sign.luckyNumber))); reading.append(lucky);
  const nextPosition=result.position+result.match.length;
  reading.append(node('p',`Your birthday’s first match ends at digit ${(nextPosition-1).toLocaleString('en-US')}. The very next digit, at position ${nextPosition.toLocaleString('en-US')}, is ${sign.digit}. That digit selects your sign.`,'sign-proof'));
  reveal.onclick=()=>{
    const expanded=reveal.getAttribute('aria-expanded')==='true';
    reveal.setAttribute('aria-expanded',String(!expanded)); reading.hidden=expanded;
    reveal.textContent=expanded?'REVEAL MY π SIGN':'HIDE MY π SIGN';
    if(!expanded) { reading.classList.add('revealed'); reading.focus({preventScroll:true}); }
  };
  host.append(reveal,reading,node('p','Fictional personalities and lucky numbers, just for fun—not a scientific personality test or prediction.','sign-disclaimer'),catalog(sign.digit));
}
