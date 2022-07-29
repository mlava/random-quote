const settings = {
    "url": "https://api.quotable.io/random",
    "method": "GET",
    "timeout": 0,
    "async": false
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
          
          const args = {
            text: "RANDOMQUOTE",
            help: "Import a Random Quote from Quotable.io",
            handler: (context) => fetchRandomQuote,
          };
          
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
            return new Promise((resolve) => $.ajax(settings).done(async function (response) {
              var jsonQuotes = JSON.stringify(response);
              var quote = JSON.parse(jsonQuotes);
              let string = "> ";
              string += quote?.content;
              string += " \n\n[[";
              string += quote?.author;
              string += "]]";
              resolve(string);
            })
            );
          };
    },
    onunload: () => {
        window.roamAlphaAPI.ui.commandPalette.removeCommand({
            label: 'Random Quote'
        });
    }
}