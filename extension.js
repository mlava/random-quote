const args = {
  text: "RANDOMQUOTE",
  help: "Import a Random Quote from Quotable.io",
  handler: (context) => fetchRandomQuote,
};

const args1 = {
  text: "STOICQUOTE",
  help: "Import a Random Stoic Quote from stoic-quotes.com",
  handler: (context) => fetchStoicQuote,
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
    window.roamAlphaAPI.ui.commandPalette.addCommand({
      label: "Stoic Quote",
      callback: () => fetchStoicQuote().then(string =>
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

    if (window.roamjs?.extension?.smartblocks) {
      window.roamjs.extension.smartblocks.registerCommand(args1);
    } else {
      document.body.addEventListener(
        `roamjs:smartblocks:loaded`,
        () =>
          window.roamjs?.extension.smartblocks &&
          window.roamjs.extension.smartblocks.registerCommand(args1)
      );
    }
  },
  onunload: () => {
    window.roamAlphaAPI.ui.commandPalette.removeCommand({
      label: 'Random Quote'
    });
    window.roamAlphaAPI.ui.commandPalette.removeCommand({
      label: 'Stoic Quote'
    });
    if (window.roamjs?.extension?.smartblocks) {
      window.roamjs.extension.smartblocks.unregisterCommand("RANDOMQUOTE");
      window.roamjs.extension.smartblocks.unregisterCommand("STOICQUOTE");
    }
  }
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
    return (string);
  } else {
    console.error(data);
  }
};

async function fetchStoicQuote() {
  const response = await fetch("https://stoic-quotes.com/api/quote");
  const data = await response.json();
  if (response.ok) {
    let string = "> ";
    string += data.text;
    string += " \n\n[[";
    string += data.author;
    string += "]]";
    return (string);
  } else {
    console.error(data);
  }
};