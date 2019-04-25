import actions from "./actions";

const extractChildTextNodes = el =>
  Array.from(el.childNodes).map(child => {
    if (child.nodeType === 3) {
      return child.nodeValue;
    } else {
      return child;
    }
  });

const itemizeNode = el => [
  actions.nodeStart.create(el),
  ...extractChildTextNodes(el),
  actions.nodeEnd.create(el)
];

function convertNodesToItems(queue) {
  let nextQueue = queue
    .map(item => {
      if (item instanceof HTMLElement) {
        return itemizeNode(item);
      } else {
        return item;
      }
    })
    .flat();

  if (queue.length !== nextQueue.length) {
    return convertNodesToItems(nextQueue);
  } else {
    return queue;
  }
}

export default function parseHTML(string) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(string, "text/html");
  let queue = extractChildTextNodes(doc.body);
  return convertNodesToItems(queue);
}
