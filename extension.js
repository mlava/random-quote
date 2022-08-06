const args = {
  text: "RANDOMQUOTE",
  help: "Import a Random Quote from Quotable.io",
  handler: (context) => fetchRandomQuote,
};

export default {
  onload: ({ extensionAPI }) => {
    window.roamAlphaAPI.ui.commandPalette.addCommand({
      label: "Random Quote",
      callback: () => fetchRandomQuote().then(string =>
        window.roamAlphaAPI.updateBlock({
          block: {
            uid: window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"],
            string: string,
          }
        })
      ),
    });

    if (window.roamjs?.extension?.smartblocks) {
      window.roamjs.extension.smartblocks.registerCommand(args);
    } else {
      document.body.addEventListener(
        `roamjs:smartblocks:loaded`,
        () =>
          window.roamjs?.extension.smartblocks &&
          window.roamjs.extension.smartblocks.registerCommand(args)
      );
    }

    async function fetchRandomQuote() {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        if (response.ok) {
          let string = "> ";
          string += data.content;
          string += " \n\n[[";
          string += data.author;
          string += "]]";
          return(string);
        } else {
          console.error(data);
        }
    };
  },
  onunload: () => {
    window.roamAlphaAPI.ui.commandPalette.removeCommand({
      label: 'Random Quote'
    });
    if (window.roamjs?.extension?.smartblocks) {
      window.roamjs.extension.smartblocks.unregisterCommand("RANDOMQUOTE");
    }
  }
}