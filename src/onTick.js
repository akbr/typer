import { randomInRange } from "./utilities";
import actions from "./actions";

function getNextTime({ speed, lifeLike }) {
  if (lifeLike) {
    let variance = speed / 2 <= 100 ? speed / 2 : 100;
    return randomInRange(speed, variance);
  } else {
    return speed;
  }
}

export default function onTick(deltaTime = 0, state, options) {
  if (!state.active) {
    return;
  }

  state.next -= deltaTime;

  if (state.next >= 0) {
    return;
  }

  while (state.next <= 0 && state.queue.length > 0) {
    let item = state.queue.shift();
    if (typeof item === "string") {
      state.currentEl.append(item, state.cursorEl);
      state.next += getNextTime(options);
    } else {
      actions[item.type].execute(item, state, options);
    }
  }

  if (state.queue.length === 0) {
    state.active = false;
    console.log("end");
  }
}
