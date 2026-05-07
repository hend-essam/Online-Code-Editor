import { loader } from "@monaco-editor/react";

const Themes = {
    "active4d": "Active4D",
    "chrome-devtools": "Chrome DevTools",
    "clouds": "Clouds",
    "dawn": "Dawn",
    "dreamweaver": "Dreamweaver",
    "eiffel": "Eiffel",
    "github-light": "GitHub Light",
    "github": "GitHub",
    "idle": "IDLE",
    "katzenmilch": "Katzenmilch",
    "kuroir-theme": "Kuroir Theme",
    "lazy": "LAZY",
    "magicwb--amiga-": "MagicWB (Amiga)",
    "slush-and-poppies": "Slush and Poppies",
    "solarized-light": "Solarized-light",
    "textmate--mac-classic-": "Textmate (Mac Classic)",
    "tomorrow": "Tomorrow",
    "xcode-default": "Xcode_default",
    "iplastic": "iPlastic",

    "all-hallows-eve": "All Hallows Eve",
    "amy": "Amy",
    "birds-of-paradise": "Birds of Paradise",
    "blackboard": "Blackboard",
    "brilliance-black": "Brilliance Black",
    "brilliance-dull": "Brilliance Dull",
    "clouds-midnight": "Clouds Midnight",
    "cobalt": "Cobalt",
    "cobalt2": "Cobalt2",
    "dracula": "Dracula",
    "espresso-libre": "Espresso Libre",
    "github-dark": "GitHub Dark",
    "merbivore-soft": "Merbivore Soft",
    "merbivore": "Merbivore",
    "monokai-bright": "Monokai Bright",
    "monokai": "Monokai",
    "night-owl": "Night Owl",
    "nord": "Nord",
    "oceanic-next": "Oceanic Next",
    "pastels-on-dark": "Pastels on Dark",
    "solarized-dark": "Solarized-dark",
    "spacecadet": "SpaceCadet",
    "sunburst": "Sunburst",
    "tomorrow-night-blue": "Tomorrow-Night-Blue",
    "tomorrow-night-bright": "Tomorrow-Night-Bright",
    "tomorrow-night-eighties": "Tomorrow-Night-Eighties",
    "tomorrow-night": "Tomorrow-Night",
    "twilight": "Twilight",
    "upstream-sunburst": "Upstream Sunburst",
    "vibrant-ink": "Vibrant Ink",
    "zenburnesque": "Zenburnesque",
    "idlefingers": "idleFingers",
    "krtheme": "krTheme",
    "monoindustrial": "monoindustrial",
};

const Theme = (theme) => {
  return new Promise((res) => {
    Promise.all([
      loader.init(),
      import(`monaco-themes/themes/${Themes[theme]}.json`),
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData);
      res();
    });
  });
};

export { Theme };