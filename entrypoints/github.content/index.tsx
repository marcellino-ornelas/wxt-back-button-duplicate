import ReactDOM from "react-dom/client";
import { Component } from "./Component";

export default defineContentScript({
  matches: ["*://github.com/*"],
  main(ctx) {
    console.log("hellppooppop");
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor: "#start-of-content",
      append: "after",
      onMount(container) {
        const root = ReactDOM.createRoot(container);
        root.render(<Component />);
        return { root, container };
      },
      onRemove: (elements) => {
        elements?.root.unmount();
      },
    });

    const mountUi = () => {
      if (ui.mounted) ui.remove();
      ui.autoMount();
    };

    ctx.addEventListener(window, "wxt:locationchange", () => {
      mountUi();
    });

    // initial render
    mountUi();
  },
});
