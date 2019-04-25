import createTyper from "./createTyper";

let string = "<b>Hello</b>.{pause:1500}! How are you today?";

let typer = createTyper(document.querySelector("#app"));

typer.type(string);

document.body.addEventListener("mousedown", () => {
  typer.skip();
});
/**
let fixed = `asg
asg
asg
asg
ags`.replace(/\r?\n|\r/g, "");
console.log(fixed);
**/
