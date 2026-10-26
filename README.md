# FileFlow

FileFlow is a redesigned cloud-storage dashboard built with **Next.js**, **Appwrite**, **Tailwind CSS**, and **shadcn/ui**.

This version has been reworked from the original tutorial base with a stronger focus on:

- original **FileFlow** branding
- a cleaner UI system
- custom/self-created brand assets and file icons
- a profile settings page with changeable avatar support
- clearer sign-in feedback when a user does not exist yet

## Main improvements made

### 1) Rebranding
- Project name changed from the tutorial branding to **FileFlow**
- Updated metadata, package name, logo, mark, and favicon

### 2) UI refresh
- Redesigned auth screens
- Redesigned sidebar and mobile navigation
- Refreshed dashboard and category pages
- Cleaner cards, menus, upload UI, and dialogs

### 3) Original assets
- Added original custom SVG assets for:
  - FileFlow logo + logo mark
  - file-type icons
  - category summary icons
  - avatar placeholder
- Replaced dependency on tutorial-style visual assets

### 4) Better UX
- Added a **Settings** page
- Users can update:
  - full name
  - profile image
- Added a clearer sign-in message when an email has no account yet

## Tech stack
- Next.js 15
- React 19 RC
- Tailwind CSS
- shadcn/ui
- Appwrite
- Lucide React
- Recharts

## Local setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Create your `.env.local` from the example and add your Appwrite values.
3. Run development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`

## Required Appwrite environment variables
Use these keys in your local env file:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_PUBLIC_APPWRITE_DATABASE=
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=
NEXT_PUBLIC_APPWRITE_BUCKET=
NEXT_APPWRITE_KEY=
```

## Notes for interviews / GitHub
This project began from a tutorial-inspired starting point, but it has been significantly customized. If you put it on GitHub or discuss it in interviews, be honest and say:

- you started from a tutorial/follow-along base
- you completed the backend setup yourself
- you debugged the Appwrite + Next.js configuration
- you reworked the branding and UI
- you added extra features like settings/avatar updates and improved auth UX

That is completely fine as long as you clearly explain what **you** changed and what you learned.
