# Birthday Card

How to use

1. Put your background and sticker images in your workspace. Example location:

   c:\Users\Mariam\Desktop\vs code\Assets\

   Example filenames used in the code: `background.jpg`, `sticker1.png`, `sticker2.png`.

2. Open `c:\Users\Mariam\Desktop\vs code\birthday-card\script.js` and edit the `ASSETS` object at the top. Paste the relative paths to your files (relative to `birthday-card/index.html`). Examples in the file show where to paste.

   Example values:

     background: '../Assets/background.jpg'
     stickers: [ '../Assets/sticker1.png', '../Assets/sticker2.png' ]

3. Save, then open `c:\Users\Mariam\Desktop\vs code\birthday-card\index.html` in your browser.

Notes
- There is no upload UI in the page. You provide images by placing them in your workspace and editing `script.js`.
- If sticker images fail to load, the page will draw placeholder shapes so you can confirm the animation.
