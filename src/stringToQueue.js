import parseHTML from "./parseHTML";
import parseActions from "./parseActions";

function splitStrings(queue) {
  return queue
    .map(item => {
      if (typeof item === "string") {
        return item.split("");
      } else {
        return item;
      }
    })
    .flat();
}

export default string => splitStrings(parseActions(parseHTML(string)));
