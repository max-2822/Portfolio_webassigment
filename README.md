# Ashitosh Patil – Portfolio Website

Multi-page portfolio built with HTML5, CSS3, JavaScript, jQuery, Font Awesome and Google Fonts.

## Folder structure
```
ashitosh-portfolio/
├── index.html  about.html  resume.html  biodata.html  certificates.html  contact.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── images/        <- put profile.jpg here
│   ├── certificates/  <- put certificate images here (python-bootcamp.jpg already added)
│   └── icons/
└── README.md
```

## Run locally (VS Code + Live Server)
1. Open VS Code → File → Open Folder → choose `ashitosh-portfolio`.
2. Install the **Live Server** extension (Ritwick Dey) from the Extensions tab.
3. Right-click `index.html` → **Open with Live Server**.
4. An internet connection is needed (fonts, icons, jQuery and the PDF library load from CDNs).

## Add your photo
Save your picture as `assets/images/profile.jpg` (exact name, lowercase). Until then an icon is shown.

## Add more certificates
1. Save the image in `assets/certificates/` (e.g. `java.jpg`).
2. In `certificates.html`, copy the whole Python certificate card and change `data-img`, `src`, the title and description.

## Fill your details
- `biodata.html`: replace the `[Add your ...]` rows.
- `contact.html`: replace email, phone, location; set social links (`href="#"`) to your real profile URLs.

## Host on GitHub Pages
1. Create an account at https://github.com → Sign up.
2. Click **+ → New repository**. Name it `ashitosh-portfolio`, set **Public**, click **Create repository**.
3. Click **uploading an existing file**. Drag in **the contents** of the project (all .html files, `css`, `js`, `assets`) – `index.html` must be at the top level. Click **Commit changes**.
4. Go to **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch **main**, folder **/ (root)**, click **Save**.
5. Wait 1–2 minutes and refresh. Your URL appears at the top:
   `https://<your-username>.github.io/ashitosh-portfolio/`
6. Test: open the link, click every menu item, test the theme toggle, certificate zoom, PDF download, form validation, and open it on your phone.

### Alternative: Netlify
Go to https://app.netlify.com/drop, sign up, and drag the whole `ashitosh-portfolio` folder onto the page. You get a public link immediately (rename it in Site settings).

## Common errors
| Problem | Fix |
|---|---|
| Page has no styling | Check `css/style.css` path and that folders are named exactly `css` and `js` |
| Nothing animates / buttons dead | Open browser Console (F12); make sure jQuery loads before `script.js` and you are online |
| Profile photo not showing | File must be `assets/images/profile.jpg` (case-sensitive on GitHub) |
| Certificate image not showing | Check the file name in `src` and `data-img` matches exactly |
| PDF button does nothing | Needs internet for html2pdf; or use Print → Save as PDF |
| Works locally but not on GitHub | Linux servers are case-sensitive: `Profile.JPG` ≠ `profile.jpg` |
| 404 on GitHub Pages | `index.html` must be in the repo root, not inside a sub-folder |
