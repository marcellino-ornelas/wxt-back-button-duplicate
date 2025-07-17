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
        // remove react
        elements?.root.unmount();
        // remove container
        elements?.container.remove();
      },
    });

    const mountUi = () => {
      // Remove Ui if mounted else autoMount will failure due to react error
      if (ui.mounted) ui.remove();
       // autoMount just in case element is not present
      ui.autoMount();
    };

    ctx.addEventListener(window, "wxt:locationchange", () => {
      // rerender element when FE changes else element will not be shown anymore
      mountUi();
    });

    // initial render
    mountUi();
  },
});
