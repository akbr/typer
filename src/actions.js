export default {
  nodeStart: {
    create: node => ({
      type: "nodeStart",
      tagName: node.tagName,
      attributes: Array.from(node.attributes).map(att => [
        att.name,
        att.nodeValue
      ])
    }),

    execute: function({ tagName, attributes }, state) {
      let el = document.createElement(tagName);
      attributes.forEach(([name, value]) => {
        el.setAttribute(name, value);
      });
      state.currentEl.insertAdjacentElement("beforeend", el);
      state.currentEl = el;
    }
  },

  nodeEnd: {
    create: node => ({
      type: "nodeEnd"
    }),

    execute: function(item, state) {
      state.currentEl = state.currentEl.parentNode;
    }
  },

  speed: {
    create: newValue => ({
      speed: newValue
    }),

    execute: function({ value }, state, options) {
      if (value === "reset") {
        options.speed = options.originalSpeed;
      } else if (typeof value === "number") {
        options.speed = value;
      }
    }
  },

  pause: {
    create: value => ({
      pause: value
    }),

    execute: function({ value }, state, options) {
      state.next += value;
    }
  }
};
