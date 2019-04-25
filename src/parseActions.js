function insertActions(str) {
  let startIndex = str.indexOf("{");

  if (startIndex > -1) {
    let endIndex = str.indexOf("}") + 1;
    let actionStr = str.substring(startIndex, endIndex);
    let middleIndex = actionStr.indexOf(":");
    let type = actionStr.substring(1, middleIndex);
    let value = actionStr.substring(middleIndex + 1, actionStr.length - 1);
    let valueInt = parseInt(value);
    value = isNaN(valueInt) ? value : valueInt;
    return [
      str.substring(0, startIndex),
      { type, value },
      str.substring(endIndex, str.length)
    ];
  }
  return str;
}

export default function parseActions(queue) {
  let updated;
  let newQueue = queue
    .map(item => {
      if (typeof item !== "string") {
        return item;
      } else {
        let newItem = insertActions(item);
        if (newItem !== item) updated = true;
        return newItem;
      }
    })
    .flat();

  if (updated) {
    return parseActions(newQueue);
  } else {
    return newQueue;
  }
}
