import stringToQueue from "./stringToQueue";
import onTick from "./onTick";

const defaultOptions = {
  speed: 125,
  lifeLike: true
};

const createState = el => ({
  queue: [],
  el,
  currentEl: el,
  cursorEl: document.createTextNode("|"),
  active: false,
  next: 0
});

const api = (state, options, userOptions) => ({
  type: function(string) {
    state.queue = stringToQueue(string);
    state.active = true;
    state.next = 0;
  },

  reset: function() {
    state.queue = [];
    state.el.innerHTML = "";
  },

  skip: function() {
    state.next = -Infinity;
  }
});

export default function createTyper(rootEl, userOptions = {}) {
  let el = document.createElement("span");
  rootEl.appendChild(el);

  let state = createState(el);
  let options = {
    ...defaultOptions,
    ...userOptions
  };
  options.originalSpeed = options.speed;

  let instanceApi = api(state, options, userOptions);
  instanceApi.reset();

  // Temporary ticker
  let tick = delta => {
    onTick(delta, state, options);
  };

  setInterval(() => {
    tick(16);
  }, 16);

  return instanceApi;
}
