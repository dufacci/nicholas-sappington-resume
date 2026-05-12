# How to Update Your Resume Site

**Live URL:** https://nicholas-sappington.netlify.app

---

## The Workflow

Whenever you want to make a change to your resume, the process is:

1. **Ask Claude to make the change** in Cowork — describe what you want updated (new job, new skill, design tweak, etc.)

2. **Claude edits the code** directly in your project folder (`my-react-app`)

3. **Push to GitHub** by running this in Terminal:
   ```
   cd ~/Developer/my-react-app
   git add .
   git commit -m "describe what you changed"
   git push
   ```

4. **Netlify automatically deploys** — within 1-2 minutes your live site updates. No action needed on Netlify's side.

---

## Tips

- You can check the deploy status at https://app.netlify.com
- If a deploy fails, Netlify keeps the last working version live
- Your GitHub repo is at https://github.com/dufacci/nicholas-sappington-resume
- If you ever need a new GitHub token, go to: GitHub → Settings → Developer Settings → Personal Access Tokens

---

## Git Push Commands (copy/paste ready)

```bash
cd ~/Developer/my-react-app
git add .
git commit -m "update resume"
git push
```
