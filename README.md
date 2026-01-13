# Random Quotes for Roam Research

Random Quotes lets you quickly insert **high‑quality quotes and jokes** into your Roam graph using the **Command Palette** or **SmartBlocks**.

Quotes are formatted as Roam blockquotes and automatically attributed to their author, speaker, or source.

The extension prioritizes **reliable sources** (large static datasets and reputable APIs) and avoids fragile or abandoned quote APIs.

---

## ✨ What’s New (Major Updates)

- **Surprise Quote** – pull a random quote from multiple providers with automatic fallback  
- **Surprise Joke** – same idea, but for jokes  
- **Dataset‑based quotes** (5,000+ quotes, cached locally for speed & reliability)  
- **ZenQuotes** (daily inspiration + random quotes, via Roam CORS proxy)  
- **API Ninjas quotes** with optional category filtering  
- **Local quotes from your own graph**  
- Improved error handling and fallback logic  
- Dead / unstable APIs fully removed  

---

## 📌 How Quotes Are Inserted

All quotes are inserted as a blockquote, followed by the author/speaker as a Roam page link:

```
> The only way to do great work is to love what you do.

[[Steve Jobs]]
```

Some sources may also include a **work, show, or film** where relevant.

---

## 🎯 Ways to Trigger Quotes

### Command Palette
Open the Command Palette and select a quote or joke source.

### SmartBlocks
Each source also has a SmartBlock command:

```
<%RANDOMQUOTE%>
<%STOICQUOTE%>
<%SURPRISEQUOTE%>
<%SURPRISEJOKE%>
```

---

## 🔀 Surprise Commands (Recommended)

### Surprise Quote
Picks a quote from multiple providers, automatically skipping failed or unavailable sources.

```
Command Palette: Surprise Me (Quote)
SmartBlock: <%SURPRISEQUOTE%>
```

### Surprise Joke
Same idea, but for jokes.

```
Command Palette: Surprise Me (Joke)
SmartBlock: <%SURPRISEJOKE%>
```

These are ideal for daily notes, journaling, or writing prompts.

---

## 📚 Quote Sources (Current)

### Built‑in & Dataset Sources
- **Large Quotes Dataset** (5,000+ curated quotes, SmartBlock: `<%RANDOMQUOTE%>`)
- **Your Local Quotes Page** (stored inside your own graph, SmartBlock: `<%LOCALQUOTE%>`)
- **Quotes by Tag** (pull quotes from tagged blocks, SmartBlock: `<%LOCALQUOTETAG%>`)

### API‑Based (Stable / Actively Maintained)
- **ZenQuotes**
  - Daily Inspiration (SmartBlock: `<%ZENDAILY%>`)
  - Random Quotes (SmartBlock: `<%ZENRANDOM%>`)
- **API Ninjas Quotes** (SmartBlock: `<%NINJAQUOTE%>`)
  - Optional category filtering (wisdom, philosophy, life, etc.)
- **Stoic Quotes** (SmartBlock: `<%STOICQUOTE%>`)
- **Lord of the Rings Quotes** (The One API – requires free API key, SmartBlock: `<%TOLKIENQUOTE%>`)
- **Game of Thrones Quotes** (SmartBlock: `<%GOTQUOTE%>`)
- **Movie Quotes** (popular‑movie‑quotes npm package, SmartBlock: `<%MOVIEQUOTE%>`)
- **Inspirational Quotes** (curated npm package, SmartBlock: `<%INSPQUOTE%>`)

---

## 😂 Joke Sources (Current)

- **Official Joke API** (SmartBlock: `<%OFFICIALJOKE%>`)
- **JokeAPI** (safe‑mode + blacklist enabled, SmartBlock: `<%JOKEAPI%>`)
- **Dad Jokes** (icanhazdadjoke.com, SmartBlock: `<%DADJOKE%>`)
- **API Ninjas Jokes** (SmartBlock: `<%NINJAJOKE%>`)

All joke providers are filtered to avoid NSFW content.

---

## 🧠 Using Your Own Quotes (Highly Recommended)

You can store quotes directly in your graph and pull from them randomly.

### Setup
1. Create a page (e.g. `Quotes`)
2. Each quote should be a top‑level block
3. Put the author/speaker as the **first child** of the quote block

Example:

```
- Stay hungry. Stay foolish.
  - Steve Jobs
```

Set the page title in **Roam Depot → Random Quotes settings**.

You can also pull quotes **by tag** (e.g. `#quote`, `#wisdom`).

---

## ⚙️ Configuration Options

Available in **Roam Depot → Random Quotes**:

- Local Quotes page title  
- Local Quotes tag  
- The One API key (Lord of the Rings quotes)  
- API Ninjas key  
- Optional API Ninjas quote category  

---

## ❌ Removed / Deprecated Sources

The following sources were removed due to instability or shutdown:

- Quote Garden API  
- Futurama quote APIs (multiple backends unavailable)  
- Animechan  
- Ted Lasso quote APIs  
- Old Shakespeare APIs (replaced by API Ninjas)  

The extension now favors **datasets and reliable APIs** to avoid breakage.

---

## 🛠 Design Philosophy

- **Dataset‑first** where possible (fast, no auth, no CORS issues)  
- APIs only when reputable and actively maintained  
- Automatic fallback for Surprise commands  
- Clean formatting, Roam‑native links  
- No cloud storage or external tracking  

---

## 🚀 Recommended Usage

- Use **Surprise Quote** in Daily Notes  
- Use **Local Quotes** for personal collections  
- Combine with SmartBlocks for journaling workflows  
- Add quotes as writing prompts or reflection starters  

---

Happy quoting ✨
